<?php
require_once __DIR__ . '/../../config/database.php';
$pdo = getDBConnection();
$input = getInput();

$name     = trim($input['name'] ?? '');
$email    = trim($input['email'] ?? '');
$phone    = trim($input['phone'] ?? '');
$password = $input['password'] ?? '';
$address  = trim($input['address'] ?? '');

if (empty($name) || empty($email) || empty($phone) || empty($password)) {
    jsonResponse(['success' => false, 'message' => 'Name, email, phone, and password are required'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['success' => false, 'message' => 'Invalid email format'], 400);
}

if (strlen($password) < 6) {
    jsonResponse(['success' => false, 'message' => 'Password must be at least 6 characters'], 400);
}

// Check duplicate
$check = $pdo->prepare("SELECT id FROM users WHERE email = :email OR phone = :phone");
$check->execute([':email' => $email, ':phone' => $phone]);
if ($check->fetch()) {
    jsonResponse(['success' => false, 'message' => 'Email or phone already registered'], 409);
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("
    INSERT INTO users (name, email, phone, password, address) 
    VALUES (:name, :email, :phone, :pass, :addr) RETURNING id
");
$stmt->execute([':name' => $name, ':email' => $email, ':phone' => $phone, ':pass' => $hashed, ':addr' => $address]);
$userId = $stmt->fetch()['id'];

session_start();
session_regenerate_id(true);
$_SESSION['user_id']   = $userId;
$_SESSION['user_role']  = 'customer';
$_SESSION['user_name']  = $name;

jsonResponse(['success' => true, 'message' => 'Registered successfully', 'user' => [
    'id' => $userId, 'name' => $name, 'email' => $email, 'role' => 'customer'
]], 201);
