<?php
require_once __DIR__ . '/../../config/database.php';
requireAdmin();
$pdo = getDBConnection();
$input = getInput();

$id = (int)($input['id'] ?? 0);
$name = trim($input['name'] ?? '');
$description = trim($input['description'] ?? '');
$icon = trim($input['icon'] ?? '');
$status = trim($input['status'] ?? 'active');

if (!$id || empty($name)) {
    jsonResponse(['success' => false, 'message' => 'ID and name required'], 400);
}

$stmt = $pdo->prepare("UPDATE categories SET name=:name, description=:desc, icon=:icon, status=:status WHERE id=:id");
$stmt->execute([':name' => $name, ':desc' => $description, ':icon' => $icon, ':status' => $status, ':id' => $id]);

jsonResponse(['success' => true, 'message' => 'Category updated']);
