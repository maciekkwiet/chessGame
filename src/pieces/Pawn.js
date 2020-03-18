import Piece from './Piece';

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }
  findLegalMoves(board) {
    const possibleMoves = [];
    console.log(possibleMoves);

    if (this.side == 'white') {
      console.log(this.side);
      if (!board[this.x][this.y - 1]) {
        possibleMoves.push(`${this.x},${this.y - 1}`);
      }
      console.log(possibleMoves);

      if (this.y == 6 && !board[this.x][this.y - 2]) {
        possibleMoves.push(`${this.x},${this.y - 2}`);
      }
      console.log(possibleMoves);
      if (board[this.x][this.y - 1]) {
        if (this.x != 0 && board[this.x - 1][this.y - 1] && this.side != board[this.x - 1][this.y - 1].side) {
          possibleMoves.push(`${this.x - 1},${this.y - 1}`);
        }
        console.log(possibleMoves);

        if (this.x != 7 && board[this.x + 1][this.y - 1] && this.side != board[this.x + 1][this.y - 1].side) {
          possibleMoves.push(`${this.x + 1},${this.y - 1}`);
        }
      }
      console.log(possibleMoves);
    }
    if (this.side == 'black') {
      if (!board[this.x][this.y + 1]) {
        possibleMoves.push(`${this.x},${this.y + 1}`);
      }
      console.log(possibleMoves);

      if (this.y == 1 && !board[this.x][this.y + 2]) {
        possibleMoves.push(`${this.x},${this.y + 2}`);
      }
      console.log(possibleMoves);
      if (board[this.x][this.y + 1]) {
        if (this.x != 0 && board[this.x - 1][this.y + 1] && this.side != board[this.x - 1][this.y + 1].side) {
          possibleMoves.push(`${this.x - 1},${this.y + 1}`);
        }
        console.log(possibleMoves);

        if (this.x != 7 && board[this.x + 1][this.y + 1] && this.side != board[this.x + 1][this.y + 1].side) {
          possibleMoves.push(`${this.x + 1},${this.y + 1}`);
        }
      }
      console.log(possibleMoves);
    }
    return possibleMoves;
  }
  promote() {}
  enPassant() {}
}

export default Pawn;

// {
//   this.y - 1 >= 0 &&
//     document.getElementById(`${this.x},${this.y - 1}`).innerHTML == '' &&
//     possibleMoves.push(`${this.x},${this.y - 1}`);
//   this.y == 6 && possibleMoves.push(`${this.x},${this.y - 2}`);
//   document.getElementById(`${this.x + 1},${this.y - 1}`).innerHTML != '' &&
//     possibleMoves.push(`${this.x + 1},${this.y - 1}`);
//   document.getElementById(`${this.x - 1},${this.y - 1}`).innerHTML != '' &&
//     possibleMoves.push(`${this.x - 1},${this.y - 1}`);
// }
