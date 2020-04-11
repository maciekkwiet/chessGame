import Piece from './Piece';
import '../img/blue/bishop-black.png';
import '../img/blue/bishop-white.png';
import '../img/green/bishop-black.png';
import '../img/green/bishop-white.png';
import '../img/pink/bishop-black.png';
import '../img/pink/bishop-white.png';
import '../img/purple/bishop-black.png';
import '../img/purple/bishop-white.png';

class Bishop extends Piece {
  constructor(x, y, side, currentColor) {
    super(x, y, side);
    this.name = 'bishop';
    this.display = `<img class="piece" src="./imgs/src/img/${currentColor}/${this.name}-${side}.png">`
  }
  findAttackingMoves(board) {
    const attackingMoves = [];

    let leftUp = this.x <= this.y ? this.x : this.y;
    let leftDown = 7 - this.y <= this.x ? 7 - this.y : this.x;
    let rightUp = this.y <= 7 - this.x ? this.y : 7 - this.x;
    let rightDown = 7 - this.y <= 7 - this.x ? 7 - this.y : 7 - this.x;

    for (let lu = 1; lu <= leftUp; lu++) {
      if (board[this.x - lu][this.y - lu]) {
        attackingMoves.push(`${this.x - lu},${this.y - lu}`);
        break;
      }
      leftUp > 0 && attackingMoves.push(`${this.x - lu},${this.y - lu}`);
    }

    for (let ld = 1; ld <= leftDown; ld++) {
      if (board[this.x - ld][this.y + ld]) {
        attackingMoves.push(`${this.x - ld},${this.y + ld}`);
        break;
      }
      leftDown > 0 && attackingMoves.push(`${this.x - ld},${this.y + ld}`);
    }

    for (let rd = 1; rd <= rightDown; rd++) {
      if (board[this.x + rd][this.y + rd]) {
        attackingMoves.push(`${this.x + rd},${this.y + rd}`);
        break;
      }
      rightDown > 0 && attackingMoves.push(`${this.x + rd},${this.y + rd}`);
    }

    for (let ru = 1; ru <= rightUp; ru++) {
      if (board[this.x + ru][this.y - ru]) {
        attackingMoves.push(`${this.x + ru},${this.y - ru}`);
        break;

      }
      rightUp > 0 && attackingMoves.push(`${this.x + ru},${this.y - ru}`);
    }

    return attackingMoves;
  }

  findLegalMoves(board) {
    const attack = [];
    const param = this.findAttackingMoves(board);

    for (let i = 0; i < param.length; i++) {
      const tab = param[i];

      if (board[tab[0]][tab[2]]) {
        if (board[tab[0]][tab[2]].side == this.side) {
          attack.push(param[i]);
        }
      }
    }

    const filteredMoves = param.filter(move => !attack.includes(move));

    return filteredMoves;
  }
}

export default Bishop;
