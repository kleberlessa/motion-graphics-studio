import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { createLogoAnimation } from '../animations/logoAnimation.js';
import { createTextAnimation } from '../animations/textAnimation.js';
import { createMotionGraphics } from '../animations/motionGraphics.js';
import { setupEventListeners, getSectionTitle } from '../utils/ui.js';

gsap.registerPlugin(TextPlugin, MorphSVGPlugin, DrawSVGPlugin);

class MotionStudio {
  constructor() {
    this.currentSection = 'logo';
    this.currentColor = '#00ff88';
    this.speed = 1.0;
    this.easing = 'power2.out';
    this.isPlaying = false;
    this.timeline = null;

    this.init();
  }

  init() {
    setupEventListeners(this);
    this.loadDefaultAssets();
    const { timeline, isPlaying } = createLogoAnimation(
      document.getElementById('canvas-wrapper'),
      this.currentColor,
      this.easing,
      this.speed,
      this.timeline,
      this.isPlaying
    );
    this.timeline = timeline;
    this.isPlaying = isPlaying;
    this.setupTimeline();
  }

  switchSection(section) {
    this.currentSection = section;
    document.getElementById('section-title').textContent =
      getSectionTitle(section);

    let animationResult;
    switch (section) {
      case 'logo':
        animationResult = createLogoAnimation(
          document.getElementById('canvas-wrapper'),
          this.currentColor,
          this.easing,
          this.speed,
          this.timeline,
          this.isPlaying
        );
        this.timeline = animationResult.timeline;
        this.isPlaying = animationResult.isPlaying;
        break;
      case 'text':
        animationResult = createTextAnimation(
          document.getElementById('canvas-wrapper'),
          'Motion Graphics',
          this.currentColor,
          this.timeline,
          this.isPlaying
        );
        this.timeline = animationResult.timeline;
        this.isPlaying = animationResult.isPlaying;
        break;
      case 'mograph':
        animationResult = createMotionGraphics(
          document.getElementById('canvas-wrapper'),
          this.currentColor,
          this.speed,
          this.timeline,
          this.isPlaying
        );
        this.timeline = animationResult.timeline;
        this.isPlaying = animationResult.isPlaying;
        break;
    }
  }

  loadSVGFile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const container = document.getElementById('canvas-wrapper');
        container.innerHTML = e.target.result;
        this.animateLoadedSVG();
      } catch (error) {
        console.error('Error parsing SVG file:', error);
        alert('Error parsing SVG file. Please check the file and try again.');
      }
    };

    reader.onerror = () => {
      console.error('Error reading file.');
      alert('Error reading file. Please try again.');
    };

    reader.readAsText(file);
  }

  animateLoadedSVG() {
    const svg = document.querySelector('#canvas-wrapper svg');
    if (!svg) return;

    const paths = svg.querySelectorAll('path, circle, rect, polygon');

    this.timeline = gsap.timeline({ paused: true });

    paths.forEach((path, i) => {
      const length = path.getTotalLength ? path.getTotalLength() : 100;

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      this.timeline.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: this.easing,
        },
        i * 0.1
      );
    });

    this.timeline.play();
    this.isPlaying = true;
  }

  applyEffect(effect) {
    switch (effect) {
      case 'draw':
        this.timeline.restart();
        break;
      case 'morph':
        this.applyMorphEffect();
        break;
      case 'spin':
        this.applySpinEffect();
        break;
      case 'pulse':
        this.applyPulseEffect();
        break;
      case 'wave':
        this.applyWaveEffect();
        break;
      case 'float':
        this.applyFloatEffect();
        break;
    }
  }

  applyMorphEffect() {
    const paths = document.querySelectorAll('path');
    if (paths.length < 2) return;

    paths.forEach((path) => {
      gsap.to(path, {
        duration: 2,
        morphSVG: paths[Math.floor(Math.random() * paths.length)],
        ease: 'power2.inOut',
      });
    });
  }

  applySpinEffect() {
    const elements = document.querySelectorAll('svg > *');
    elements.forEach((el) => {
      gsap.to(el, {
        rotation: 360,
        transformOrigin: 'center',
        duration: 2 + Math.random(),
        repeat: -1,
        ease: 'none',
      });
    });
  }

  updateColors() {
    const elements = document.querySelectorAll('[fill], [stroke]');
    elements.forEach((el) => {
      if (el.getAttribute('fill') && el.getAttribute('fill') !== 'none') {
        el.setAttribute('fill', this.currentColor);
      }
      if (el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
        el.setAttribute('stroke', this.currentColor);
      }
    });
  }

  play() {
    if (this.timeline) {
      this.timeline.play();
      this.isPlaying = true;
    }
  }

  pause() {
    if (this.timeline) {
      this.timeline.pause();
      this.isPlaying = false;
    }
  }

  reset() {
    if (this.timeline) {
      this.timeline.restart();
      this.timeline.pause();
      this.isPlaying = false;
    }
  }

  setupTimeline() {
    const cursor = document.getElementById('timeline-cursor');
    const scrubber = document.getElementById('timeline-scrubber');

    if (this.timeline) {
      this.timeline.eventCallback('onUpdate', () => {
        const progress = this.timeline.progress();
        cursor.style.left = `${progress * 100}%`;
        scrubber.value = progress * 100;
      });
    }

    scrubber.addEventListener('input', (e) => {
      if (this.timeline) {
        const progress = e.target.value / 100;
        this.timeline.progress(progress);
      }
    });
  }

  exportSVG() {
    const svg = document.querySelector('#canvas-wrapper svg');
    if (!svg) {
      alert('Nenhum SVG para exportar!');
      return;
    }

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'motion-graphic.svg';
    a.click();

    URL.revokeObjectURL(url);
  }

  exportGIF() {
    alert('Para exportar GIF, instale: npm install gif.js');
  }

  loadDefaultAssets() {
    console.log('Studio carregado!');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.motionStudio = new MotionStudio();
});
