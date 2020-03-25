import Game from './Game';
import './style.scss';

const startNewGame = () => new Game();

window.onload = startNewGame;
