import './styles/style.scss';

import Game from './Game';
import { handleOverlay } from './utils';
import ThemePicker from './ThemePicker';

const play = document.querySelector('#play');
const overlay = document.querySelector('#startScreen');
const themePicker = new ThemePicker();
play.addEventListener('click', function() {
  overlay.style.animationPlayState = 'running';
  const currentColor = themePicker.currentColor;
  new Game(currentColor);
});

// const startNewGame = async () => {
//   handleOverlay();
//   const themePicker = new ThemePicker();
//   const currentColor = await themePicker.getCurrentColor();
//   new Game(currentColor);
// };

// window.onload = startNewGame;
