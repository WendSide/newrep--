<?php
// config.php
$host = 'localhost';
$dbname = 'projectbaseautosell';
$username = 'root'; // замените на вашего пользователя БД
$password = ''; // замените на ваш пароль БД

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Ошибка подключения: " . $e->getMessage());
}
?>