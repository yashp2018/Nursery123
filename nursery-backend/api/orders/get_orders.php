<?php
require_once __DIR__ . '/../../config/database.php';
$user = requireAuth();
$pdo = getDBConnection();

// Admin sees all orders, customer sees own
if ($user['user_role'] === 'admin') {
    $stmt = $pdo->query("
        SELECT o.*, u.name AS customer_name, u.phone AS customer_phone,
               COUNT(oi.id) AS item_count
        FROM orders o
        JOIN users u ON u.id = o.user_id
        LEFT JOIN order_items oi ON oi.order_id = o.id
        GROUP BY o.id, u.name, u.phone
        ORDER BY o.created_at DESC
    ");
} else {
    $stmt = $pdo->prepare("
        SELECT o.*, COUNT(oi.id) AS item_count
        FROM orders o
        LEFT JOIN order_items oi ON oi.order_id = o.id
        WHERE o.user_id = :uid
        GROUP BY o.id
        ORDER BY o.created_at DESC
    ");
    $stmt->execute([':uid' => $user['user_id']]);
}

jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
