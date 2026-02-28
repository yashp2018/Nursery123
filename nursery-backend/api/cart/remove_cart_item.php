<?php
require_once __DIR__ . '/../../config/database.php';
$user = requireAuth();
$pdo = getDBConnection();
$input = getInput();

$varietyId = (int)($input['variety_id'] ?? 0);
if (!$varietyId) jsonResponse(['success' => false, 'message' => 'variety_id required'], 400);

$stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = :uid AND variety_id = :vid");
$stmt->execute([':uid' => $user['user_id'], ':vid' => $varietyId]);

jsonResponse(['success' => true, 'message' => 'Item removed']);
