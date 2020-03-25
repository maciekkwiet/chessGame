import Piece from './Piece';
import Queen from './Queen';
import Bishop from './Bishop';
import King from './King';
import Knight from './Knight';

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }
  findLegalMoves(board) {
    const possibleMoves = [];

    if (this.side == 'white') {
      if (!board[this.x][this.y - 1]) {
        possibleMoves.push(`${this.x},${this.y - 1}`);
      }

      if (this.y == 6 && !board[this.x][this.y - 2]) {
        possibleMoves.push(`${this.x},${this.y - 2}`);
      }

      if (this.x != 0 && board[this.x - 1][this.y - 1] && this.side != board[this.x - 1][this.y - 1].side) {
        possibleMoves.push(`${this.x - 1},${this.y - 1}`);
      }

      if (this.x != 7 && board[this.x + 1][this.y - 1] && this.side != board[this.x + 1][this.y - 1].side) {
        possibleMoves.push(`${this.x + 1},${this.y - 1}`);
      }
    }
    if (this.side == 'black') {
      if (!board[this.x][this.y + 1]) {
        possibleMoves.push(`${this.x},${this.y + 1}`);
      }

      if (this.y == 1 && !board[this.x][this.y + 2]) {
        possibleMoves.push(`${this.x},${this.y + 2}`);
      }
      if (this.x != 0 && board[this.x - 1][this.y + 1] && this.side != board[this.x - 1][this.y + 1].side) {
        possibleMoves.push(`${this.x - 1},${this.y + 1}`);
      }

      if (this.x != 7 && board[this.x + 1][this.y + 1] && this.side != board[this.x + 1][this.y + 1].side) {
        possibleMoves.push(`${this.x + 1},${this.y + 1}`);
      }
    }

    return possibleMoves;
  }
  promote(gameArea) {
    let promotionBG = document.querySelector('.promotion-bg');
    let promotionQueen = document.querySelector('.promotion-queen');
    let promotionBishop = document.querySelector('.promotion-bishop');
    let promotionKing = document.querySelector('.promotion-king');
    let promotionKnight = document.querySelector('.promotion-knight');
    let promotionRook = document.querySelector('.promotion-rook');

    document.getElementById(`${this.x},${this.y}`).innerHTML = '';

    promotionBG.classList.add('bg-active');

    promotionQueen.addEventListener('click', () => {
      let queen = new Queen(this.x, this.y, 'white');

      gameArea[this.x][this.y] = queen;
      document.getElementById(`${this.x},${this.y}`).innerHTML = queen.display;
      promotionBG.classList.remove('bg-active');
      // document.getElementById(`${this.x},${this.y}`).innerHTML = '';
    });

    promotionBishop.addEventListener('click', () => {
      let bishop = new Bishop(this.x, this.y, 'white');

      gameArea[this.x][this.y] = bishop;
      document.getElementById(`${this.x},${this.y}`).innerHTML = bishop.display;
      promotionBG.classList.remove('bg-active');
    });

    promotionKnight.addEventListener('click', () => {
      let knight = new Knight(this.x, this.y, 'white');
      console.log(this.x);
      console.log(this.y);
      gameArea[this.x][this.y] = knight;
      document.getElementById(`${this.x},${this.y}`).innerHTML = knight.display;
      promotionBG.classList.remove('bg-active');
    });
    promotionRook.addEventListener('click', () => {
      let rook = new Rook(this.x, this.y, 'white');
      gameArea[this.x][this.y] = rook;
      document.getElementById(`${this.x},${this.y}`).innerHTML = rook.display;
      promotionBG.classList.remove('bg-active');
    });
  }

  enPassant() {}
}

export default Pawn;
