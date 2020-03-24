import Board from './Board';
import { parseId } from './utils';
import King, { oponentMoves2 } from './pieces/King';

class Game {
  constructor() {
    this.currentPlayer = 'white';
    this.round = 0;
    this.checkflag = 0;
    this.board = new Board();
    this.gameArea = this.board.gameArea;
    this.gameAreaHandler = this.board.gameAreaHandler;
    this.possibleMoves = [];
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
      this.possibleMoves = this.selectedPiece.findLegalMoves(this.gameArea);
      this.board.highlightPossibleMoves(this.possibleMoves);
    }
  }

  handleMove(element) {
    const { id } = element;
    if (!this.possibleMoves.includes(id)) return;
    this.board.movePiece(this.selectedPiece, parseId(id));
    this.board.removeHighlight();
    this.selectedPiece = null;
    if (this.checkflag) this.correctLegalMoves(this.gameArea);
    this.possibleMoves = [];
    this.changeTurn();
    this.check(this.gameArea);
  }

  check(gameArea) {
    this.checkflag = 0;
    const oponentattack = this.oponentMoves(gameArea);
    //console.log(oponentattack);
    // const oponentattack2 = oponentMoves2;
    // console.log(oponentattack2);

    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (gameArea[i][j]) {
          if (gameArea[i][j].name == 'king' && this.currentPlayer == gameArea[i][j].side) {
            for (let k = 0; k < oponentattack.length; k++) {
              const tab = oponentattack[k];
              if (tab[0] == gameArea[i][j].x && tab[2] == gameArea[i][j].y) {
                this.checkflag = 1;
              }
            }
          }
        }
      }
    }
    return this.checkflag;
  }

  correctLegalMoves(gameArea) {
    const possibleMovesCheck = [];
    const param = this.oponentMoves(this.gameArea);

    for (let i = 0; i < param.length; i++) {
      const tab = param[i];

      //if(param[i])

      console.log(param[i]);
    }

    console.log('SZACH!');

    return possibleMovesCheck;
  }

  oponentMoves(gameArea) {
    let oponentMoves2 = [];

    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (gameArea[i][j]) {
          if (
            gameArea[i][j].side !== this.currentPlayer &&
            gameArea[i][j].name !== 'king' &&
            gameArea[i][j].name !== 'pawn'
          ) {
            oponentMoves2 = gameArea[i][j].findLegalMoves(gameArea).concat(oponentMoves2);
          }
        }
      }
    }
    return oponentMoves2;
  }
}

export default Game;
