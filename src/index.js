import Game from './Game';
import './styles/style.scss';
const startNewGame = () => new Game();

window.onload = startNewGame;
