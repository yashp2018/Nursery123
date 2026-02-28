<?php
require_once __DIR__ . '/../../config/database.php';
$pdo = getDBConnection();

$cropId = isset($_GET['crop_id']) ? (int)$_GET['crop_id'] : null;
$categoryId = isset($_GET['category_id']) ? (int)$_GET['category_id'] : null;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$page = max(1, (int)($_GET['page'] ?? 1));
$limit = min(50, max(1, (int)($_GET['limit'] ?? 12)));
$offset = ($page - 1) * $limit;

$where = ["v.status = 'active'"];
$params = [];

if ($cropId) {
    $where[] = "v.crop_id = :crop_id";
    $params[':crop_id'] = $cropId;
}
if ($categoryId) {
    $where[] = "cr.category_id = :cat_id";
    $params[':cat_id'] = $categoryId;
}
if ($search) {
    $where[] = "(v.name ILIKE :search OR v.company ILIKE :search OR cr.name ILIKE :search)";
    $params[':search'] = "%{$search}%";
}

$whereClause = implode(' AND ', $where);

// Count
$countStmt = $pdo->prepare("SELECT COUNT(*) FROM varieties v JOIN crops cr ON cr.id = v.crop_id WHERE {$whereClause}");
$countStmt->execute($params);
$total = (int)$countStmt->fetchColumn();

// Data
$sql = "SELECT v.*, cr.name AS crop_name, cr.duration_days, c.name AS category_name, c.id AS category_id
        FROM varieties v
        JOIN crops cr ON cr.id = v.crop_id
        JOIN categories c ON c.id = cr.category_id
        WHERE {$whereClause}
        ORDER BY v.name
        LIMIT :lim OFFSET :off";

$stmt = $pdo->prepare($sql);
foreach ($params as $k => $val) $stmt->bindValue($k, $val);
$stmt->bindValue(':lim', $limit, PDO::PARAM_INT);
$stmt->bindValue(':off', $offset, PDO::PARAM_INT);
$stmt->execute();

jsonResponse([
    'success' => true,
    'data' => $stmt->fetchAll(),
    'pagination' => [
        'page' => $page,
        'limit' => $limit,
        'total' => $total,
        'total_pages' => ceil($total / $limit),
    ]
]);
