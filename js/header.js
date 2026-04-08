// ===== СЛАЙДЕР =====
const slides = document.querySelectorAll('.slide');
const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;
let totalSlides = slides.length;
let autoInterval;

// Создаём точки
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Переключение на слайд
function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

// Обновить активную точку
function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        if (i === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
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

// Автопрокрутка
function startAutoSlide() {
    autoInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoInterval);
}

// События
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

// При наведении на слайдер — автопрокрутка останавливается
const sliderContainer = document.querySelector('.slider-container-main');
sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);

// Запуск
createDots();
startAutoSlide();