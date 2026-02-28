<?php
require_once __DIR__ . '/../../config/database.php';
requireAdmin();
$pdo = getDBConnection();
$input = getInput();

$name = trim($input['name'] ?? '');
$description = trim($input['description'] ?? '');
$icon = trim($input['icon'] ?? '');

if (empty($name)) {
    jsonResponse(['success' => false, 'message' => 'Category name is required'], 400);
}

$stmt = $pdo->prepare("INSERT INTO categories (name, description, icon) VALUES (:name, :desc, :icon) RETURNING id");
$stmt->execute([':name' => $name, ':desc' => $description, ':icon' => $icon]);
$row = $stmt->fetch();

jsonResponse(['success' => true, 'message' => 'Category added', 'id' => $row['id']], 201);
