<?php
require_once __DIR__ . '/../../config/database.php';
$pdo = getDBConnection();

$categoryId = isset($_GET['category_id']) ? (int)$_GET['category_id'] : null;

$sql = "SELECT cr.*, c.name AS category_name, COUNT(v.id) AS variety_count
        FROM crops cr
        JOIN categories c ON c.id = cr.category_id
        LEFT JOIN varieties v ON v.crop_id = cr.id
        WHERE cr.status = 'active'";
$params = [];

if ($categoryId) {
    $sql .= " AND cr.category_id = :cid";
    $params[':cid'] = $categoryId;
}

$sql .= " GROUP BY cr.id, c.name ORDER BY cr.name";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
