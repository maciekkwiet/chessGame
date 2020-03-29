import Piece from './Piece';

class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'king';
    this.display = `<i class="fas fa-chess-king ${side}"></i>`; //fontawesome king
  }
  oponentMoves(gameArea) {
    let oponentMoves2 = [];

    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (gameArea[i][j]) {
          if (gameArea[i][j].side !== this.side) {
            oponentMoves2 = gameArea[i][j].findAttackingMoves(gameArea).concat(oponentMoves2);
          }
        }
      }
    }
    return oponentMoves2;
  }

  findLegalMoves(gameArea) {
    const possibleMoves = [];
    const attack = this.findAttackingMoves(gameArea);

    attack.forEach(piece => {
      if (gameArea[piece[0]][piece[2]]) {
        if (gameArea[piece[0]][piece[2]].side === this.side) possibleMoves.push(`${piece[0]},${piece[2]}`);
      }
    });

    let filteredMoves = attack.filter(move => !possibleMoves.includes(move));
    let twiceFilteredMoves = filteredMoves.filter(move => !this.oponentMoves(gameArea).includes(move));

    return twiceFilteredMoves;
  }

  findAttackingMoves() {
    const moves = [[1, 1], [-1, 1], [-1, -1], [1, -1], [1, 0], [-1, 0], [0, -1], [0, 1]];
    let newX = 0;
    let newY = 0;
    const attackingMoves = [];
    for (const subTab of moves) {
      newX = this.x + subTab[0];
      newY = this.y + subTab[1];
      if (newX <= 7 && newX >= 0 && newY <= 7 && newY >= 0) attackingMoves.push(`${newX},${newY}`);
    }

    return attackingMoves;
  }

  castling(gameArea, to) {
    const castlingMoves = [];
    const ldCheck = [[1, 7], [1, 6], [2, 6], [3, 6], [3, 7]];
    const luCheck = [[1, 0], [1, 1], [2, 1], [3, 1], [3, 0]];
    const rdCheck = [[5, 7], [5, 6], [6, 6], [7, 6], [7, 7]];
    const ruCheck = [[5, 0], [5, 1], [6, 1], [7, 1], [7, 0]];

    if (gameArea[0][this.y]) {
      if (
        gameArea[1][this.y] === null &&
        gameArea[2][this.y] === null &&
        gameArea[3][this.y] === null &&
        !gameArea[0][this.y].hasMoved
      ) {
        if (ldCheck.filter(move => this.oponentMoves(gameArea).includes(move)).length === 0 && this.y === 7)
          castlingMoves.push(`${[2]},${[7]}`);
        if (luCheck.filter(move => this.oponentMoves(gameArea).includes(move)).length === 0 && this.y === 0)
          castlingMoves.push(`${[2]},${[0]}`);
      }
    }

    if (gameArea[7][this.y]) {
      if (gameArea[5][this.y] === null && gameArea[6][this.y] === null && !gameArea[7][this.y].hasMoved) {
        console.log('dupa');
        if (rdCheck.filter(move => this.oponentMoves(gameArea).includes(move)).length === 0 && this.y === 7)
          castlingMoves.push(`${[6]},${[7]}`);
        if (ruCheck.filter(move => this.oponentMoves(gameArea).includes(move)).length === 0 && this.y === 0)
          castlingMoves.push(`${[6]},${[0]}`);
      }
    }

    if ((to[0] === 2 && to[1] === this.y) || (to[0] === 6 && to[1] === this.y)) {
      console.log('dupa');
      let [toX, toY] = to;

      gameArea[this.x][this.y] = null;

      this.move(to);
      gameArea[toX][toY] = this;

      if (to[0] === 2) {
        to = [3, this.y];
        let [toX, toY] = to;

        let rookToMove = gameArea[0][this.y];
        gameArea[0][this.y] = null;

        rookToMove.move(to);
        gameArea[toX][toY] = rookToMove;
      }
      if (to[0] === 6) {
        to = [5, this.y];
        [toX, toY] = to;

        let rookToMove = gameArea[7][this.y];
        gameArea[7][this.y] = null;

        rookToMove.move(to);
        gameArea[toX][toY] = rookToMove;
        //console.log();
      }
    }

    return castlingMoves;
  }
}

export default King;
