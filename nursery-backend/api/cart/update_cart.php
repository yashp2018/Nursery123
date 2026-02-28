<?php
require_once __DIR__ . '/../../config/database.php';
$user = requireAuth();
$pdo = getDBConnection();
$input = getInput();

$varietyId = (int)($input['variety_id'] ?? 0);
$quantity  = (int)($input['quantity'] ?? 0);
$deliveryType = trim($input['delivery_type'] ?? '');

if (!$varietyId) jsonResponse(['success' => false, 'message' => 'variety_id required'], 400);

if ($quantity < 1) {
    // Remove if quantity is 0 or less
    $stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = :uid AND variety_id = :vid");
    $stmt->execute([':uid' => $user['user_id'], ':vid' => $varietyId]);
    jsonResponse(['success' => true, 'message' => 'Item removed from cart']);
}

$sets = ["quantity = :qty"];
$params = [':uid' => $user['user_id'], ':vid' => $varietyId, ':qty' => $quantity];

if ($deliveryType) {
    $sets[] = "delivery_type = :dt";
    $params[':dt'] = $deliveryType;
}

$sql = "UPDATE cart SET " . implode(', ', $sets) . " WHERE user_id = :uid AND variety_id = :vid";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

jsonResponse(['success' => true, 'message' => 'Cart updated']);
