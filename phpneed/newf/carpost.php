<?php

// === PHP ДЛЯ ВЫВОДА КАРТ ===

// === НАСТРОЙКА ЗАГОЛОВКОВ ДЛЯ РАБОТЫ С API ===
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json');

// === БЛОК ОБРАБОТКИ ОШИБОК ===
try {
    // === ПАРАМЕТРЫ ПОДКЛЮЧЕНИЯ К БАЗЕ ДАННЫХ ===
    $host = '127.0.0.1';
    $db = 'projectbaseautosell';
    $user = 'root';
    $pass = '';
    $charset = 'utf8';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    
    $opt = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $pdo = new PDO($dsn, $user, $pass, $opt);
    
    // Получаем ВСЕ автомобили из таблицы
    $stmt = $pdo->query('SELECT * FROM carpost ORDER BY id DESC');
    $result = $stmt->fetchAll();
    
    // Отправляем данные клиенту
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
    
} catch (PDOException $e) {
    echo json_encode(['error' => 'Подключение не удалось: ' . $e->getMessage()]);
}

?>