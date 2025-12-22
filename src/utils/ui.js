export function setupEventListeners(app) {
  // Navegação
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document
        .querySelectorAll('.nav-btn')
        .forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      app.switchSection(e.target.dataset.section);
    });
  });

  // Controles de velocidade
  const speedSlider = document.getElementById('timeline-speed');
  const speedValue = document.getElementById('speed-value');

  speedSlider.addEventListener('input', (e) => {
    app.speed = parseFloat(e.target.value);
    speedValue.textContent = `${app.speed.toFixed(1)}x`;
    if (app.timeline) {
      app.timeline.timeScale(app.speed);
    }
  });

  // Controles de easing
  document.getElementById('easing-select').addEventListener('change', (e) => {
    app.easing = e.target.value;
  });

  // Controles de cor
  document.querySelectorAll('.color-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document
        .querySelectorAll('.color-btn')
        .forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      app.currentColor = e.target.dataset.color;
      app.updateColors();
    });
  });

  // Controles de play/pause
  document
    .getElementById('play-btn')
    .addEventListener('click', () => app.play());
  document
    .getElementById('pause-btn')
    .addEventListener('click', () => app.pause());
  document
    .getElementById('reset-btn')
    .addEventListener('click', () => app.reset());

  // Upload de SVG
  const uploadArea = document.getElementById('upload-area');
  const svgUpload = document.getElementById('svg-upload');

  uploadArea.addEventListener('click', () => {
    svgUpload.click();
  });

  svgUpload.addEventListener('change', (e) => {
    app.loadSVGFile(e.target.files[0]);
  });

  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.style.borderColor = '#00ff88';
    uploadArea.style.background = 'rgba(0, 255, 136, 0.05)';
  });

  uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    uploadArea.style.background = 'rgba(255, 255, 255, 0.02)';
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    uploadArea.style.background = 'rgba(255, 255, 255, 0.02)';

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'image/svg+xml') {
      app.loadSVGFile(file);
    }
  });

  // Assets de texto
  document.querySelectorAll('.asset-item[data-text]').forEach((item) => {
    item.addEventListener('click', (e) => {
      const text = e.target.dataset.text;
      const { timeline, isPlaying } = app.createTextAnimation(text);
      app.timeline = timeline;
      app.isPlaying = isPlaying;
    });
  });

  // Efeitos
  document.querySelectorAll('.effect-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const effect = e.target.dataset.effect;
      app.applyEffect(effect);
    });
  });

  // Exportação
  document
    .getElementById('export-svg')
    .addEventListener('click', () => app.exportSVG());
  document
    .getElementById('export-gif')
    .addEventListener('click', () => app.exportGIF());
}

export function getSectionTitle(section) {
  const titles = {
    logo: 'Logo Animado',
    text: 'Motion Text',
    mograph: 'Motion Graphics',
  };
  return titles[section] || 'Animation Studio';
}
