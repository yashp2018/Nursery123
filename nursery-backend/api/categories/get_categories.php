<?php
require_once __DIR__ . '/../../config/database.php';
$pdo = getDBConnection();

$stmt = $pdo->query("
    SELECT c.*, 
           COUNT(DISTINCT cr.id) AS crop_count,
           COUNT(DISTINCT v.id) AS variety_count
    FROM categories c
    LEFT JOIN crops cr ON cr.category_id = c.id
    LEFT JOIN varieties v ON v.crop_id = cr.id
    WHERE c.status = 'active'
    GROUP BY c.id
    ORDER BY c.name
");

jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
