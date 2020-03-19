// Learn more or give us feedback
import Piece from './piece';

class Queen extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'queen';
    this.display = `<i class="fas fa-chess-queen ${side}"></i>`; //fontawesome queen
  }
  findLegalMoves() {
    const possibleMoves = [];
    
    let leftUp;
    let leftDown;
    let rightUp;
    let rightDown;

    leftUp = (this.x <= this.y) ? (leftUp = this.x) : (leftUp = this.y);
    leftDown = ((7 - this.y) <=this.x) ? leftDown = 7 - this.y : leftDown = this.x;
    rightUp = ((this.y <= (7 - this.y) - this.x)) ? rightUp = this.y : rightUp = 7 - this.x;
    rightDown = ((7 - this.y) <= (7 - this.x)) ? rightDown = 7 - this.y : rightDown = 7 - this.x;
 
 for(let lu = 1; lu <= leftUp; lu ++){
   this.y >= 0 && this.y + 1 <= 8 && this.x + 1 <= 8 && this.x >= 0 && leftUp > 0 && possibleMoves.push(`${this.y - lu}`);
 }
 

 


   

   

    
    return possibleMoves;
  }
}

export default Queen;

