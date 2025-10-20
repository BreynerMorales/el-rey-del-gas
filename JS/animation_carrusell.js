const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    const cardCount = indicators.length;

    let currentSlide = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let autoplayInterval;
    let autoplayActive = true;

    function setSlide(index) {
        const width = track.clientWidth;
        currentSlide = index;
        currentTranslate = -width * index;
        prevTranslate = currentTranslate;
        track.style.transition = 'transform 0.3s ease';
        track.style.transform = `translateX(${currentTranslate}px)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((btn, i) => {
            btn.classList.toggle('active', i === currentSlide);
        });
    }

    indicators.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            pauseAutoplay();
            setSlide(i);
            startAutoplay();
        });
    });

    // Mouse/touch drag logic
    track.addEventListener('mousedown', startDrag);
    track.addEventListener('touchstart', startDrag, { passive: false });

    track.addEventListener('mouseup', endDrag);
    track.addEventListener('mouseleave', endDrag);
    track.addEventListener('touchend', endDrag);

    track.addEventListener('mousemove', drag);
    track.addEventListener('touchmove', drag, { passive: false });

    function startDrag(e) {
        pauseAutoplay();
        isDragging = true;
        startX = getPositionX(e);
        animationID = requestAnimationFrame(animation);
        track.style.transition = 'none';
        e.preventDefault(); // evita scroll en móviles
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        const threshold = track.clientWidth * 0.2;
        if (movedBy < -threshold && currentSlide < cardCount - 1) {
            currentSlide++;
        } else if (movedBy > threshold && currentSlide > 0) {
            currentSlide--;
        }

        setSlide(currentSlide);
    }

    function drag(e) {
        if (!isDragging) return;
        const currentX = getPositionX(e);
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        track.style.transform = `translateX(${currentTranslate}px)`;
        e.preventDefault(); // evita scroll
    }

    function getPositionX(e) {
        return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    }

    function animation() {
        if (isDragging) {
            track.style.transform = `translateX(${currentTranslate}px)`;
            requestAnimationFrame(animation);
        }
    }

    // Autoplay
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % cardCount;
            setSlide(currentSlide);
        }, 4000); // cada 4 segundos
        autoplayActive = true;
    }

    function pauseAutoplay() {
        clearInterval(autoplayInterval);
        autoplayActive = false;
    }

    // Toggle desde checkbox
    function toggleAutoplay() {
        if (autoplayActive) {
            pauseAutoplay();
        } else {
            startAutoplay();
        }
    }

    // Responsive
    window.addEventListener('resize', () => setSlide(currentSlide));

    // Inicializar
    setSlide(0);
    startAutoplay();