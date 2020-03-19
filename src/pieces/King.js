import Piece from './Piece';

class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'king';
    this.display = `<i class="fas fa-chess-king ${side}"></i>`; //fontawesome king
  }
  oponentMoves(gameArea) {
    console.log("dupa");
  const oponentMoves2 = [];

for (let i = 0; i <= 7; i++) {
  for (let j = 0; j <= 7; j++) {
    if (gameArea[i][j]) {
      if (gameArea[i][j].side !== this.side ) {
        console.log("dupa2")
        
        console.log(gameArea[i][j].findLegalMoves(gameArea));
 }
} 
  }
}  
return oponentMoves2;
}



  findLegalMoves(gameArea) {
    const moves = [
      [1,1],
      [-1,1],
      [-1,-1],
      [1,-1],
      [1,0],
      [-1,0],
      [0,-1],
      [0,1],
    ];
    let newX = 0;
    let newY = 0;
    const possibleMoves = [];
  
    this.oponentMoves(gameArea);
    for (const subTab of moves) {
      newX = this.x + subTab[0];
      newY = this.y + subTab[1];
     if (newX <= 7 && newX >= 0 && newY <= 7 && newY >= 0) {
       if (gameArea[newX][newY]) {
         if (gameArea[newX][newY].side !== this.side) possibleMoves.push(`${newX},${newY}`);
        }
      else possibleMoves.push(`${newX},${newY}`);
      }
    }   
  return possibleMoves;

  }
}
export default King;
