import Piece from './Piece';
import '../img/king-black.svg';
import '../img/king-white.svg';
class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'king';
    this.display = `<img class="piece" src="./imgs/src/img/${this.name}-${side}.svg" alt="elo">`;
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

  isCastlingAttackingMoves(oponentAttack, x, y) {
    const sumOfTable = [];
    const blockTable = [];
    for (let i = x; i <= y; i++) {
      blockTable.push(`${i},${this.y}`);
    }

    for (let j = 0; j < blockTable.length; j++) {
      for (let k = 0; k < oponentAttack.length; k++) {
        if (
          blockTable[j].toString()[0] == oponentAttack[k].toString()[0] &&
          blockTable[j].toString()[2] == oponentAttack[k].toString()[2]
        ) {
          sumOfTable.push(blockTable[j]);
        }
      }
    }

    return sumOfTable.length == 0 ? true : false;
  }

  isLongCastlingPossible(gameArea, oponentAttack) {
    return (
      gameArea[0][this.y] &&
      !gameArea[1][this.y] &&
      !gameArea[2][this.y] &&
      !gameArea[3][this.y] &&
      !gameArea[0][this.y].hasMoved &&
      this.isCastlingAttackingMoves(oponentAttack, 0, 4)
    );
  }

  isShortCastlingPossible(gameArea, oponentAttack) {
    return (
      gameArea[7][this.y] &&
      !gameArea[5][this.y] &&
      !gameArea[6][this.y] &&
      !gameArea[7][this.y].hasMoved &&
      this.isCastlingAttackingMoves(oponentAttack, 4, 7)
    );
  }

  findLegalMoves(gameArea, playerMoves) {
    const oponentAttack = playerMoves;
    const possibleMoves = [];
    const attack = this.findAttackingMoves(gameArea);
    const oponentMove = this.oponentMoves(gameArea);

    attack.forEach(move => {
      if (gameArea[move[0]][move[2]] && gameArea[move[0]][move[2]].side === this.side)
        possibleMoves.push(`${move[0]},${move[2]}`);
    });
    if (!this.hasMoved) {
      if (this.isLongCastlingPossible(gameArea, oponentAttack)) attack.push(`${[2]},${[this.y]}`);
      if (this.isShortCastlingPossible(gameArea, oponentAttack)) attack.push(`${[6]},${[this.y]}`);
    }
    const filterMoves = attack.filter(move => !possibleMoves.includes(move));
    const legalMoves = filterMoves.filter(move => !oponentMove.includes(move));

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
