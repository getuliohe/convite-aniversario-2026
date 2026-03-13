document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SCROLL REVEAL (Entrada suave dos elementos)
    // ==========================================
    const elementsToAnimate = document.querySelectorAll('.animate-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elementsToAnimate.forEach((element) => {
        observer.observe(element);
    });

    // ==========================================
    // 2. EFEITO NEON NO TÍTULO
    // ==========================================
    const titulo = document.querySelector('h1');
    if (titulo) titulo.classList.add('neon-flicker');

    // ==========================================
    // 3. EFEITO DE CLIQUE NO BOTÃO
    // ==========================================
    const btnConfirmar = document.getElementById('btnConfirmar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function(e) {
            e.preventDefault(); 
            alert("A Nave vai decolar! Sua presença foi registrada no Rock Doido!");
            
            this.style.transform = 'scale(0.9)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    }

    // ==========================================
    // 4. NOVO: EFEITO 3D (TILT) NOS CARDS (Apenas PC)
    // ==========================================
    const cards = document.querySelectorAll('.info-card, .about-section, .video-container, .spotify-container');
    
    // Verifica se não é um dispositivo touch (celular) para aplicar o efeito de mouse
    if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calcula a rotação (máximo de 8 graus)
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mouseleave', () => {
                // Reseta a posição suavemente quando o mouse sai
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease';
            });
        });
    }

    // ==========================================
    // 5. NOVO: BATIDA DE GRAVE NO CROCODILO (Pulsação)
    // ==========================================
    const crocodilo = document.querySelector('.aparelhagem-img');
    if (crocodilo) {
        // A cada 600ms (aprox 100 BPM) ele dá um leve pulo
        setInterval(() => {
            // Só faz a batida se o crocodilo já tiver aparecido na tela
            if(crocodilo.classList.contains('show')) {
                crocodilo.style.transform = 'scale(1.03)';
                setTimeout(() => {
                    crocodilo.style.transform = 'scale(1)';
                }, 150); // Duração da batida
            }
        }, 600); 
    }

    // ==========================================
    // 6. NOVO: SHOW DE LASERS (Luzes de fundo dinâmicas)
    // ==========================================
    const coresLaser = ['#ff003c', '#00ff33', '#ffcc00', '#00e5ff']; // Vermelho, Verde, Amarelo, Ciano

    function criarLaser() {
        const laser = document.createElement('div');
        laser.classList.add('festa-laser');
        
        // Posição horizontal aleatória
        laser.style.left = Math.random() * 100 + 'vw';
        
        // Cor aleatória
        const corRandom = coresLaser[Math.floor(Math.random() * coresLaser.length)];
        laser.style.background = `linear-gradient(to top, transparent, ${corRandom})`;
        laser.style.boxShadow = `0 0 10px ${corRandom}, 0 0 20px ${corRandom}`;
        
        // Ângulo aleatório (entre -30 e 30 graus)
        const angulo = (Math.random() - 0.5) * 60;
        laser.style.transform = `rotate(${angulo}deg)`;

        // Duração da animação aleatória (entre 1 e 2.5 segundos)
        const duracao = (Math.random() * 1.5) + 1;
        laser.style.animationDuration = duracao + 's';

        document.body.appendChild(laser);

        // Remove o laser do HTML depois que a animação acaba
        setTimeout(() => {
            laser.remove();
        }, duracao * 1000);
    }

    // Cria um novo laser a cada 800 milissegundos
    setInterval(criarLaser, 800);
});