import Pawn from './pieces/Pawn';
import { create2DArray } from './utils';

class Board {
  constructor() {
    this.gameArea = create2DArray();
    this.gameAreaHandler = document.getElementById('board');
    this.setPieces();
    this.setup();
  }
  setup() {
    for (let y = 0; y < this.gameArea.length; y++) {
      for (let x = 0; x < this.gameArea[y].length; x++) {
        const square = document.createElement('div');
        square.id = `${x},${y}`;
        // square.innerHTML = `${x}, ${y}`; // by lepiej widzieć indeksy
        square.innerHTML = this.gameArea[x][y] ? this.gameArea[x][y].display : '';
        square.className = 'square';
        square.className += x % 2 == y % 2 ? ' light' : ' dark';
        this.gameAreaHandler.appendChild(square);
      }
    }
  }
  setPieces() {
    //Tu trzeba wstawić figury wedle przykładu dla pionka, wstawianie pionków można zrobić sprytniej, np w pętli
    let pawn = new Pawn(0, 6, 'white');
    this.gameArea[pawn.x][pawn.y] = pawn;
    for (let i = 1; i < this.gameArea.length; i++) {
      pawn = new Pawn(i, 6, 'white');
      this.gameArea[pawn.x][pawn.y] = pawn;
    }

    for (let i = 0; i < this.gameArea.length; i++) {
      pawn = new Pawn(i, 1, 'black');
      this.gameArea[pawn.x][pawn.y] = pawn;
    }
  }

  highlightPossibleMoves(possibleMoves) {
    for (let move of possibleMoves) {
      document.getElementById(move).classList.add('possibleMove');
    }
  }

  removeHighlight() {
    for (let x = 0; x < this.gameArea.length; x++) {
      for (let y = 0; y < this.gameArea[x].length; y++) {
        document.getElementById(`${x},${y}`).classList.remove('possibleMove');
      }
    }
  }

  movePiece(pieceToMove, to) {
    const [toX, toY] = to;
    this.gameArea[pieceToMove.x][pieceToMove.y] = null;

    pieceToMove.move(to);
    this.gameArea[toX][toY] = pieceToMove;
  }
}

export default Board;
