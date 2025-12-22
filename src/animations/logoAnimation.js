import { gsap } from 'gsap';
import { createSVGElement } from '../utils/svgUtils.js';

export function createLogoAnimation(
  container,
  currentColor,
  easing,
  speed,
  timeline,
  isPlaying
) {
  container.innerHTML = '';

  // Criar SVG do logo
  const svg = createSVGElement('svg', {
    id: 'main-svg',
    viewBox: '0 0 800 600',
    width: '100%',
    height: '100%',
  });

  // Elementos do logo
  const elements = {
    bg: createSVGElement('circle', {
      id: 'logo-bg',
      cx: '400',
      cy: '300',
      r: '150',
      fill: 'none',
      stroke: currentColor,
      'stroke-width': '8',
      opacity: '0.3',
    }),

    star: createSVGElement('path', {
      id: 'logo-star',
      d: 'M400,200 L440,270 L520,270 L460,320 L500,390 L400,340 L300,390 L340,320 L280,270 L360,270 Z',
      fill: 'none',
      stroke: currentColor,
      'stroke-width': '6',
      'stroke-linecap': 'round',
    }),

    text: createSVGElement(
      'text',
      {
        id: 'logo-text',
        x: '400',
        y: '500',
        'text-anchor': 'middle',
        'font-size': '40',
        fill: currentColor,
        'font-weight': 'bold',
      },
      'MOTION STUDIO'
    ),
  };

  // Adicionar elementos ao SVG
  Object.values(elements).forEach((el) => svg.appendChild(el));
  container.appendChild(svg);

  // Configurar timeline
  timeline = gsap.timeline({
    paused: true,
    defaults: {
      ease: easing,
      duration: 1 * speed,
    },
  });

  timeline
    .fromTo(
      '#logo-bg',
      { strokeDasharray: 942, strokeDashoffset: 942 },
      { strokeDashoffset: 0, duration: 2 }
    )
    .fromTo(
      '#logo-star',
      { strokeDasharray: 500, strokeDashoffset: 500 },
      { strokeDashoffset: 0 },
      '-=1.5'
    )
    .fromTo('#logo-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.5');

  // Iniciar timeline
  timeline.play();
  isPlaying = true;

  return { timeline, isPlaying };
}
