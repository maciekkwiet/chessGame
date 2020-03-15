import Piece from './piece';

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }
  findLegalMoves() {
    const possibleMoves = [
      this.y - 1 > 0 && possibleMoves.push(`${this.x},${this.y - 1}`);
      this.y - 2 > 0 && possibleMoves.push(`${this.x},${this.y - 2}`);
      this.y - 3 > 0 && possibleMoves.push(`${this.x},${this.y - 3}`);
      this.y - 4 > 0 && possibleMoves.push(`${this.x},${this.y - 4}`);
      this.y - 5 > 0 && possibleMoves.push(`${this.x},${this.y - 5}`);
      this.y - 6 > 0 && possibleMoves.push(`${this.x},${this.y - 6}`);
      this.y - 6 > 0 && possibleMoves.push(`${this.x},${this.y - 7}`);

      this.x - 1 > 0 && possibleMoves.push(`${this.x - 1},${this.y}`);
      this.x - 2 > 0 && possibleMoves.push(`${this.x - 2},${this.y}`);
      this.x - 3 > 0 && possibleMoves.push(`${this.x - 3},${this.y}`);
      this.x - 4 > 0 && possibleMoves.push(`${this.x - 4},${this.y}`);
      this.x - 5 > 0 && possibleMoves.push(`${this.x - 5},${this.y}`);
      this.x - 6 > 0 && possibleMoves.push(`${this.x - 6},${this.y}`);
      this.x - 6 > 0 && possibleMoves.push(`${this.x - 7},${this.y}`);
      ];

    return possibleMoves;
  }
}

export default Rook;
