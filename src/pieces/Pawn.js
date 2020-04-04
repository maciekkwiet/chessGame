import Piece from './Piece';
import Queen from './Queen';
import Bishop from './Bishop';
import Rook from './Rook';
import Knight from './Knight';

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
    this.isPassage = false;
  }
  findAttackingMoves() {
    const attackingMoves = [];

    if (this.side == 'white') {
      if (this.x != 0) {
        attackingMoves.push(`${this.x - 1},${this.y - 1}`);
      }

      if (this.x != 7) {
        attackingMoves.push(`${this.x + 1},${this.y - 1}`);
      }
    }
    if (this.side == 'black') {
      if (this.x != 0) {
        attackingMoves.push(`${this.x - 1},${this.y + 1}`);
      }

      if (this.x != 7) {
        attackingMoves.push(`${this.x + 1},${this.y + 1}`);
      }
    }
    return attackingMoves;
  }

  findLegalMoves(board) {
    const legalMoves = [];
    let enPassant = this.enPassant(board);

    if (this.side == 'white') {
      if (!board[this.x][this.y - 1]) {
        legalMoves.push(`${this.x},${this.y - 1}`);
      }

      if (this.y == 6 && !board[this.x][this.y - 1] && !board[this.x][this.y - 2]) {
        legalMoves.push(`${this.x},${this.y - 2}`);
      }

      if (this.x != 0 && board[this.x - 1][this.y - 1] && this.side != board[this.x - 1][this.y - 1].side) {
        legalMoves.push(`${this.x - 1},${this.y - 1}`);
      }

      if (this.x != 7 && board[this.x + 1][this.y - 1] && this.side != board[this.x + 1][this.y - 1].side) {
        legalMoves.push(`${this.x + 1},${this.y - 1}`);
      }
    }
    if (this.side == 'black') {
      if (!board[this.x][this.y + 1]) {
        legalMoves.push(`${this.x},${this.y + 1}`);
      }

      if (this.y == 1 && !board[this.x][this.y + 1] && !board[this.x][this.y + 2]) {
        legalMoves.push(`${this.x},${this.y + 2}`);
      }
      if (this.x != 0 && board[this.x - 1][this.y + 1] && this.side != board[this.x - 1][this.y + 1].side) {
        legalMoves.push(`${this.x - 1},${this.y + 1}`);
      }

      if (this.x != 7 && board[this.x + 1][this.y + 1] && this.side != board[this.x + 1][this.y + 1].side) {
        legalMoves.push(`${this.x + 1},${this.y + 1}`);
      }
    }
    enPassant = enPassant.concat(legalMoves);
    return enPassant;
  }

  enPassant(board) {
    const enPassant = [];
    if (this.side == 'white') {
      if (
        this.x != 0 &&
        board[this.x - 1][this.y] &&
        this.side != board[this.x - 1][this.y].side &&
        this.name == board[this.x - 1][this.y].name &&
        board[this.x - 1][this.y].isPassage == true
      ) {
        enPassant.push(`${this.x - 1},${this.y - 1}`);
      }
      if (
        this.x != 7 &&
        board[this.x + 1][this.y] &&
        this.side != board[this.x + 1][this.y].side &&
        this.name == board[this.x + 1][this.y].name &&
        board[this.x + 1][this.y].isPassage == true
      ) {
        enPassant.push(`${this.x + 1},${this.y - 1}`);
      }
    }
    if (this.side == 'black') {
      if (
        this.x != 0 &&
        board[this.x - 1][this.y] &&
        this.side != board[this.x - 1][this.y].side &&
        this.name == board[this.x - 1][this.y].name &&
        board[this.x - 1][this.y].isPassage == true
      ) {
        enPassant.push(`${this.x - 1},${this.y + 1}`);
      }
      if (
        this.x != 7 &&
        board[this.x + 1][this.y] &&
        this.side != board[this.x + 1][this.y].side &&
        this.name == board[this.x + 1][this.y].name &&
        board[this.x + 1][this.y].isPassage == true
      ) {
        enPassant.push(`${this.x + 1},${this.y + 1}`);
      }
    }

    return enPassant;
  }

  destroyPawn(board) {
    console.log(board[this.x + 1][this.y]);
    board[this.x + 1][this.y] = null;
    console.log(board[this.x + 1][this.y]);
    console.log(board);
  }

  promote(gameArea) {
    const promotionBG = document.querySelector('.promotion-bg');
    const promotionQueen = document.querySelector('.promotion-queen');
    const promotionBishop = document.querySelector('.promotion-bishop');
    const promotionKnight = document.querySelector('.promotion-knight');
    const promotionRook = document.querySelector('.promotion-rook');

    const pieces = [
      { handler: promotionQueen, pieceName: Queen },
      { handler: promotionBishop, pieceName: Bishop },
      { handler: promotionKnight, pieceName: Knight },
      { handler: promotionRook, pieceName: Rook },
    ];

    document.getElementById(`${this.x},${this.y}`).innerHTML = '';

    promotionBG.classList.add('bg-active');

    for (const piece of pieces) {
      const { handler, pieceName: PieceName } = piece;
      const pieceToCreate = new PieceName(this.x, this.y, this.side);
      handler.innerHTML = pieceToCreate.display;

      const handlePromotionSelect = () => {
        gameArea[this.x][this.y] = pieceToCreate;
        document.getElementById(`${this.x},${this.y}`).innerHTML = pieceToCreate.display;
        promotionBG.classList.remove('bg-active');
        removeEventListeners();
      };

      handler.addEventListener('click', handlePromotionSelect);
      piece.listener = handlePromotionSelect;
    }
    function removeEventListeners() {
      for (let i = 0; i < pieces.length; i++) {
        const { handler } = pieces[i];
        handler.removeEventListener('click', pieces[i].listener);
      }
    }
  }
}
export default Pawn;
