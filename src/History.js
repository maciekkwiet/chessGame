class History {
  constructor(x, y, side, name, toX, toY) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.name = name;
    this.toX = toX;
    this.toY = toY;
    this.castling = '';
    this.promotion = false;
    this.attack = false;
    this.anotherPieceInRow = '';
    this.anotherPieceInColumn = '';
  }

  parseNotation() {
    const column = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const row = [1, 2, 3, 4, 5, 6, 7, 8];
    this.x = column[this.x];
    this.y = row[this.y];
    this.toX = column[this.toX];
    this.toY = row[this.toY];
  }
  checkCastling() {
    if (this.name === 'king' && this.toX - this.x < -1) this.castling = 'long';
    if (this.name === 'king' && this.toX - this.x > 1) this.castling = 'short';
  }

  checkAttack(gameArea) {
    if (gameArea[this.toX][this.toY]) this.attack = true;
  }
  checkPromotion() {
    if (this.toY === 7 && this.name === 'pawn' && this.side === 'black') this.promotion = true;
    if (this.toY === 0 && this.name === 'pawn' && this.side === 'white') this.promotion = true;
  }
  findAnotherPieces(gameArea) {
    const column = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const row = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (gameArea[i][j] && gameArea[i][j].side === this.side && gameArea[i][j].name === this.name) {
          if (gameArea[i][j].x === this.x && gameArea[i][j].y !== this.y) this.anotherPieceInColumn = row[this.y];
          if (gameArea[i][j].x !== this.x && gameArea[i][j].y === this.y) this.anotherPieceInRow = column[this.x];
        }
      }
    }
  }

  parseElement(gameArea) {
    this.checkPromotion();
    this.checkCastling();
    this.checkAttack(gameArea);
    this.findAnotherPieces(gameArea);
    this.parseNotation();
  }
}

export default History;
