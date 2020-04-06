import Board from './Board';
import { parseId, iterateOver2DArray } from './utils';
import TIME from './clock.js';

class Game {
  constructor() {
    this.currentPlayer = 'white';
    this.round = 0;
    this.board = new Board();
    this.gameArea = this.board.gameArea;
    this.legalMoves = [];
    this.selectedPiece = null;
    this.board.gameAreaHandler.addEventListener('click', e => this.onClick(e));
    this.whiteplayer = new TIME(900, 'timerwhite');
    this.blackplayer = new TIME(900, 'timerblack');
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

  // Ta metoda powinna istnieć w klasie board, w game nie robimy interakcji z DOM, ponadto Maciek pisał podobną metode można by ją wykorzystać
  changecolor(x, y) {
    // y jest zawsze undefined ponieważ przyjmujesz tutaj dwa parametry a przekazujesz tylko jeden
    const currentColorPlayer = document.getElementById(x, y);

    //polecam zapoznać się z add, remove i toggle znaczenie uprości ten kod https://developer.mozilla.org/pl/docs/Web/API/Element/classList
    if (currentColorPlayer.className != 'currentcolor square') {
      currentColorPlayer.className = 'currentcolor square';
    } else {
      y % 2 == x % 2 ? (currentColorPlayer.className = 'square light') : (currentColorPlayer.className = 'square dark');
    }
    return x, y; //funkcje w js (i nie tylko) nie mogą zwracać więcej niż jednego elementu
  }

  // Ta metoda powinna istnieć w klasie board, choć bardzo możliwe że okaże się nie potrzebna
  // Obczaj metode toggle: https://developer.mozilla.org/pl/docs/Web/API/Element/classList
  backchangecolor() {
    this.changecolor(); //wywołałaś funkcję więc cokolwiek ona zwróciła jest dostępne w tej lini i tylko w tej linii
    // szukasz właściwości x na funkcji (nie na wartości zwróconej przez funkcje). Jako że funkcje są obiektami to jest to możliwe aczkolwiek tutaj nie ma to sensu
    const backx = this.changecolor.x;
    const backy = this.changecolor.y;

    const currentColorPlayerback = document.getElementById(backx, backy);

    if (currentColorPlayerback.className == 'currentcolor square') {
      backy % 2 == backx % 2
        ? (currentColorPlayerback.className = 'square light')
        : (currentColorPlayerback.className = 'square dark');
    }
  }

  handleSelect(element) {
    const [x, y] = parseId(element.id);

    if (!this.gameArea[x][y] || this.gameArea[x][y].side !== this.currentPlayer) return;

    this.changecolor(`${x},${y}`);

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
    //const [x, y] = parseId(element.id);
    const { id } = element;
    console.log({ id });
    this.backchangecolor();
    if (!this.legalMoves.includes(id)) return;

    // ToDo refactor
    if (this.selectedPiece.name === 'king' && Math.abs(this.selectedPiece.x - id[0]) > 1) {
      this.selectedPiece.castling(this.gameArea, parseId(id));
    } else this.board.movePiece(this.selectedPiece, parseId(id));

    if (this.currentPlayer == 'white') this.whiteplayer.start();
    else this.whiteplayer.pause();
    if (this.currentPlayer == 'black') this.blackplayer.start();
    else this.blackplayer.pause();

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
