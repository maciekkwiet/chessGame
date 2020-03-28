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
          if (gameArea[i][j].side !== this.side) {
            oponentMoves2 = gameArea[i][j].findAttackingMoves(gameArea).concat(oponentMoves2);
          }
        }
      }
    }
    return oponentMoves2;
  }

  findLegalMoves(gameArea) {
    const possibleMoves = [];
    const attack = this.findAttackingMoves(gameArea);

    attack.forEach(piece => {
      if (gameArea[piece[0]][piece[2]]) {
        if (gameArea[piece[0]][piece[2]].side === this.side) possibleMoves.push(`${piece[0]},${piece[2]}`);
      }
    });

    let filteredMoves = attack.filter(move => !possibleMoves.includes(move));
    let twiceFilteredMoves = filteredMoves.filter(move => !this.oponentMoves(gameArea).includes(move));

    return twiceFilteredMoves;
  }

  findAttackingMoves() {
    const moves = [[1, 1], [-1, 1], [-1, -1], [1, -1], [1, 0], [-1, 0], [0, -1], [0, 1]];
    let newX = 0;
    let newY = 0;
    const attackingMoves = [];
    for (const subTab of moves) {
      newX = this.x + subTab[0];
      newY = this.y + subTab[1];
      if (newX <= 7 && newX >= 0 && newY <= 7 && newY >= 0) attackingMoves.push(`${newX},${newY}`);
    }

    return attackingMoves;
  }
}

export default King;
