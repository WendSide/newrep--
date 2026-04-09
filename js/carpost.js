
// JS ДЛЯ ВЫВОДА КАРТОЧЕК НА HTML
 

// Загружаем все машины
async function loadCars() {
    let response = await fetch('http://localhost/myserver/carpostv2.php');
    let cars = await response.json();
    
    let container = document.getElementById('carsContainer');
    container.innerHTML = '';
    

    // Перебираем каждую машину из списка, проверяем есть ли у неё фото,
    // если есть очищаем путь от лишних папок,
    // добавляем полный адрес сервера и создаём тег картинки с возможностью открыть её по клику,
    // если нет вставляем заглушку с надписью «Нет фото».
    for (let car of cars) {
        // Формируем путь к фото
        let photoHtml = '';
        let photoUrl = '';
        
        if (car.photo && car.photo !== '') {
            let cleanPath = car.photo.replace(/^\/?myserver\//, '').replace(/^\/?uploads\//, '');

// Использует регулярное выражение ^\/?myserver\/, которое ищет в начале строки (^) опциональный слеш (\/?), за которым идёт слово myserver и далее слеш (\/).
// Если это совпадение найдено, оно заменяется на пустую строку '', то есть удаляется.

            photoUrl = 'http://localhost/myserver/uploads/' + cleanPath;
            photoHtml = `<img src="${photoUrl}" alt="${car.mark} ${car.model}" class="car-img" data-photo-url="${photoUrl}">`;
        } else {
            photoHtml = `<div class="no-photo">📷 Нет фото</div>`;
        }
// для каждой машины формируется HTML-код с фото или с заглушкой, готовый к вставке в страницу.        
        
        container.innerHTML += `
            <div class="car-item">
                <div class="car-image">
                    ${photoHtml}
                </div>
                <div class="car-info">
                    <h2 class="car-name">${car.mark} ${car.model}</h2>
                    <div class="car-price">${car.price} ₽</div>
                    <div class="car-specs">
                        <div><span class="spec-label">Год:</span> <span class="spec-value">${car.release}</span></div>
                        <div><span class="spec-label">Пробег:</span> <span class="spec-value">${car.mileage} км</span></div>
                        <div><span class="spec-label">Мощность:</span> <span class="spec-value">${car.ecapacity} л.с.</span></div>
                        <div><span class="spec-label">Коробка:</span> <span class="spec-value">${car.transmission}</span></div>
                        <div><span class="spec-label">Состояние:</span> <span class="spec-value">${car.condition}</span></div>
                        <div><span class="spec-label">Владельцев:</span> <span class="spec-value">${car.numberowners}</span></div>
                    </div>
                    <div class="car-description">${car.description || 'Описание отсутствует'}</div>
                                    <button class="button-izrbr" title="">
                    <i class="">✓</i>
                </button>
                </div>
                <div class="seller-info">
                    👤 ${car.owner || 'Продавец'} | 📞 ${car.numberphone || 'нет телефона'}
                </div>

            </div>
        `;
    }
    
    // Добавляем обработчики на все фото (для модального + -)
    document.querySelectorAll('.car-img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            let photoUrl = img.getAttribute('data-photo-url');
            openModal(photoUrl);
        });
    });
}

// Модальное окно для фото
function openModal(photoUrl) {
    let oldModal = document.getElementById('photoModal');
    if (oldModal) oldModal.remove();
    
    // Создаём элемент модального окна (оверлей)
    let modal = document.createElement('div');
    modal.id = 'photoModal';
    modal.className = 'modal-overlay';
    
    // Создаём элемент изображения внутри модального окна
    let img = document.createElement('img');
    img.src = photoUrl;
    img.className = 'modal-image';
    
    // Создаём кнопку закрытия модального окна
    let closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.className = 'modal-close';
    
    // Добавляем изображение и кнопку закрытия внутрь модального окна
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Закрытие по клику на фон
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    // Закрытие по кнопке
    closeBtn.onclick = () => modal.remove();
    
    // Закрытие по ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Загружаем машины при старте
loadCars();