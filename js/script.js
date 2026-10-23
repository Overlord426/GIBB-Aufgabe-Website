document.addEventListener('DOMContentLoaded', () => {
  // 1. Анимации прокрутки страницы
  const animatedElements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));

  // 2. 3D-Карусель меню
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  cards.forEach((card, idx) => {
    if (card.classList.contains('active')) currentIndex = idx;
  });

  function updateCarousel() {
    const total = cards.length;
    const angleStep = 360 / total;
    
    cards.forEach((card, index) => {
      const offset = (index - currentIndex + total) % total;
      let transform = '';
      
      if (offset === 0) {
        transform = 'translateX(0) translateZ(80px) scale(1)';
        card.style.opacity = '1';
        card.style.zIndex = '3';
      } else if (offset === 1 || offset === -2) {
        transform = 'translateX(90px) translateZ(0px) rotateY(-35deg) scale(0.85)';
        card.style.opacity = '0.6';
        card.style.zIndex = '2';
      } else {
        transform = 'translateX(-90px) translateZ(0px) rotateY(35deg) scale(0.85)';
        card.style.opacity = '0.6';
        card.style.zIndex = '2';
      }
      
      card.style.transform = transform;
    });
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  updateCarousel();
});