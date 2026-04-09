// JS ДЛЯ СОЗДАНИЯ ОБЪЯВЛЕИЙ



async function sendCarData(formData) {
    let url = 'http://localhost/myserver/post.php';
    
    try {
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        let result = await response.json();
        
        if (result.success) {
            alert('Объявление успешно опубликовано!');
            window.location.href = 'header.html';
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
}

document.getElementById('carPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные через FormData
    const formData = new FormData();
    formData.append('mark', document.getElementById('mark').value.trim());
    formData.append('model', document.getElementById('model').value.trim());
    formData.append('release', document.getElementById('release').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('mileage', document.getElementById('mileage').value);
    formData.append('ecapacity', document.getElementById('ecapacity').value);
    formData.append('transmission', document.getElementById('transmission').value);
    formData.append('condition', document.getElementById('condition').value);
    formData.append('numberowners', document.getElementById('numberowners').value);
    formData.append('description', document.getElementById('description').value.trim());
    formData.append('sity', document.getElementById('sity').value.trim());
    formData.append('numberphone', document.getElementById('numberphone').value.trim());
    formData.append('owner', document.getElementById('owner').value.trim());
    
    // Добавляем фото
    const photoFile = document.getElementById('photo').files[0];
    if (photoFile) {
        formData.append('photo', photoFile);
    }
    
    // Валидация
    const mark = document.getElementById('mark').value.trim();
    const model = document.getElementById('model').value.trim();
    const release = document.getElementById('release').value;
    const price = document.getElementById('price').value;
    const condition = document.getElementById('condition').value;
    const sity = document.getElementById('sity').value.trim();
    const numberphone = document.getElementById('numberphone').value.trim();
    const owner = document.getElementById('owner').value.trim();
    
    if (!mark || !model || !release || !price || !condition || !sity || !numberphone || !owner) {
        alert('Заполните все обязательные поля!');
        return;
    }
    
    // Отправляем
    sendCarData(formData);
});