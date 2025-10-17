document.addEventListener("DOMContentLoaded", () => {
// Efeito máquina de escrever
    const heroTitle = document.querySelector(".hero__title");
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = "";
        let i = 0;
        (function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 120);
        }
        })();
    }

// Header transparente ao rolar
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("header--scrolled", window.scrollY > 50);
    });

// Rolagem suave
    document.querySelectorAll(".header__list-item a").forEach(link => {
        link.addEventListener("click", e => {
        e.preventDefault();
        const section = document.querySelector(link.getAttribute("href"));
        if (section) section.scrollIntoView({ behavior: "smooth" });
        });
    });

// Carrossel
    const slidesContainer = document.querySelector('.sinopse__slides');
    const slides = Array.from(document.querySelectorAll('.sinopse__slide'));
    const prevBtn = document.querySelector('.sinopse__arrow--left');
    const nextBtn = document.querySelector('.sinopse__arrow--right');

    let index = 0;
    const slideWidth = slides[0].clientWidth;

    // Clonar primeiro e último slide
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

    let isTransitioning = false;

    // Posiciona no primeiro slide real
    slidesContainer.style.transform = `translateX(-${slideWidth}px)`;

    function moveToSlide(i) {
        if (isTransitioning) return;
        isTransitioning = true;

        slidesContainer.style.transition = 'transform 0.8s ease-in-out';
        slidesContainer.style.transform = `translateX(-${(i + 1) * slideWidth}px)`;
        index = i;
    }

    slidesContainer.addEventListener('transitionend', () => {
        // Clone do primeiro
        if (index >= slides.length) {
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(-${slideWidth}px)`;
        index = 0;
        }

        // Clone do último
        if (index < 0) {
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(-${slides.length * slideWidth}px)`;
        index = slides.length - 1;
        }

        isTransitioning = false;
    });

    nextBtn.addEventListener('click', () => moveToSlide(index + 1));
    prevBtn.addEventListener('click', () => moveToSlide(index - 1));

    setInterval(() => {
        moveToSlide(index + 1);
    }, 5000);
});



