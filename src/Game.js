import Board from './Board';
import { parseId } from './utils';
import Piece from './pieces/Piece';
import King, { findLegalMoves } from './pieces/King';
//import King from './pieces/King';

class Game {
  constructor() {
    this.currentPlayer = 'white';
    this.round = 0;
    this.isCheck = false;
    this.board = new Board();
    this.gameArea = this.board.gameArea;
    this.gameAreaHandler = this.board.gameAreaHandler;
    this.possibleMoves = [];
    this.possibleMovesCheck = [];
    this.selectedPiece = null;
    this.gameAreaHandler.addEventListener('click', e => this.onClick(e));
  }

  onClick(e) {
    const element = e.target.classList.contains('square') ? e.target : e.target.parentElement;
    if (this.possibleMoves.length !== 0) {
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
    if (!this.gameArea[x][y]) {
      return;
    }
    this.selectedPiece = this.gameArea[x][y];

    if (this.selectedPiece.side === this.currentPlayer) {
      if (this.isCheck) {
        if (this.selectedPiece.name == 'king') {
          this.possibleMoves = this.selectedPiece.findLegalMoves(this.gameArea);
        } else {
          for (let i = 0; i < this.selectedPiece.findLegalMoves(this.gameArea).length; i++) {
            for (let j = 0; j < this.possibleMovesCheck.length; j++) {
              if (this.selectedPiece.findLegalMoves(this.gameArea)[i] == this.possibleMovesCheck[j]) {
                this.possibleMoves.push(this.selectedPiece.findLegalMoves(this.gameArea)[i]);
              }
            }
          }
        }
      } else if (!this.isCheck) {
        this.possibleMoves = this.selectedPiece.findLegalMoves(this.gameArea);
      }
      this.board.highlightPossibleMoves(this.possibleMoves);
    }
  }

  handleMove(element) {
    const { id } = element;
    if (!this.possibleMoves.includes(id)) return;
    this.board.movePiece(this.selectedPiece, parseId(id));
    this.board.removeHighlight();
    this.selectedPiece = null;
    this.possibleMoves = [];
    this.changeTurn();
    this.check(this.gameArea);
    if (this.isCheck) this.correctLegalMoves(this.gameArea);
    //this.checkMate(gameArea);
  }

  check(gameArea) {
    this.isCheck = false;
    const oponentattack = this.oponentMoves(gameArea);

    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (gameArea[i][j]) {
          if (gameArea[i][j].name == 'king' && this.currentPlayer == gameArea[i][j].side) {
            for (let k = 0; k < oponentattack.length; k++) {
              const tab = oponentattack[k];
              if (tab[0] == gameArea[i][j].x && tab[2] == gameArea[i][j].y) {
                this.isCheck = true;
                //console.log('SZACH');
              }
            }
          }
        }
      }
    }

    return this.isCheck;
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
    const paramTwo = this.oponentMovesTwo(this.gameArea);

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

    for (let i = 0; i < paramTwo.length; i++) {
      const tab = paramTwo[i];

      if (gameArea[tab[0]][tab[2]]) {
        if (gameArea[tab[0]][tab[2]].name !== 'king') {
          let replacement = this.gameArea[tab[0]][tab[2]];
          let piece = new Piece([tab[0]], [tab[2]], this.currentPlayer);
          this.gameArea[piece.x][piece.y] = piece;
          this.check(gameArea);
          if (!this.isCheck) {
            this.possibleMovesCheck.push(paramTwo[i]);
          }
          this.gameArea[tab[0]][tab[2]] = replacement;
        }
      }
    }

    this.checkMate(gameArea);
    console.log(this.possibleMovesCheck);

    return this.possibleMovesCheck;
  }

  oponentMoves(gameArea) {
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
