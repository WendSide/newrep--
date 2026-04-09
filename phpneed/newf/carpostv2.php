<?php

// === PHP ДЛЯ БД ===

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// подключение к базе данных
$host = 'localhost'; 
$db   = 'projectbaseautosell'; 
$user = 'root'; 
$pass = '';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Ошибка подключения: ' . $e->getMessage()]));
}

// Явно указываем все и выводим поля
$stmt = $pdo->query("SELECT id, mark, model, `release`, price, mileage, ecapacity, transmission, `condition`, numberowners, description, sity, numberphone, owner, photo FROM carpost");

$cars = $stmt->fetchAll();

echo json_encode($cars);
?>
