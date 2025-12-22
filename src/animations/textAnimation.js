import { gsap } from 'gsap';
import { createSVGElement } from '../utils/svgUtils.js';

export function createTextAnimation(
  container,
  text,
  currentColor,
  timeline,
  isPlaying
) {
  container.innerHTML = '';

  const svg = createSVGElement('svg', {
    viewBox: '0 0 800 600',
    width: '100%',
    height: '100%',
  });

  const textElement = createSVGElement(
    'text',
    {
      id: 'animated-text',
      x: '400',
      y: '300',
      'text-anchor': 'middle',
      'font-size': '60',
      fill: currentColor,
      'font-weight': 'bold',
    },
    text
  );

  svg.appendChild(textElement);
  container.appendChild(svg);

  // Animar texto
  timeline = gsap.timeline({ paused: true });

  // Split text into letters for animation
  const letters = text.split('');
  textElement.textContent = '';

  letters.forEach((letter, i) => {
    const tspan = createSVGElement(
      'tspan',
      {
        dy: i === 0 ? '0' : '0',
        opacity: 0,
        x: '400',
        fill: currentColor,
      },
      letter === ' ' ? '\u00A0' : letter
    );

    textElement.appendChild(tspan);

    timeline.to(
      tspan,
      {
        opacity: 1,
        y: -10,
        duration: 0.1,
        ease: 'back.out(1.7)',
      },
      i * 0.1
    );
  });

  timeline.play();
  isPlaying = true;

  return { timeline, isPlaying };
}
