import Board from './Board';
import { parseId } from './utils';

class Game {
  constructor() {
    this.board = new Board();
    this.gameArea = this.board.gameArea;
    this.gameAreaHandler = this.board.gameAreaHandler;
    this.inSelectMode = true;
    this.gameAreaHandler.addEventListener('click', e => this.handleSelect(e));
  }

  handleSelect(e) {
    if (!this.inSelectMode) return;
    const element = e.target.classList.contains('square') ? e.target : e.target.parentElement;

    const x = Number(element.id[0]);
    const y = Number(element.id[2]);

    if (!this.gameArea[x][y]) {
      return;
    }
    const possibleMoves = this.gameArea[x][y].findLegalMoves();

    for (let move of possibleMoves) {
      this.inSelectMode = false;
      document.getElementById(move).classList.add('possibleMove');
      document.getElementById(move).addEventListener('click', e => this.handleMove(e, x, y), { once: true });
    }
  }
  handleMove(e, x, y) {
    //ToDo refactor
    e.stopPropagation();
    const { id } = e.currentTarget;
    this.board.movePiece([x, y], parseId(id));

    for (let x = 0; x < this.gameArea.length; x++) {
      for (let y = 0; y < this.gameArea[x].length; y++) {
        document.getElementById(`${x},${y}`).classList.remove('possibleMove');
        let old_element = document.getElementById(`${x},${y}`);
        let new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
      }
    }
    this.inSelectMode = true;
  }
}

export default Game;
