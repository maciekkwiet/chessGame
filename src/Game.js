import Board from './Board';
import History from './History';
import HistoryTable from './HistoryTable';
import { parseId, iterateOver2DArray } from './utils';
import Timer from './Timer.js';

class Game {
  constructor() {
    this.endGame = this.endGame.bind(this);
    this.currentPlayer = 'white';
    this.round = 0;
    this.board = new Board();
    this.gameArea = this.board.gameArea;
    this.legalMoves = [];
    this.selectedPiece = null;
    this.board.gameAreaHandler.addEventListener('click', e => this.onClick(e));
    this.whitePlayerTimer = new Timer(900, 'timerwhite', this.endGame, 'black');
    this.blackPlayerTimer = new Timer(900, 'timerblack', this.endGame, 'white');
    this.historyArray = [];
    this.HistoryTable = new HistoryTable();
  }

  onClick(e) {
    const element = e.target.classList.contains('square') ? e.target : e.target.parentElement;
    const { id } = element;
    if (this.legalMoves.length !== 0) {
      if (this.legalMoves.includes(id)) this.handleMove(element);
      else this.removeSelection();
    } else {
      this.handleSelect(element);
    }
  }
  removeSelection() {
    this.board.removeHighlight();
    this.selectedPiece = null;
    this.legalMoves = [];
  }
  changeTurn() {
    if (this.round % 2 === 0) this.currentPlayer = 'black';
    if (this.round % 2 === 1) this.currentPlayer = 'white';
    this.round++;
  }

  handleSelect(element) {
    const [x, y] = parseId(element.id);
    if (!this.gameArea[x][y] || this.gameArea[x][y].side !== this.currentPlayer) return;
    this.board.SelectedBackground(`${x},${y}`);
    this.selectedPiece = this.gameArea[x][y];
    const possibleMoves = this.selectedPiece.findLegalMoves(
      this.gameArea,
      this.getPlayerAttack(this.currentPlayer === 'white' ? 'black' : 'white', this.gameArea),
    );
    this.legalMoves = possibleMoves.filter(move => {
      const suspectedGameState = this.board.tryPieceMove(this.selectedPiece, parseId(move));
      return !this.isChecked(suspectedGameState);
    });
    this.board.highlightPossibleMoves(this.legalMoves);
  }

  handleMove(element) {
    const { id } = element;
    if (!this.legalMoves.includes(id)) return;
    const { x, y } = this.selectedPiece;

    this.board.SelectedBackground(`${x},${y}`);
    // ToDo refactor
    if (this.selectedPiece.name === 'king' && Math.abs(this.selectedPiece.x - id[0]) > 1) {
      this.selectedPiece.castling(this.gameArea, parseId(id));
    } else this.board.movePiece(this.selectedPiece, parseId(id));

    if (this.currentPlayer === 'white') {
      this.blackPlayerTimer.start();
      this.whitePlayerTimer.pause();
    } else {
      this.whitePlayerTimer.start();
      this.blackPlayerTimer.pause();
    }

    console.log(document.querySelector('#timerwhite').innerHTML);

    // ToDo refactor
    if (this.selectedPiece.name === 'pawn') {
      if (
        (this.selectedPiece.y === 0 && this.selectedPiece.side === 'white') ||
        (this.selectedPiece.y === 7 && this.selectedPiece.side === 'black')
      )
        this.selectedPiece.promote(this.gameArea);
    }

    this.createHistoryArray(this.selectedPiece, parseId(id));
    this.board.movePiece(this.selectedPiece, parseId(id));

    this.board.removeHighlight();
    this.selectedPiece = null;
    this.legalMoves = [];
    this.changeTurn();
    this.resetPawnFlag(this.currentPlayer, this.gameArea);
    if (this.isChecked()) {
      this.board.lightUpCheck(this.getKingPosition(this.gameArea));
      if (this.isCheckMate()) {
        setTimeout(gameArea => this.endGame(gameArea), 1200);
      }
      if (this.currentPlayer == 'white') {
        this.whitePlayerTimer.stop();
      } else {
        this.blackPlayerTimer.stop();
      }
    }
    this.isPat();
  }

  endGame(gameArea = this.gameArea) {
    this.board.changeSquareStyle(
      this.getKingPosition(gameArea).x.toString() + this.getKingPosition(gameArea).y.toString(),
      'square check',
    );
  }

  isChecked(gameArea = this.gameArea) {
    const king = this.getKingPosition(gameArea);
    const opponentMoves = this.getPlayerMoves(this.currentPlayer === 'white' ? 'black' : 'white', gameArea);
    return opponentMoves.some(move => move[0] == king.x && move[2] == king.y) ? true : false;
  }

  isCheckMate(gameArea = this.gameArea) {
    const currentPlayerPieces = this.getPlayerPieces(this.currentPlayer, gameArea);
    return currentPlayerPieces.every(piece =>
      piece
        .findLegalMoves(
          gameArea,
          this.getPlayerAttack(this.currentPlayer === 'white' ? 'black' : 'white', this.gameArea),
        )
        .every(move => {
          const suspectedGameState = this.board.tryPieceMove(piece, parseId(move));
          return this.isChecked(suspectedGameState);
        }),
    );
  }

  resetPawnFlag(player, gameArea = this.gameArea) {
    const pieces = this.getPlayerPieces(player, gameArea);
    const pawns = pieces.filter(piece => piece.name == 'pawn');
    return pawns.forEach(pawn => (pawn.isPassage = false));
  }

  isPat(gameArea = this.gameArea) {
    const opponentMoves = this.getPlayerMoves(this.currentPlayer === 'white' ? 'white' : 'black', gameArea);
    if (!this.isChecked() && opponentMoves.length == 0) {
      console.log('PAT');
      this.whitePlayerTimer.tie();

      this.board.changeSquareStyle(
        this.getKingPosition(this.gameArea).x.toString() + this.getKingPosition(this.gameArea).y.toString(),
        'square pat',
      );
    }
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
    return pieces
      .map(piece =>
        piece.findLegalMoves(
          gameArea,
          this.getPlayerAttack(this.currentPlayer === 'white' ? 'black' : 'white', this.gameArea),
        ),
      )
      .flat();
  }

  getPlayerAttack(player, gameArea = this.gameArea) {
    const pieces = this.getPlayerPieces(player, gameArea);
    return pieces.map(piece => piece.findAttackingMoves(gameArea)).flat();
  }

  createHistoryArray(selectedPiece, to) {
    let historyElement = new History(
      selectedPiece.x,
      selectedPiece.y,
      selectedPiece.side,
      selectedPiece.name,
      to[0],
      to[1],
    );
    historyElement.parseElement(this.gameArea);
    this.historyArray.push(historyElement);
    this.HistoryTable.generateHistoryTable(this.historyArray);
    console.log(historyElement);
  }
}
export default Game;
