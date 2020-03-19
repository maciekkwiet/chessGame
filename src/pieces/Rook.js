
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
      if (this.y - u < 0) break;
      if (board[this.x][this.y - u]) {
        if (board[this.x][this.y - u].side !== this.side) possibleMoves.push(`${this.x},${this.y - u}`);
        break;
      }
      possibleMoves.push(`${this.x},${this.y - u}`);
    }

    for (let d = 1; d <= 7; d++) {
      if (this.y + d > 7) break;
      if (board[this.x][this.y + d]) {
        if (board[this.x][this.y + d].side !== this.side) possibleMoves.push(`${this.x},${this.y + d}`);
        break;
      }
      possibleMoves.push(`${this.x},${this.y + d}`);
    }

    for (let l = 1; l <= 7; l++) {
      if (this.x - l < 0) break;
      if (board[this.x - l][this.y]) {
        if (board[this.x - l][this.y].side !== this.side) possibleMoves.push(`${this.x - l},${this.y}`);
        break;
      }
      possibleMoves.push(`${this.x - l},${this.y}`);
    }

    for (let r = 1; r <= 7; r++) {
      if (this.x + r > 7) break;
      if (board[this.x + r][this.y]) {
        if (board[this.x + r][this.y].side !== this.side) possibleMoves.push(`${this.x + r},${this.y}`);
        break;
      }
      possibleMoves.push(`${this.x + r},${this.y}`);
    }

    return possibleMoves;
  }
}

export default Rook;


