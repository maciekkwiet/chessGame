import Piece from './Piece';
import '../img/king-black.svg';
import '../img/king-white.svg';
class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'king';
    this.display = `<img class="piece" src="./imgs/${this.name}-${side}.svg" alt="elo">`;
  }
  move(to, gameArea) {
    if (Math.abs(to[0] - this.x) > 1) {
      if (to[0] - this.x < -1) gameArea[0][this.y].move([to[0] + 1, this.y]);
      if (to[0] - this.x > 1) gameArea[7][this.y].move([to[0] - 1, this.y]);
    }
    super.move(to);
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
  isLongCastlingPossible(gameArea) {
    return (
      gameArea[0][this.y] &&
      !gameArea[1][this.y] &&
      !gameArea[2][this.y] &&
      !gameArea[3][this.y] &&
      !gameArea[0][this.y].hasMoved
    );
  }
  isShortCastlingPossible(gameArea) {
    return gameArea[7][this.y] && !gameArea[5][this.y] && !gameArea[6][this.y] && !gameArea[7][this.y].hasMoved;
  }

  findLegalMoves(gameArea) {
    const possibleMoves = [];
    const attack = this.findAttackingMoves(gameArea);

    attack.forEach(move => {
      if (gameArea[move[0]][move[2]] && gameArea[move[0]][move[2]].side === this.side)
        possibleMoves.push(`${move[0]},${move[2]}`);
    });
    if (!this.hasMoved) {
      if (this.isLongCastlingPossible(gameArea)) attack.push(`${[2]},${[this.y]}`);
      if (this.isShortCastlingPossible(gameArea)) attack.push(`${[6]},${[this.y]}`);
    }
    const legalMoves = attack.filter(move => !possibleMoves.includes(move));

    return legalMoves;
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
