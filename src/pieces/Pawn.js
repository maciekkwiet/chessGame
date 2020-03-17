import Piece from './Piece';

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }
  findLegalMoves() {
    const possibleMoves = [];
    if (this.side == 'white') {
      this.y - 1 >= 0 &&
        document.getElementById(`${this.x},${this.y - 1}`).innerHTML == '' &&
        possibleMoves.push(`${this.x},${this.y - 1}`);
      this.y == 6 && possibleMoves.push(`${this.x},${this.y - 2}`);
      document.getElementById(`${this.x + 1},${this.y - 1}`).innerHTML != '' &&
        possibleMoves.push(`${this.x + 1},${this.y - 1}`);
      document.getElementById(`${this.x - 1},${this.y - 1}`).innerHTML != '' &&
        possibleMoves.push(`${this.x - 1},${this.y - 1}`);
    }
    if (this.side == 'black') {
      this.y + 1 <= 7 &&
        document.getElementById(`${this.x},${this.y + 1}`).innerHTML == '' &&
        possibleMoves.push(`${this.x},${this.y + 1}`);

      this.y == 1 && possibleMoves.push(`${this.x},${this.y + 2}`);

      document.getElementById(`${this.x + 1},${this.y + 1}`).innerHTML != '' &&
        possibleMoves.push(`${this.x + 1},${this.y + 1}`);

      document.getElementById(`${this.x - 1},${this.y + 1}`).innerHTML != '' &&
        possibleMoves.push(`${this.x - 1},${this.y + 1}`);
    }
    return possibleMoves;
  }
  promote() {}
  enPassant() {}
}

export default Pawn;
