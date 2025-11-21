// Target date: November 28, 2025, 3:00 PM
const targetDate = new Date('2025-11-28T19:54:00').getTime();

// List of images in the images folder
const imageList = [
    'images/imatge1.webp',
    'images/imatge2.webp',
    'images/imatge4.webp',
    'images/imatge5.webp',
    'images/imatge6.webp',
    'images/imatge7.webp',
    'images/imatge8.webp',
    'images/imatge9.webp',
    'images/imatge10.webp',
    'images/imatge11.webp'
];

// Load a random image on page load
function loadRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    const imgElement = document.getElementById('random-image');
    imgElement.src = imageList[randomIndex];
}

// Countdown timer function
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update the countdown display
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        // Continue updating every second
        setTimeout(updateCountdown, 1000);
    } else {
        // Countdown finished
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.querySelectorAll('.label').forEach(label => {
            label.textContent = 'Time\'s Up!';
        });

        // Trigger celebration animation
        startCelebration();
    }
}

// Celebration Animation using Canvas
function startCelebration() {
    const canvas = document.getElementById('celebration-canvas');
    canvas.classList.add('active');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Confetti particles
    const confetti = [];
    const confettiCount = 150;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493'];

    // Create confetti particles
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }

    let animationFrameId;

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((particle, index) => {
            ctx.beginPath();
            ctx.lineWidth = particle.r / 2;
            ctx.strokeStyle = particle.color;
            ctx.moveTo(particle.x + particle.tilt + particle.r, particle.y);
            ctx.lineTo(particle.x + particle.tilt, particle.y + particle.tilt + particle.r);
            ctx.stroke();

            // Update particle position
            particle.tiltAngle += particle.tiltAngleIncremental;
            particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
            particle.tilt = Math.sin(particle.tiltAngle - index / 3) * 15;

            // Reset particle if it goes off screen
            if (particle.y > canvas.height) {
                confetti[index] = {
                    x: Math.random() * canvas.width,
                    y: -10,
                    r: particle.r,
                    d: particle.d,
                    color: particle.color,
                    tilt: particle.tilt,
                    tiltAngleIncremental: particle.tiltAngleIncremental,
                    tiltAngle: particle.tiltAngle
                };
            }
        });

        animationFrameId = requestAnimationFrame(drawConfetti);
    }

    drawConfetti();

    // Stop animation after 10 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.remove('active');
    }, 10000);
}

// Check if countdown has already finished on page load
function checkCountdownStatus() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        // Countdown has finished, show celebration
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.querySelectorAll('.label').forEach(label => {
            label.textContent = 'Time\'s Up!';
        });
        startCelebration();
    } else {
        // Start normal countdown
        updateCountdown();
    }
}

// Handle window resize for canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('celebration-canvas');
    if (canvas.classList.contains('active')) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Initialize on page load
window.addEventListener('load', () => {
    loadRandomImage();
    checkCountdownStatus();
});
