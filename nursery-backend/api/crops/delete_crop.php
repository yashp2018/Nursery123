<?php
require_once __DIR__ . '/../../config/database.php';
requireAdmin();
$pdo = getDBConnection();
$input = getInput();

$id = (int)($input['id'] ?? 0);
if (!$id) jsonResponse(['success' => false, 'message' => 'ID required'], 400);

$stmt = $pdo->prepare("DELETE FROM crops WHERE id = :id");
$stmt->execute([':id' => $id]);

jsonResponse(['success' => true, 'message' => 'Crop deleted']);
