import Piece from './Piece';

class Bishop extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'bishop';
    this.display = `<i class="fas fa-chess-bishop ${side}"></i>`; //fontawesome bishop
  }
  findLegalMoves(board) {
    const possibleMoves = [];

    let leftUp = (this.x <= this.y ) ?  this.x : this.y;
    let leftDown = ((7 - this.y) <= this.x) ? (7 - this.y) : this.x;
    let rightUp = (this.y <= ((7 - this.y) - this.x)) ? this.y : (7 - this.x);
    let rightDown = ((7 - this.y) <= (7 - this.x)) ? (7 - this.y) : (7 - this.x);
  
    //console.log(this.x);
    //console.log(this.y);
    //console.log(board);
    //console.log(board[this.x][this.y]);
  
    for(let lu = 1; lu <= leftUp; lu++){
      if(board[this.x - lu][this.y - lu]){
        if(board[this.x - lu][this.y - lu].side !==this.side){
          possibleMoves.push(`${this.x - lu},${this.y - lu}`);
          break;
        }
        break;
      }
      leftUp > 0 && possibleMoves.push(`${this.x - lu},${this.y - lu}`);
    }
  
  //  console.log(possibleMoves);
  
    for(let ld = 1; ld <= leftDown; ld++){
      if(board[this.x - ld][this.y + ld]){
        if(board[this.x - ld][this.y + ld].side !== this.side){
          possibleMoves.push(`${this.x - ld},${this.y + ld}`);
          break;
        }
      break;
      }
      leftDown > 0 && possibleMoves.push(`${this.x - ld},${this.y + ld}`);
    }
    
  //  console.log(possibleMoves);

    for(let rd = 1; rd <= rightDown; rd++){
      if(board[this.x + rd][this.y + rd]){
        if(board[this.x + rd ][this.y + rd].side !== this.side){
          possibleMoves.push(`${this.x + rd},${this.y + rd}`);
          break;
        }
      break;
      }
      rightDown > 0 && possibleMoves.push(`${this.x + rd},${this.y + rd}`);
    }

  //  console.log(possibleMoves);
  
    for(let ru = 1; ru <= rightUp; ru++){
      if(board[this.x + ru][this.y - ru]){
        if(board[this.x + ru ][this.y - ru].side !== this.side){
          possibleMoves.push(`${this.x + ru},${this.y - ru}`);
          break;
        }
      break;
      }
      rightUp > 0 && possibleMoves.push(`${this.x + ru},${this.y - ru}`);
    }

  //  console.log(possibleMoves);

    return possibleMoves;
  }
}

export default Bishop;
