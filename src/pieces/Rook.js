import Piece from './piece';

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }
  findLegalMoves(board) {
    const possibleMoves = [];

    for (let u = 1; u <= 7; u++) {
      if (board[this.x][this.y - u]) {
        if (board[this.x][this.y - u].side !== this.side) possibleMoves.push(`${this.x},${this.y - u}`);
        break;
      }
      this.y - u >= 0 && possibleMoves.push(`${this.x},${this.y - u}`);
    }

    for (let d = 1; d <= 7; d++) {
      this.y + d <= 7 && possibleMoves.push(`${this.x},${this.y + d}`);
    }

    for (let l = 1; l <= 7; l++) {
      this.x - l >= 0 && possibleMoves.push(`${this.x - l},${this.y}`);
    }

    for (let r = 1; r <= 7; r++) {
      this.x + r <= 7 && possibleMoves.push(`${this.x + r},${this.y}`);
    }
    return possibleMoves;
  }
}

export default Rook;
