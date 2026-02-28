<?php
require_once __DIR__ . '/../../config/database.php';
requireAdmin();
$pdo = getDBConnection();
$input = getInput();

$id = (int)($input['id'] ?? 0);
if (!$id) jsonResponse(['success' => false, 'message' => 'ID required'], 400);

$stmt = $pdo->prepare("
    UPDATE varieties SET 
        crop_id=:crop_id, name=:name, company=:company,
        rate_ex_factory=:ex, rate_local_delivery=:local, rate_250km=:km250,
        price_15000_plus=:p15k, price_30000_plus=:p30k,
        stock=:stock, min_order_qty=:moq, description=:desc, features=:features,
        image_url=:img, status=:status
    WHERE id=:id
");

$stmt->execute([
    ':crop_id'  => (int)$input['crop_id'],
    ':name'     => trim($input['name']),
    ':company'  => trim($input['company'] ?? ''),
    ':ex'       => (float)$input['rate_ex_factory'],
    ':local'    => (float)($input['rate_local_delivery'] ?? 0),
    ':km250'    => (float)($input['rate_250km'] ?? 0),
    ':p15k'     => (float)($input['price_15000_plus'] ?? 0),
    ':p30k'     => (float)($input['price_30000_plus'] ?? 0),
    ':stock'    => (int)($input['stock'] ?? 0),
    ':moq'      => (int)($input['min_order_qty'] ?? 50),
    ':desc'     => trim($input['description'] ?? ''),
    ':features' => json_encode($input['features'] ?? []),
    ':img'      => trim($input['image_url'] ?? ''),
    ':status'   => trim($input['status'] ?? 'active'),
    ':id'       => $id,
]);

jsonResponse(['success' => true, 'message' => 'Variety updated']);
