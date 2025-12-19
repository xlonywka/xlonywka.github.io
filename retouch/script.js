// Блокируем скролл при старте
document.body.classList.add('loading');

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Плавное исчезновение
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        document.body.classList.remove('loading');
    }, 500); // Небольшая задержка в 0.5 сек для плавности
});

// --- СБРОС СКРОЛЛА В НАЧАЛО ---
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Принудительно скроллим вверх
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    // Находим все контейнеры слайдеров
    const containers = document.querySelectorAll(".compare-container");

    containers.forEach(container => {
        const afterImage = container.querySelector(".img-wrapper.after");
        const handle = container.querySelector(".handle");

        // Функция обновления слайдера
        function updateSlider(clientX) {
            // Получаем координаты и ширину контейнера
            const rect = container.getBoundingClientRect();
            
            // Вычисляем положение курсора внутри контейнера
            let x = clientX - rect.left;

            // Не даем выйти за границы
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;

            // Считаем процент (от 0 до 100)
            const percentage = (x / rect.width) * 100;

            // 1. Меняем обрезку картинки (clip-path)
            // inset(0 RIGHT 0 0) -> где RIGHT = 100% минус текущая позиция
            afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            
            // 2. Двигаем ползунок
            handle.style.left = percentage + "%";
        }

        // Событие для мыши (ПК)
        container.addEventListener("mousemove", (e) => {
            updateSlider(e.clientX);
        });

        // Событие для пальца (Телефон)
        container.addEventListener("touchmove", (e) => {
            updateSlider(e.touches[0].clientX);
        }, { passive: true });
    });
});