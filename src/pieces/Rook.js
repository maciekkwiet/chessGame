import Piece from './piece';

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }
  findLegalMoves(board) {
    const possibleMoves = [];
    
    for(let u = 1; u <= 7; u++){
      if (board[this.x][this.y - u]){
        if (board[this.x][this.y - u].side !== this.side) possibleMoves.push(`${this.x},${this.y - u}`);
        break;
      }
      this.y - u >= 0 && possibleMoves.push(`${this.x},${this.y - u}`);
    }
    for(let d = 1; d <= 7; d++){
      if (board[this.x][this.y + d]){
        if (board[this.x][this.y + d].side !== this.side) possibleMoves.push(`${this.x},${this.y + d}`);
        break;
      }
      this.y + d <= 7 && possibleMoves.push(`${this.x},${this.y + d}`);
    }
    for(let l = 1; l <= 7; l++){
      if (board[this.y][this.x - l]){
        if (board[this.y][this.x - l].side !== this.side) possibleMoves.push(`${this.y},${this.x - l}`);
        break;
      }
      this.x - l >= 0 && possibleMoves.push(`${this.x - l},${this.y}`);
    }

    for(let r = 1; r <= 7; r++){
      if (board[this.y][this.x + r]){
        if (board[this.y][this.x + r].side !== this.side) possibleMoves.push(`${this.y},${this.x + r}`);
        break;
      }
      this.x + r <= 7 && possibleMoves.push(`${this.x + r},${this.y}`);
    }

  console.log (possibleMoves)
return possibleMoves;
  }
}

export default Rook;
