<?php
require_once __DIR__ . '/../../config/database.php';
requireAdmin();
$pdo = getDBConnection();
$input = getInput();

$categoryId = (int)($input['category_id'] ?? 0);
$name = trim($input['name'] ?? '');
$duration = trim($input['duration_days'] ?? '');

if (!$categoryId || empty($name)) {
    jsonResponse(['success' => false, 'message' => 'category_id and name required'], 400);
}

$stmt = $pdo->prepare("INSERT INTO crops (category_id, name, duration_days) VALUES (:cid, :name, :dur) RETURNING id");
$stmt->execute([':cid' => $categoryId, ':name' => $name, ':dur' => $duration]);

jsonResponse(['success' => true, 'message' => 'Crop added', 'id' => $stmt->fetch()['id']], 201);
