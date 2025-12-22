import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin, TextPlugin, DrawSVGPlugin);

export function createSVGElement(type, attributes, textContent = null) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const element = document.createElementNS(svgNS, type);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}
