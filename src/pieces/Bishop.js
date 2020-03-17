import Piece from './Piece';

class Bishop extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'bishop';
    this.display = `<i class="fas fa-chess-bishop ${side}"></i>`; //fontawesome bishop
  }
  findLegalMoves() {
    const possibleMoves = [];

    let leftUp = (this.x <= this.y ) ?  this.x : this.y;
    let leftDown = ((7 - this.y) <= this.x) ? (7 - this.y) : this.x;
    let rightUp = (this.y <= ((7 - this.y) - this.x)) ? this.y : (7 - this.x);
    let rightDown = ((7 - this.y) <= (7 - this.x)) ? (7 - this.y) : (7 - this.x);
  
  
    for(let lu = 1; lu <= leftUp; lu++){
       this.y  >= 0 && this.y + 1 <= 8 && this.x + 1 <= 8 && this.x  >= 0 && leftUp > 0 && possibleMoves.push(`${this.x - lu},${this.y - lu}`);
    }
  
  
    for(let ld = 1; ld <= leftDown; ld++){
        this.y  >= 0 && this.y + 1 <= 8 && this.x + 1 <= 8 && this.x  >= 0 && leftDown > 0 && possibleMoves.push(`${this.x - ld},${this.y + ld}`);
    }
      
    for(let rd = 1; rd <= rightDown; rd++){
        this.y  >= 0 && this.y + 1 <= 8 && this.x + 1 <= 8 && this.x  >= 0 && rightDown > 0 && possibleMoves.push(`${this.x + rd},${this.y + rd}`);
    }
  
    for(let ru = 1; ru <= rightUp; ru++){
        this.y  >= 0 && this.y + 1 <= 8 && this.x + 1 <= 8 && this.x  >= 0 && rightUp > 0 && possibleMoves.push(`${this.x + ru},${this.y - ru}`);
    }

    return possibleMoves;
  }
}

export default Bishop;
