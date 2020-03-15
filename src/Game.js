import Board from './Board';
import { parseId } from './utils';

class Game {
  constructor() {
    this.board = new Board();
    this.gameArea = this.board.gameArea;
    this.gameAreaHandler = this.board.gameAreaHandler;
    this.possibleMoves = [];
    this.selectedPiece = null;
    this.gameAreaHandler.addEventListener('click', e => this.onClick(e));
  }

  onClick(e) {
    const element = e.target.classList.contains('square') ? e.target : e.target.parentElement;
    if (this.possibleMoves.length !== 0) {
      this.handleMove(element);
    } else {
      this.handleSelect(element);
    }
  }

  handleSelect(element) {
    const [x, y] = parseId(element.id);

    if (!this.gameArea[x][y]) {
      return;
    }

    this.selectedPiece = this.gameArea[x][y];
    this.possibleMoves = this.selectedPiece.findLegalMoves();
    this.board.highlightPossibleMoves(this.possibleMoves);
  }
  handleMove(element) {
    const { id } = element;
    if (!this.possibleMoves.includes(id)) return;
    this.board.movePiece(this.selectedPiece, parseId(id));
    this.board.removeHighlight();
    this.selectedPiece = null;
    this.possibleMoves = [];
  }
}

export default Game;