import Piece from './piece';

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }
  findLegalMoves() {
    const possibleMoves = [];
    let Up;
    let Down;
    let Left;
    let Right;

    Up = (this.y >= 0)
    Down = (this.y <= 7)
    Left = (this.x <= 7)
    Right = (this.x >= 0)

  for(let u = 1; u <= Up ; u++){
  this.y >= 0 && this.y + 1 <= 7 && possibleMoves.push(`${this.y - u}`);
  } 
  for(let d = 1; d <= Down ; d++){
  this.y >= 0 && this.y - 1 <= 7 && possibleMoves.push(`${this.y - d}`);
  }
  for(let l = 1; l <= Left ; l++){
  this.x >= 0 && this.x - 1 <= 7 && possibleMoves.push(`${this.x - l}`);
  }
  for(let r = 1; r <= Right; r++){
  this.x >= 0 && this.x + 1 <= 7 && possibleMoves.push(`${this.x - r}`);
  }
return possibleMoves;
  }
}

export default Rook;
