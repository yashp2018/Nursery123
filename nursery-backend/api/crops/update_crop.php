<?php
require_once __DIR__ . '/../../config/database.php';
requireAdmin();
$pdo = getDBConnection();
$input = getInput();

$id = (int)($input['id'] ?? 0);
$categoryId = (int)($input['category_id'] ?? 0);
$name = trim($input['name'] ?? '');
$duration = trim($input['duration_days'] ?? '');
$status = trim($input['status'] ?? 'active');

if (!$id || empty($name)) {
    jsonResponse(['success' => false, 'message' => 'ID and name required'], 400);
}

$stmt = $pdo->prepare("UPDATE crops SET category_id=:cid, name=:name, duration_days=:dur, status=:status WHERE id=:id");
$stmt->execute([':cid' => $categoryId, ':name' => $name, ':dur' => $duration, ':status' => $status, ':id' => $id]);

jsonResponse(['success' => true, 'message' => 'Crop updated']);
