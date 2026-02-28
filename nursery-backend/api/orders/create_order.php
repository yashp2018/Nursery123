<?php
require_once __DIR__ . '/../../config/database.php';
$user = requireAuth();
$pdo = getDBConnection();
$input = getInput();

// Validate delivery info
$required = ['delivery_name', 'delivery_phone', 'delivery_address', 'delivery_city', 'delivery_pincode'];
foreach ($required as $field) {
    if (empty(trim($input[$field] ?? ''))) {
        jsonResponse(['success' => false, 'message' => "{$field} is required"], 400);
    }
}

$paymentMethod = trim($input['payment_method'] ?? 'cod');

// Get cart items
$cartStmt = $pdo->prepare("
    SELECT c.variety_id, c.quantity, c.delivery_type,
           v.rate_ex_factory, v.price_15000_plus, v.price_30000_plus,
           v.rate_local_delivery, v.rate_250km
    FROM cart c
    JOIN varieties v ON v.id = c.variety_id
    WHERE c.user_id = :uid
");
$cartStmt->execute([':uid' => $user['user_id']]);
$cartItems = $cartStmt->fetchAll();

if (empty($cartItems)) {
    jsonResponse(['success' => false, 'message' => 'Cart is empty'], 400);
}

$pdo->beginTransaction();

try {
    // Generate order number
    $orderNumber = 'SNH-' . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);

    $totalAmount = 0;
    $totalDelivery = 0;
    $orderItemsData = [];

    foreach ($cartItems as $item) {
        $unitPrice = calculatePrice(
            (float)$item['rate_ex_factory'],
            (float)$item['price_15000_plus'],
            (float)$item['price_30000_plus'],
            (int)$item['quantity']
        );
        $deliveryRate = $item['delivery_type'] === '250km'
            ? (float)$item['rate_250km']
            : (float)$item['rate_local_delivery'];
        
        $deliveryCharge = $deliveryRate * $item['quantity'];
        $subtotal = ($unitPrice * $item['quantity']) + $deliveryCharge;

        $totalAmount += $unitPrice * $item['quantity'];
        $totalDelivery += $deliveryCharge;

        $orderItemsData[] = [
            'variety_id'      => $item['variety_id'],
            'quantity'        => $item['quantity'],
            'price_per_unit'  => $unitPrice,
            'delivery_charge' => $deliveryCharge,
            'subtotal'        => $subtotal,
        ];
    }

    // Insert order
    $orderStmt = $pdo->prepare("
        INSERT INTO orders (user_id, order_number, total_amount, delivery_charges, payment_method,
                           delivery_name, delivery_phone, delivery_email, delivery_address,
                           delivery_city, delivery_state, delivery_pincode, delivery_landmark)
        VALUES (:uid, :on, :ta, :dc, :pm, :dn, :dp, :de, :da, :dci, :ds, :dpc, :dl)
        RETURNING id
    ");
    $orderStmt->execute([
        ':uid' => $user['user_id'],
        ':on'  => $orderNumber,
        ':ta'  => $totalAmount,
        ':dc'  => $totalDelivery,
        ':pm'  => $paymentMethod,
        ':dn'  => trim($input['delivery_name']),
        ':dp'  => trim($input['delivery_phone']),
        ':de'  => trim($input['delivery_email'] ?? ''),
        ':da'  => trim($input['delivery_address']),
        ':dci' => trim($input['delivery_city']),
        ':ds'  => trim($input['delivery_state'] ?? ''),
        ':dpc' => trim($input['delivery_pincode']),
        ':dl'  => trim($input['delivery_landmark'] ?? ''),
    ]);
    $orderId = $orderStmt->fetch()['id'];

    // Insert order items
    $itemStmt = $pdo->prepare("
        INSERT INTO order_items (order_id, variety_id, quantity, price_per_unit, delivery_charge, subtotal)
        VALUES (:oid, :vid, :qty, :ppu, :dc, :sub)
    ");
    foreach ($orderItemsData as $oi) {
        $itemStmt->execute([
            ':oid' => $orderId,
            ':vid' => $oi['variety_id'],
            ':qty' => $oi['quantity'],
            ':ppu' => $oi['price_per_unit'],
            ':dc'  => $oi['delivery_charge'],
            ':sub' => $oi['subtotal'],
        ]);
    }

    // Deduct stock
    $stockStmt = $pdo->prepare("UPDATE varieties SET stock = stock - :qty WHERE id = :vid");
    foreach ($cartItems as $item) {
        $stockStmt->execute([':qty' => $item['quantity'], ':vid' => $item['variety_id']]);
    }

    // Clear cart
    $clearStmt = $pdo->prepare("DELETE FROM cart WHERE user_id = :uid");
    $clearStmt->execute([':uid' => $user['user_id']]);

    $pdo->commit();

    jsonResponse(['success' => true, 'message' => 'Order placed successfully', 'order' => [
        'id' => $orderId,
        'order_number' => $orderNumber,
        'total' => $totalAmount + $totalDelivery,
    ]], 201);

} catch (Exception $e) {
    $pdo->rollBack();
    jsonResponse(['success' => false, 'message' => 'Failed to place order'], 500);
}
