<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
    die("Ошибка подключения: " . $e->getMessage());
}

// выбор всех машин из таблицы
$stmt = $pdo->query("SELECT * FROM carpost"); // Вывод полной таблицы carpost

// получение данных
$cars = $stmt->fetchAll();

// вывод в формате JSON
header('Content-Type: application/json');
echo json_encode($cars);
?>