import './styles/style.scss';

import Game from './Game';
import { handleOverlay } from './utils';
import ThemePicker from './ThemePicker';

const startNewGame = () => {
  handleOverlay();
  new ThemePicker();
  new Game();
};

window.onload = startNewGame;
