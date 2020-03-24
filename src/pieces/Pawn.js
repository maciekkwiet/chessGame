import Piece from './Piece';

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }
  findAttackingMoves(board) {
    const attackingMoves = [];

    if (this.side == 'white') {
      if (!board[this.x][this.y - 1]) {//ruch na przód
        attackingMoves.push(`${this.x},${this.y - 1}`);
      }
      console.log(board)

      if (this.y == 6 && !board[this.x][this.y - 1] && !board[this.x]/*ruch o dwa do przodu z pozycji  y=6*/[this.y - 2]) {
        attackingMoves.push(`${this.x},${this.y - 2}`);
      }

      if (this.x != 0 && board[this.x - 1][this.y - 1] /*&& this.side != board[this.x - 1][this.y - 1].side*/ ) {
        attackingMoves.push(`${this.x - 1},${this.y - 1}`);
      }

      if (this.x != 7 && board[this.x + 1][this.y - 1] /*&& this.side != board[this.x + 1][this.y - 1].side*/) {
        attackingMoves.push(`${this.x + 1},${this.y - 1}`);
      }
    }
    if (this.side == 'black') {
      if (!board[this.x][this.y + 1]) {
        attackingMoves.push(`${this.x},${this.y + 1}`);
      }

      if (this.y == 1 && !board[this.x][this.y + 1] && !board[this.x][this.y + 2]) {
        attackingMoves.push(`${this.x},${this.y + 2}`);
      }
      if (this.x != 0 && board[this.x - 1][this.y + 1] /*&& this.side != board[this.x - 1][this.y + 1].side*/) {
        attackingMoves.push(`${this.x - 1},${this.y + 1}`);
      }

      if (this.x != 7 && board[this.x + 1][this.y + 1] /*&& this.side != board[this.x + 1][this.y + 1].side*/) {
        attackingMoves.push(`${this.x + 1},${this.y + 1}`);
      }
    }
  
    return attackingMoves;
  }

    findLegalMoves(board)
    {
      let attack=this.findAttackingMoves(board);
      let legal=[];
      console.log("attack: " + attack);
      
     for(const move of attack)
      {
       const attackX=move[0];
       const attackY=move[2];
       //console.log("X: "+attackX);
       //console.log("Y: "+attackY);

      
       if (!board[attackX][attackY] || board[attackX][attackY].side !=this.side)
       {
        legal.push(move);
       }
       
      
      
    }
    console.log("legal: "+legal);
    return legal;
 
}
//promote() {}
//enPassant() {}

}
export default Pawn;
