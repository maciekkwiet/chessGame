import Piece from './Piece';

class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'king';
    this.display = `<i class="fas fa-chess-king ${side}"></i>`; //fontawesome king
  }
  oponentMoves(gameArea) {
    let oponentMoves2 = [];

    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (gameArea[i][j]) {
          if (gameArea[i][j].side !== this.side && gameArea[i][j].name !== 'king' && gameArea[i][j].name !== 'pawn') {
            oponentMoves2 = gameArea[i][j].findLegalMoves(gameArea).concat(oponentMoves2);
          }
        }
      }
    }
    return oponentMoves2;
  }

  findLegalMoves(gameArea) {
    const moves = [[1, 1], [-1, 1], [-1, -1], [1, -1], [1, 0], [-1, 0], [0, -1], [0, 1]];
    const oponentKingExists = [[2, 2], [-2, 2], [-2, -2], [2, -2], [2, 0], [-2, 0], [0, -2], [0, 2]];
    let opoX = 0;
    let opoY = 0;
    let newX = 0;
    let newY = 0;
    const possibleMoves = [];

    for (const subTab of moves) {
      newX = this.x + subTab[0];
      newY = this.y + subTab[1];

      if (newX <= 7 && newX >= 0 && newY <= 7 && newY >= 0) {
        if (gameArea[newX][newY]) {
          if (gameArea[newX][newY].side !== this.side) possibleMoves.push(`${newX},${newY}`);
        } else possibleMoves.push(`${newX},${newY}`);
      }
    }
    let filteredMoves = possibleMoves.filter(move => !this.oponentMoves(gameArea).includes(move));

    return filteredMoves;
  }
}
export default King;
