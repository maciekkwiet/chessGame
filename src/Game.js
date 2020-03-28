import Board from './Board';
import { parseId, iterateOver2DArray } from './utils';
import Piece from './pieces/Piece';

class Game {
  constructor() {
    this.currentPlayer = 'white';
    this.round = 0;
    this.isCheck = false;
    this.board = new Board();
    this.gameArea = this.board.gameArea;
    this.gameAreaHandler = this.board.gameAreaHandler;
    this.legalMoves = [];
    this.possibleMovesCheck = [];
    this.selectedPiece = null;
    this.gameAreaHandler.addEventListener('click', e => this.onClick(e));
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

    for (const move of possibleMoves) {
      const suspectedGameState = this.board.testMovePiece(this.selectedPiece, parseId(move));
      if (!this.check(suspectedGameState)) this.legalMoves.push(move);
    }
    this.board.highlightPossibleMoves(this.legalMoves);
  }

  handleMove(element) {
    const { id } = element;
    if (!this.legalMoves.includes(id)) return;
    this.board.movePiece(this.selectedPiece, parseId(id));
    this.board.removeHighlight();
    this.selectedPiece = null;
    this.legalMoves = [];
    this.changeTurn();
    // if (this.check(this.gameArea)) {
    //   this.correctLegalMoves(this.gameArea);
    // }
    //this.checkMate();
  }

  check(gameArea) {
    let isCheck = false;

    let king = {};
    iterateOver2DArray((piece, x, y) => {
      if (piece && piece.side === this.currentPlayer && piece.name === 'king') {
        king.x = x;
        king.y = y;
      }
    }, gameArea);

    gameArea.flat().forEach(piece => {
      if (piece && piece.side !== this.currentPlayer) {
        if (piece.findLegalMoves(gameArea).some(move => move[0] == king.x && move[2] == king.y)) isCheck = true;
      }
    });

    return isCheck;
  }

  checkMate(gameArea) {
    let tab = [];

    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (gameArea[i][j]) {
          if (gameArea[i][j].name == 'king' && this.currentPlayer == gameArea[i][j].side) {
            tab = gameArea[i][j].findLegalMoves(gameArea).concat(tab);
          }
        }
      }
    }

    if (this.isCheck && this.possibleMovesCheck.length == 0 && tab.length == 0) {
      console.log('SZACH MAT');
      alert('SZACH MAT');
    }
  }

  correctLegalMoves(gameArea) {
    this.possibleMovesCheck = [];
    const param = this.oponentMovesTwo(this.gameArea);

    for (let i = 0; i < param.length; i++) {
      const tab = param[i];

      if (!gameArea[tab[0]][tab[2]]) {
        let piece = new Piece([tab[0]], [tab[2]], this.currentPlayer);
        this.gameArea[piece.x][piece.y] = piece;
        this.check(gameArea);
        if (!this.isCheck) {
          this.possibleMovesCheck.push(param[i]);
        }

        this.gameArea[tab[0]][tab[2]] = '';
      }
    }

    for (let i = 0; i < param.length; i++) {
      const tab = param[i];

      if (gameArea[tab[0]][tab[2]]) {
        if (gameArea[tab[0]][tab[2]].name !== 'king') {
          let replacement = this.gameArea[tab[0]][tab[2]];
          let piece = new Piece([tab[0]], [tab[2]], this.currentPlayer);
          this.gameArea[piece.x][piece.y] = piece;
          this.check(gameArea);
          if (!this.isCheck) {
            this.possibleMovesCheck.push(param[i]);
          }
          this.gameArea[tab[0]][tab[2]] = replacement;
        }
      }
    }

    this.checkMate(gameArea);

    return this.possibleMovesCheck;
  }

  oponentMoves(gameArea) {
    // to powinna być funkcja zamiast findLegalMoves - findAttackingMoves dla szacha i zbicia w trakcie szachu
    let oponentMoves = [];
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (gameArea[i][j]) {
          if (gameArea[i][j].side !== this.currentPlayer && gameArea[i][j].name !== 'king') {
            oponentMoves = gameArea[i][j].findLegalMoves(gameArea).concat(oponentMoves);
          }
        }
      }
    }
    return oponentMoves;
  }

  oponentMovesTwo(gameArea) {
    let oponentMovesTwo = [];

    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (gameArea[i][j]) {
          if (gameArea[i][j].side == this.currentPlayer && gameArea[i][j].name !== 'king') {
            oponentMovesTwo = gameArea[i][j].findLegalMoves(gameArea).concat(oponentMovesTwo);
          }
        }
      }
    }
    return oponentMovesTwo;
  }
}

export default Game;
