<?php
require_once __DIR__ . '/../../config/database.php';
$user = requireAuth();
$pdo = getDBConnection();

$stmt = $pdo->prepare("
    SELECT c.id, c.variety_id, c.quantity, c.delivery_type,
           v.name, v.company, v.rate_ex_factory, v.price_15000_plus, v.price_30000_plus,
           v.rate_local_delivery, v.rate_250km, v.image_url, v.stock, v.min_order_qty,
           cr.name AS crop_name, cr.duration_days
    FROM cart c
    JOIN varieties v ON v.id = c.variety_id
    JOIN crops cr ON cr.id = v.crop_id
    WHERE c.user_id = :uid
    ORDER BY c.created_at DESC
");
$stmt->execute([':uid' => $user['user_id']]);
$items = $stmt->fetchAll();

// Calculate prices
$total = 0;
foreach ($items as &$item) {
    $unitPrice = calculatePrice(
        (float)$item['rate_ex_factory'],
        (float)$item['price_15000_plus'],
        (float)$item['price_30000_plus'],
        (int)$item['quantity']
    );
    $deliveryRate = $item['delivery_type'] === '250km' 
        ? (float)$item['rate_250km'] 
        : (float)$item['rate_local_delivery'];
    
    $item['unit_price']      = $unitPrice;
    $item['delivery_charge'] = $deliveryRate * $item['quantity'];
    $item['subtotal']        = ($unitPrice * $item['quantity']) + $item['delivery_charge'];
    $total += $item['subtotal'];
}

jsonResponse(['success' => true, 'data' => $items, 'total' => $total]);
