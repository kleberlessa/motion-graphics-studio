export function createMotionGraphics(
  container,
  currentColor,
  speed,
  timeline,
  isPlaying
) {
  container.innerHTML = '';

  // Criar canvas para motion graphics
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.1)';

  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const particles = [];

  // Criar partículas
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      color: currentColor,
      life: 1,
    });
  }

  // Função de animação
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.speedX * speed;
      p.y += p.speedY * speed;

      // Rebater nas bordas
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      // Desenhar partícula
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Resetar vida se necessário
      if (p.life <= 0) p.life = 1;
    });

    // Conectar partículas próximas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = 0.2 * (1 - distance / 100);
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;

    if (isPlaying) {
      requestAnimationFrame(animate);
    }
  };

  timeline = {
    play: () => {
      isPlaying = true;
      animate();
    },
    pause: () => {
      isPlaying = false;
    },
    restart: () => {
      particles.forEach((p) => {
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
      });
    },
  };

  timeline.play();
  return { timeline, isPlaying };
}
