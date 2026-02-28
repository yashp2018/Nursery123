<?php
require_once __DIR__ . '/../../config/database.php';
$user = requireAuth();
$pdo = getDBConnection();
$input = getInput();

$varietyId    = (int)($input['variety_id'] ?? 0);
$quantity     = (int)($input['quantity'] ?? 0);
$deliveryType = trim($input['delivery_type'] ?? 'local');

if (!$varietyId || $quantity < 1) {
    jsonResponse(['success' => false, 'message' => 'variety_id and quantity required'], 400);
}

// Check variety exists and has stock
$vStmt = $pdo->prepare("SELECT id, stock, min_order_qty FROM varieties WHERE id = :id AND status = 'active'");
$vStmt->execute([':id' => $varietyId]);
$variety = $vStmt->fetch();

if (!$variety) jsonResponse(['success' => false, 'message' => 'Variety not found'], 404);
if ($quantity < $variety['min_order_qty']) {
    jsonResponse(['success' => false, 'message' => "Minimum order quantity is {$variety['min_order_qty']}"], 400);
}
if ($quantity > $variety['stock']) {
    jsonResponse(['success' => false, 'message' => 'Insufficient stock'], 400);
}

// Upsert cart
$stmt = $pdo->prepare("
    INSERT INTO cart (user_id, variety_id, quantity, delivery_type) 
    VALUES (:uid, :vid, :qty, :dt)
    ON CONFLICT (user_id, variety_id) 
    DO UPDATE SET quantity = cart.quantity + :qty2, delivery_type = :dt2
");
$stmt->execute([
    ':uid' => $user['user_id'], ':vid' => $varietyId,
    ':qty' => $quantity, ':dt' => $deliveryType,
    ':qty2' => $quantity, ':dt2' => $deliveryType,
]);

jsonResponse(['success' => true, 'message' => 'Added to cart']);
