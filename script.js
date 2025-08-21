 document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.querySelector('.carousel');
            const slides = document.querySelectorAll('.carousel-slide');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const indicators = document.querySelectorAll('.carousel-indicator');
            
            let currentIndex = 0;
            let slideWidth = slides[0].clientWidth;
            let interval;
            const slideInterval = 5000; // 5 segundos
            
            // Inicializar carrossel
            function init() {
                updateCarousel();
                startAutoSlide();
                
                // Atualizar tamanho quando a janela for redimensionada
                window.addEventListener('resize', function() {
                    slideWidth = slides[0].clientWidth;
                    updateCarousel();
                });
                
                // Event listeners para navegação
                prevBtn.addEventListener('click', prevSlide);
                nextBtn.addEventListener('click', nextSlide);
                
                // Event listeners para indicadores
                indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        goToSlide(index);
                    });
                });
            }
            
            // Atualizar a posição do carrossel
            function updateCarousel() {
                carousel.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
                updateIndicators();
            }
            
            // Atualizar indicadores ativos
            function updateIndicators() {
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
            }
            
            // Ir para slide anterior
            function prevSlide() {
                currentIndex = (currentIndex <= 0) ? slides.length - 1 : currentIndex - 1;
                updateCarousel();
                resetAutoSlide();
            }
            
            // Ir para próximo slide
            function nextSlide() {
                currentIndex = (currentIndex >= slides.length - 1) ? 0 : currentIndex + 1;
                updateCarousel();
                resetAutoSlide();
            }
            
            // Ir para slide específico
            function goToSlide(index) {
                currentIndex = index;
                updateCarousel();
                resetAutoSlide();
            }
            
            // Iniciar slides automáticos
            function startAutoSlide() {
                interval = setInterval(nextSlide, slideInterval);
            }
            
            // Reiniciar slides automáticos
            function resetAutoSlide() {
                clearInterval(interval);
                startAutoSlide();
            }
            
            // Pausar quando o mouse estiver sobre o carrossel
            carousel.addEventListener('mouseenter', () => {
                clearInterval(interval);
            });
            
            // Continuar quando o mouse sair do carrossel
            carousel.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
            
            // Iniciar
            init();
        });