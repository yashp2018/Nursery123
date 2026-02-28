<?php
require_once __DIR__ . '/../../config/database.php';
$pdo = getDBConnection();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if (!$id) jsonResponse(['success' => false, 'message' => 'Variety ID required'], 400);

$stmt = $pdo->prepare("
    SELECT v.*, cr.name AS crop_name, cr.duration_days, c.name AS category_name, c.id AS category_id
    FROM varieties v
    JOIN crops cr ON cr.id = v.crop_id
    JOIN categories c ON c.id = cr.category_id
    WHERE v.id = :id
");
$stmt->execute([':id' => $id]);
$variety = $stmt->fetch();

if (!$variety) jsonResponse(['success' => false, 'message' => 'Variety not found'], 404);

// Related varieties (same crop, excluding current)
$relStmt = $pdo->prepare("
    SELECT id, name, company, rate_ex_factory, image_url, stock 
    FROM varieties 
    WHERE crop_id = :cid AND id != :id AND status = 'active' 
    LIMIT 4
");
$relStmt->execute([':cid' => $variety['crop_id'], ':id' => $id]);

$variety['related'] = $relStmt->fetchAll();

jsonResponse(['success' => true, 'data' => $variety]);
