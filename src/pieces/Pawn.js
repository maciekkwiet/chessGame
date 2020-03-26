import Piece from './Piece';

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }
  findAttackingMoves() {
    const attackingMoves = [];

    if (this.side == 'white') {
      if (this.x != 0 ) {
        attackingMoves.push(`${this.x - 1},${this.y - 1}`);
      }

      if (this.x != 7 ) {
        attackingMoves.push(`${this.x + 1},${this.y - 1}`);       
      }  
    }
      if (this.side == 'black') {

      if (this.x != 0 ) {
        attackingMoves.push(`${this.x - 1},${this.y + 1}`);
      }

      if (this.x != 7 ) {
        attackingMoves.push(`${this.x + 1},${this.y + 1}`);
      }

    }
      console.log("attack " + attackingMoves)
    return attackingMoves;
  }

  findLegalMoves(board)
{
  
  const legalMoves=[];


  if (this.side == 'white') {
    if (!board[this.x][this.y - 1]) {
      legalMoves.push(`${this.x},${this.y - 1}`);
    }
   

    if (this.y == 6 && !board[this.x][this.y - 1]  && !board[this.x][this.y - 2]) { 
      legalMoves.push(`${this.x},${this.y - 2}`);
    }

     if (this.x != 0 && board[this.x - 1][this.y - 1]  && this.side != board[this.x - 1][this.y - 1].side ) {
      legalMoves.push(`${this.x - 1},${this.y - 1}`);
    }

    if (this.x != 7 && board[this.x + 1][this.y - 1] && this.side != board[this.x + 1][this.y - 1].side) {
      legalMoves.push(`${this.x + 1},${this.y - 1}`);
    }
  }
  if (this.side == 'black') {
    if (!board[this.x][this.y + 1]) {
      legalMoves.push(`${this.x},${this.y + 1}`);
    }

    if (this.y == 1 && !board[this.x][this.y + 1] && !board[this.x][this.y + 2]) {
      legalMoves.push(`${this.x},${this.y + 2}`);
    }
    if (this.x != 0 && board[this.x - 1][this.y + 1] && this.side != board[this.x - 1][this.y + 1].side) {
      legalMoves.push(`${this.x - 1},${this.y + 1}`);
    }

    if (this.x != 7 && board[this.x + 1][this.y + 1]  &&this.side != board[this.x + 1][this.y + 1].side) {
      legalMoves.push(`${this.x + 1},${this.y + 1}`);
    }

  }  
  //console.log("legal: " + legalMoves)
  return legalMoves;
}


promote() {}
enPassant() {}

}
export default Pawn;
