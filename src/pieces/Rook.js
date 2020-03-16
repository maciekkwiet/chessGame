import Piece from './piece';

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }
  findLegalMoves() {
    const possibleMoves = [];

  
  for(const u = 1; u < 8; u++){
  this.y - 7 > 0 && this.x - 7 > 0 && this.y - -7 < 0 && this.x - -7 < 0 && possibleMoves.push(`${this.x - u},${this.y - u}`);
  } 
  for(const d = 1; d < 8; d++){
  this.y - 7 > 0 && this.x - 7 > 0 && this.y - -7 < 0 && this.x - -7 < 0 && possibleMoves.push(`${this.x - d},${this.y - d}`);
  }
  for(const l = 1; l < 8; l++){
  this.y - 7 > 0 && this.x - 7 > 0 && this.y - -7 < 0 && this.x - -7 < 0 && possibleMoves.push(`${this.x - l},${this.y - l}`);
  }
  for(const r = 1; r < 8; r++){
  this.y - 7 > 0 && this.x - 7 > 0 && this.y - -7 < 0 && this.x - -7 < 0 && possibleMoves.push(`${this.x - r},${this.y - r}`);
  }
return possibleMoves;
  }
}

export default Rook;
