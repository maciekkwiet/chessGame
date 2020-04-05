import Board from './Board';
import { parseId, iterateOver2DArray } from './utils';

class Game {
  constructor() {
    this.currentPlayer = 'white';
    this.round = 0;
    this.board = new Board();
    this.gameArea = this.board.gameArea;
    this.legalMoves = [];
    this.selectedPiece = null;
    this.board.gameAreaHandler.addEventListener('click', e => this.onClick(e));
  }

  onClick(e) {
    const element = e.target.classList.contains('square') ? e.target : e.target.parentElement;
    if (this.legalMoves.length !== 0) {
      this.handleMove(element);
    } else {
      this.handleSelect(element);
    }
  }

  changeTurn() {
    if (this.round % 2 === 0) this.currentPlayer = 'black';
    if (this.round % 2 === 1) this.currentPlayer = 'white';
    this.round++;
  }

  handleSelect(element) {
    const [x, y] = parseId(element.id);
    if (!this.gameArea[x][y] || this.gameArea[x][y].side !== this.currentPlayer) return;

    this.selectedPiece = this.gameArea[x][y];
    const possibleMoves = this.selectedPiece.findLegalMoves(this.gameArea);

    // ToDo refactor
    if (this.selectedPiece.name === 'king' && !this.isChecked())
      possibleMoves.push(...this.selectedPiece.castling(this.gameArea, {}));

    this.legalMoves = possibleMoves.filter(move => {
      const suspectedGameState = this.board.tryPieceMove(this.selectedPiece, parseId(move));
      return !this.isChecked(suspectedGameState);
    });
    this.board.highlightPossibleMoves(this.legalMoves);
  }

  handleMove(element) {
    const { id } = element;
    if (!this.legalMoves.includes(id)) return;

    // ToDo refactor
    if (this.selectedPiece.name === 'king' && Math.abs(this.selectedPiece.x - id[0]) > 1) {
      this.selectedPiece.castling(this.gameArea, parseId(id));
    } else if (this.selectedPiece.name === 'pawn' && Math.abs(this.selectedPiece.y - id[2]) > 1) {
      this.board.movePiece(this.selectedPiece, parseId(id));
      this.selectedPiece.isPassage = true;
    } else if (this.selectedPiece.name === 'pawn' && this.selectedPiece.enPassant.length != 0) {
      const param = this.selectedPiece.enPassant(this.gameArea);
      param.forEach(x => {
        if (x[0] == id[0]) {
          this.board.destroyEnPassantPawn(this.gameArea, id[0], this.selectedPiece.y);
        }
      });
      this.board.movePiece(this.selectedPiece, parseId(id));
    } else this.board.movePiece(this.selectedPiece, parseId(id));
    // ToDo refactor
    if (this.selectedPiece.name === 'pawn') {
      if (
        (this.selectedPiece.y === 0 && this.selectedPiece.side === 'white') ||
        (this.selectedPiece.y === 7 && this.selectedPiece.side === 'black')
      )
        this.selectedPiece.promote(this.gameArea);
    }
    this.board.removeHighlight();
    this.selectedPiece = null;
    this.legalMoves = [];
    this.changeTurn();
    this.resetPawnFlag(this.currentPlayer, this.gameArea);
    if (this.isChecked()) {
      console.log('Szach');
      if (this.isCheckMate()) alert('Szach i Mat');
    }
  }

  isChecked(gameArea = this.gameArea) {
    const king = this.getKingPosition(gameArea);
    const opponentMoves = this.getPlayerMoves(this.currentPlayer === 'white' ? 'black' : 'white', gameArea);
    return opponentMoves.some(move => move[0] == king.x && move[2] == king.y) ? true : false;
  }

  isCheckMate(gameArea = this.gameArea) {
    const currentPlayerPieces = this.getPlayerPieces(this.currentPlayer, gameArea);
    return currentPlayerPieces.every(piece =>
      piece.findLegalMoves(gameArea).every(move => {
        const suspectedGameState = this.board.tryPieceMove(piece, parseId(move));
        return this.isChecked(suspectedGameState);
      }),
    );
  }

  resetPawnFlag(player, gameArea = this.gameArea) {
    const pieces = this.getPlayerPieces(player, gameArea);
    let pawns = pieces.filter(param => param.name == 'pawn');
    return pawns.forEach(param2 => (param2.isPassage = false));
  }

  getKingPosition(gameArea = this.gameArea, player = this.currentPlayer) {
    const king = {};
    iterateOver2DArray((piece, x, y) => {
      if (piece && piece.side === player && piece.name === 'king') {
        king.x = x;
        king.y = y;
      }
    }, gameArea);
    return king;
  }

  getPlayerPieces(player, gameArea = this.gameArea) {
    return gameArea.flat().filter(piece => piece && piece.side === player);
  }

  getPlayerMoves(player, gameArea = this.gameArea) {
    const pieces = this.getPlayerPieces(player, gameArea);
    return pieces.map(piece => piece.findLegalMoves(gameArea)).flat();
  }
}

export default Game;
