// Learn more or give us feedback
import Piece from './Piece';
import '../img/queen-black.svg';
import '../img/queen-white.svg';

class Queen extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'queen';
        this.display = `<img class="piece" src="./imgs/src/img/${this.name}-${side}.svg" alt="elo">`;
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

    for (let u = 1; u <= 7; u++) {
      if (this.y - u < 0) break;
      if (board[this.x][this.y - u]) {
        attackingMoves.push(`${this.x},${this.y - u}`);
        break;
      }
      attackingMoves.push(`${this.x},${this.y - u}`);
    }

    for (let d = 1; d <= 7; d++) {
      if (this.y + d > 7) break;
      if (board[this.x][this.y + d]) {
        attackingMoves.push(`${this.x},${this.y + d}`);
        break;
      }
      attackingMoves.push(`${this.x},${this.y + d}`);
    }

    for (let l = 1; l <= 7; l++) {
      if (this.x - l < 0) break;
      if (board[this.x - l][this.y]) {
        attackingMoves.push(`${this.x - l},${this.y}`);
        break;
      }
      attackingMoves.push(`${this.x - l},${this.y}`);
    }

    for (let r = 1; r <= 7; r++) {
      if (this.x + r > 7) break;
      if (board[this.x + r][this.y]) {
        attackingMoves.push(`${this.x + r},${this.y}`);
        break;
      }
      attackingMoves.push(`${this.x + r},${this.y}`);
    }
    return attackingMoves;
  }
}

export default Queen;
