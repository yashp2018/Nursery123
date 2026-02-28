<?php
/**
 * PostgreSQL Database Connection — PDO
 * 
 * Usage:
 *   require_once __DIR__ . '/../config/database.php';
 *   $pdo = getDBConnection();
 */

define('DB_HOST', 'localhost');
define('DB_PORT', '5432');
define('DB_NAME', 'nursery_db');
define('DB_USER', 'postgres');
define('DB_PASS', 'yourpassword'); // Change in production

function getDBConnection(): PDO {
    try {
        $dsn = "pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME;
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit;
    }
}

function jsonResponse(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    echo json_encode($data);
    exit;
}

function getInput(): array {
    $json = file_get_contents('php://input');
    return json_decode($json, true) ?? [];
}

function requireAuth(): array {
    session_start();
    if (empty($_SESSION['user_id'])) {
        jsonResponse(['success' => false, 'message' => 'Unauthorized'], 401);
    }
    return [
        'user_id'   => $_SESSION['user_id'],
        'user_role'  => $_SESSION['user_role'],
        'user_name'  => $_SESSION['user_name'],
    ];
}

function requireAdmin(): array {
    $user = requireAuth();
    if ($user['user_role'] !== 'admin') {
        jsonResponse(['success' => false, 'message' => 'Forbidden'], 403);
    }
    return $user;
}

/**
 * Calculate unit price based on B2B quantity tiers.
 */
function calculatePrice(float $exFactory, float $price15k, float $price30k, int $quantity): float {
    if ($quantity >= 30000) return $price30k;
    if ($quantity >= 15000) return $price15k;
    return $exFactory;
}
