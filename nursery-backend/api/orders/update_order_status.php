<?php
require_once __DIR__ . '/../../config/database.php';
requireAdmin();
$pdo = getDBConnection();
$input = getInput();

$orderId = (int)($input['order_id'] ?? 0);
$status  = trim($input['status'] ?? '');

if (!$orderId || empty($status)) {
    jsonResponse(['success' => false, 'message' => 'order_id and status required'], 400);
}

$validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
if (!in_array($status, $validStatuses)) {
    jsonResponse(['success' => false, 'message' => 'Invalid status. Allowed: ' . implode(', ', $validStatuses)], 400);
}

$stmt = $pdo->prepare("UPDATE orders SET order_status = :status WHERE id = :id");
$stmt->execute([':status' => $status, ':id' => $orderId]);

// If cancelled, restore stock
if ($status === 'cancelled') {
    $items = $pdo->prepare("SELECT variety_id, quantity FROM order_items WHERE order_id = :oid");
    $items->execute([':oid' => $orderId]);
    $restore = $pdo->prepare("UPDATE varieties SET stock = stock + :qty WHERE id = :vid");
    foreach ($items->fetchAll() as $item) {
        $restore->execute([':qty' => $item['quantity'], ':vid' => $item['variety_id']]);
    }
}

jsonResponse(['success' => true, 'message' => 'Order status updated']);
