<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $host = 'localhost';
        $db = 'projectbaseautosell';
        $user = 'root';
        $pass = '';
        
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Получаем данные из POST
        $mark = $_POST['mark'] ?? '';
        $model = $_POST['model'] ?? '';
        $release = $_POST['release'] ?? null;
        $price = $_POST['price'] ?? null;
        $mileage = $_POST['mileage'] ?? null;
        $ecapacity = $_POST['ecapacity'] ?? null;
        $transmission = $_POST['transmission'] ?? null;
        $condition = $_POST['condition'] ?? '';
        $numberowners = $_POST['numberowners'] ?? null;
        $description = $_POST['description'] ?? '';
        $sity = $_POST['sity'] ?? '';
        $numberphone = $_POST['numberphone'] ?? '';
        $owner = $_POST['owner'] ?? '';
        
        // Обработка фото
        $photo_path = null;
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
            $upload_dir = 'uploads/';
            // Создаём папку если нет
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }
            
            $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
            $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            
            if (in_array($ext, $allowed)) {
                $filename = time() . '_' . rand(1000, 9999) . '.' . $ext;
                $photo_path = $upload_dir . $filename;
                move_uploaded_file($_FILES['photo']['tmp_name'], $photo_path);
            }
        }
        
        // Проверка обязательных полей
        if (empty($mark) || empty($model) || empty($release) || empty($price) || empty($condition) || empty($sity) || empty($numberphone) || empty($owner)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Заполните все обязательные поля']);
            exit();
        }
        
        // Вставляем в таблицу carpost
        $sql = "INSERT INTO carpost (mark, model, `release`, price, mileage, ecapacity, transmission, `condition`, numberowners, description, sity, numberphone, owner, photo) 
                VALUES (:mark, :model, :release, :price, :mileage, :ecapacity, :transmission, :condition, :numberowners, :description, :sity, :numberphone, :owner, :photo)";
        
        $stmt = $pdo->prepare($sql);
        
        $stmt->bindParam(':mark', $mark);
        $stmt->bindParam(':model', $model);
        $stmt->bindParam(':release', $release);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':mileage', $mileage);
        $stmt->bindParam(':ecapacity', $ecapacity);
        $stmt->bindParam(':transmission', $transmission);
        $stmt->bindParam(':condition', $condition);
        $stmt->bindParam(':numberowners', $numberowners);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':sity', $sity);
        $stmt->bindParam(':numberphone', $numberphone);
        $stmt->bindParam(':owner', $owner);
        $stmt->bindParam(':photo', $photo_path);
        
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Объявление добавлено']);
        
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Неверный запрос']);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}
?>