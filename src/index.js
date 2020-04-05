import './styles/style.scss';

import Game from './Game';
import { handleOverlay } from './utils';

const startNewGame = () => {
  handleOverlay();
  new Game();
};

window.onload = startNewGame;
