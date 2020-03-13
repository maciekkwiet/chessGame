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
    for (let x = 0; x < this.gameArea.length; x++) {
      for (let y = 0; y < this.gameArea[x].length; y++) {
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
    let pawn = new Pawn(6, 0, 'white');
    this.gameArea[pawn.x][pawn.y] = pawn;
    pawn = new Pawn(6, 1, 'white');
    this.gameArea[pawn.x][pawn.y] = pawn;
  }
  movePiece(from, to) {
    console.log(from, to);
    const [fromX, fromY] = from;
    const [toX, toY] = to;
    const pieceToMove = this.gameArea[fromX][fromY];
    pieceToMove.move(to);
    this.gameArea[toX][toY] = pieceToMove;
    this.gameArea[fromX][fromY] = null;
    console.log(this.gameArea);
  }
}

export default Board;
