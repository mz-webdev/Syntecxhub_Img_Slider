const container = document.getElementById('slides');
const slides = document.querySelectorAll('.slide-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const pagination = document.getElementById('pagination');

let currentIndex = 0;
const totalSlides = slides.length;

// Init Pagination
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    pagination.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Optional: Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
});

// Auto-slide every 6 seconds
let autoPlay = setInterval(nextSlide, 6000);

// Pause auto-play on hover
document.querySelector('.slider-wrapper').addEventListener('mouseenter', () => clearInterval(autoPlay));
document.querySelector('.slider-wrapper').addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 6000));
