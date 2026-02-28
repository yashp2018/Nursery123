<?php
require_once __DIR__ . '/../../config/database.php';
$user = requireAuth();
$pdo = getDBConnection();

$orderId = (int)($_GET['id'] ?? 0);
if (!$orderId) jsonResponse(['success' => false, 'message' => 'Order ID required'], 400);

// Fetch order (admin can see any, customer only own)
$sql = "SELECT o.*, u.name AS customer_name, u.email AS customer_email, u.phone AS customer_phone
        FROM orders o JOIN users u ON u.id = o.user_id WHERE o.id = :oid";
$params = [':oid' => $orderId];

if ($user['user_role'] !== 'admin') {
    $sql .= " AND o.user_id = :uid";
    $params[':uid'] = $user['user_id'];
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$order = $stmt->fetch();

if (!$order) jsonResponse(['success' => false, 'message' => 'Order not found'], 404);

// Fetch items
$itemStmt = $pdo->prepare("
    SELECT oi.*, v.name AS variety_name, v.company, v.image_url, cr.name AS crop_name
    FROM order_items oi
    JOIN varieties v ON v.id = oi.variety_id
    JOIN crops cr ON cr.id = v.crop_id
    WHERE oi.order_id = :oid
");
$itemStmt->execute([':oid' => $orderId]);
$order['items'] = $itemStmt->fetchAll();

jsonResponse(['success' => true, 'data' => $order]);
