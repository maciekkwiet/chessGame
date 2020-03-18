import Piece from './Piece';

class Knight extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'knight';
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`; //fontawesome knight
    
  }
  findLegalMoves(gameArea) {
    const moves = [
                    [2,1],
                    [1,2],
                    [-2,1],
                    [1,-2],
                    [-2,-1],
                    [2,-1],
                    [-1,2],
                    [-1,-2]
                  ];
    let newX = 0;
    let newY = 0;
    const possibleMoves = [];
    for (const subTab of moves) {
      newX = this.x + subTab[0];
      newY = this.y + subTab[1];

      if (newX <= 7 && newX >= 0 && newY <= 7 && newY >= 0) {
        if (gameArea[newX][newY] !== undefined && gameArea[newX][newY] !== null) {
          if (gameArea[newX][newY].side !== this.side) possibleMoves.push(`${newX},${newY}`);
        }
        else possibleMoves.push(`${newX},${newY}`);
      }
    }
    return possibleMoves;
  }
}

export default Knight;
