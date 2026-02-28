<?php
require_once __DIR__ . '/../../config/database.php';
$pdo = getDBConnection();
$input = getInput();

$email    = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (empty($email) || empty($password)) {
    jsonResponse(['success' => false, 'message' => 'Email and password required'], 400);
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email AND status = 'active'");
$stmt->execute([':email' => $email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    jsonResponse(['success' => false, 'message' => 'Invalid email or password'], 401);
}

session_start();
session_regenerate_id(true);
$_SESSION['user_id']   = $user['id'];
$_SESSION['user_role']  = $user['role'];
$_SESSION['user_name']  = $user['name'];

jsonResponse(['success' => true, 'message' => 'Login successful', 'user' => [
    'id' => $user['id'], 'name' => $user['name'], 'email' => $user['email'], 'role' => $user['role']
]]);
