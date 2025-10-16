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

  // ==========================
  // Carrossel
  // ==========================
const slides = document.querySelector('.sinopse__slides');
const slide = document.querySelectorAll('.sinopse__slide');
const prevBtn = document.querySelector('.sinopse__arrow--left');
const nextBtn = document.querySelector('.sinopse__arrow--right');

let index = 0;

// Clonar primeiro e último slide
const firstClone = slide[0].cloneNode(true);
const lastClone = slide[slide.length - 1].cloneNode(true);

slides.appendChild(firstClone);
slides.insertBefore(lastClone, slide[0]);

let slideWidth = slide[0].clientWidth;
slides.style.transform = `translateX(-${slideWidth}px)`; // começa no primeiro real

// Função para mover slides
function moveToSlide(i) {
    slides.style.transition = 'transform 1s ease-in-out';
    slides.style.transform = `translateX(-${(i + 1) * slideWidth}px)`;
    index = i;

    // Quando a transição terminar, checa se precisa “resetar”
    slides.addEventListener('transitionend', () => {
        if (slide[index]) return; // se estiver dentro do range
        if (index >= slide.length) { // chegou no clone do primeiro
            slides.style.transition = 'none';
            slides.style.transform = `translateX(-${slideWidth}px)`; // volta para o primeiro real
            index = 0;
        }
        if (index < 0) { // clone do último
            slides.style.transition = 'none';
            slides.style.transform = `translateX(-${slide.length * slideWidth}px)`; // último real
            index = slide.length - 1;
        }
    }, { once: true });
}

// Botões
nextBtn.addEventListener('click', () => moveToSlide(index + 1));
prevBtn.addEventListener('click', () => moveToSlide(index - 1));

// Passagem automática
setInterval(() => {
    moveToSlide(index + 1);
}, 4000);
}
)


