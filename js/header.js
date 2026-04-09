// ===== СЛАЙДЕР =====

const slides = document.querySelectorAll('.slide');
const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;
let totalSlides = slides.length;

// Переключение на слайд
function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

// Следующий слайд
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
}

// Предыдущий слайд
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
}

// Действия
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

// Обработка клика по кнопке "следующий слайд"
nextBtn.addEventListener('click', () => {
    nextSlide();
});

// Запуск
createDots();
