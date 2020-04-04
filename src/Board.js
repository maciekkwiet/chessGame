import Rook from './pieces/Rook';
import Queen from './pieces/Queen';
import Pawn from './pieces/Pawn';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import King from './pieces/King';
import { copy2DArray, create2DArray } from './utils';

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

    let rook = new Rook(0, 7, 'white');
    this.gameArea[rook.x][rook.y] = rook;
    rook = new Rook(7, 7, 'white');
    this.gameArea[rook.x][rook.y] = rook;
    rook = new Rook(0, 0, 'black');
    this.gameArea[rook.x][rook.y] = rook;
    rook = new Rook(7, 0, 'black');
    this.gameArea[rook.x][rook.y] = rook;

    let queen = new Queen(3, 7, 'white');
    this.gameArea[queen.x][queen.y] = queen;
    queen = new Queen(3, 0, 'black');
    this.gameArea[queen.x][queen.y] = queen;

    let knight = new Knight(1, 7, 'white');
    this.gameArea[knight.x][knight.y] = knight;
    knight = new Knight(6, 7, 'white');
    this.gameArea[knight.x][knight.y] = knight;
    knight = new Knight(6, 0, 'black');
    this.gameArea[knight.x][knight.y] = knight;
    knight = new Knight(1, 0, 'black');
    this.gameArea[knight.x][knight.y] = knight;

    let king = new King(4, 7, 'white');
    this.gameArea[king.x][king.y] = king;
    king = new King(4, 0, 'black');
    this.gameArea[king.x][king.y] = king;

    for (let i = 0; i < this.gameArea.length; i++) {
      this.gameArea[i][6] = new Pawn(i, 6, 'white');
    }

    for (let i = 0; i < this.gameArea.length; i++) {
      this.gameArea[i][1] = new Pawn(i, 1, 'black');
    }

    let bishop = new Bishop(2, 7, 'white');
    this.gameArea[bishop.x][bishop.y] = bishop;
    bishop = new Bishop(5, 7, 'white');
    this.gameArea[bishop.x][bishop.y] = bishop;
    bishop = new Bishop(5, 0, 'black');
    this.gameArea[bishop.x][bishop.y] = bishop;
    bishop = new Bishop(2, 0, 'black');
    this.gameArea[bishop.x][bishop.y] = bishop;
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

  destroyPawn(gameArea, x, y) {
    this.gameArea[+x][+y] = null;
    document.getElementById(`${+x},${+y}`).innerHTML = '';
  }

  tryPieceMove(pieceToMove, to) {
    const copyOfGameArea = copy2DArray(this.gameArea);
    const [toX, toY] = to;
    copyOfGameArea[pieceToMove.x][pieceToMove.y] = null;
    copyOfGameArea[toX][toY] = pieceToMove;
    return copyOfGameArea;
  }
}

export default Board;
