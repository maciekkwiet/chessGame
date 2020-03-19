import Piece from './Piece';

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

      if (this.y == 6 && !board[this.x][this.y - 1] && !board[this.x][this.y - 2]) {
        possibleMoves.push(`${this.x},${this.y - 2}`);
      }
      if (board[this.x][this.y - 1]) {
        if (this.x != 0 && board[this.x - 1][this.y - 1] && this.side != board[this.x - 1][this.y - 1].side) {
          possibleMoves.push(`${this.x - 1},${this.y - 1}`);
        }

        if (this.x != 7 && board[this.x + 1][this.y - 1] && this.side != board[this.x + 1][this.y - 1].side) {
          possibleMoves.push(`${this.x + 1},${this.y - 1}`);
        }
      }
    }
    if (this.side == 'black') {
      if (!board[this.x][this.y + 1]) {
        possibleMoves.push(`${this.x},${this.y + 1}`);
      }

      if (this.y == 1 && !board[this.x][this.y + 1] && !board[this.x][this.y + 2]) {
        possibleMoves.push(`${this.x},${this.y + 2}`);
      }
      if (board[this.x][this.y + 1]) {
        if (this.x != 0 && board[this.x - 1][this.y + 1] && this.side != board[this.x - 1][this.y + 1].side) {
          possibleMoves.push(`${this.x - 1},${this.y + 1}`);
        }

        if (this.x != 7 && board[this.x + 1][this.y + 1] && this.side != board[this.x + 1][this.y + 1].side) {
          possibleMoves.push(`${this.x + 1},${this.y + 1}`);
        }
      }
    }
    return possibleMoves;
  }
  promote() {}
  enPassant() {}
}

export default Pawn;
