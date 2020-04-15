import Piece from './Piece';
import '../img/knight-black.svg';
import '../img/knight-white.svg';
class Knight extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'knight';
        this.display = `<img class="piece" src="./imgs/src/img/${this.name}-${side}.svg" alt="elo">`;
  }
  findAttackingMoves(gameArea) {
    const moves = [[2, 1], [1, 2], [-2, 1], [1, -2], [-2, -1], [2, -1], [-1, 2], [-1, -2]];
    let newX = 0;
    let newY = 0;
    const attackMoves = [];
    for (const subTab of moves) {
      newX = this.x + subTab[0];
      newY = this.y + subTab[1];
      if (newX <= 7 && newX >= 0 && newY <= 7 && newY >= 0) {
        if (gameArea[newX][newY]) {
          if (gameArea[newX][newY].side !== this.side || gameArea[newX][newY].side == this.side)
            attackMoves.push(`${newX},${newY}`);
        } else attackMoves.push(`${newX},${newY}`);
      }
    }

    return attackMoves;
  }

  findLegalMoves(gameArea) {
    let attack = this.findAttackingMoves(gameArea);
    //console.log(attack);
    let legal = [];

    for (const move of attack) {
      const attackX = move[0];
      const attackY = move[2];
      //console.log("x = "+attackX);
      //console.log("y = "+attackY);

      if (!gameArea[attackX][attackY] || gameArea[attackX][attackY].side !== this.side) {
        legal.push(move);
      }
      // console.log(legal);
    }

    return legal;
  }
}

export default Knight;
