import Piece from './pieces/Piece';

class Historyelement extends Piece {
  constructor(x, y, side, name, toX, toY) {
    super(x, y, side);
    this.name = name;
    this.toX = toX;
    this.toY = toY;
    this.castling = '';
    this.promotion = false;
    this.attack = false;
  }



  parseNotation() {
    const column = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const row = [1, 2, 3, 4, 5, 6, 7, 8];
    console.log('sprawdzax', this.x, column[this.x], 'sprawdzay', this.y, row[this.y]);
    this.x = column[this.x];
    this.y = row[this.y];
    this.toX = column[this.toX];
    this.toY = row[this.toY];
    console.log('to parser');
  }
  checkCastling() {
    console.log('sprcast', this.toX, this.x);
    if (this.name === 'king' && this.toX - this.x < -1) this.castling = 'long';
    if (this.name === 'king' && this.toX - this.x > 1) this.castling = 'short';
  }

  checkAttack(gameArea) {
    console.log(gameArea[this.toX][this.toY]);
    if (gameArea[this.toX][this.toY]) this.attack = true;
  }
  checkPromotion() {
    if (this.toY === 7 && this.name === 'pawn' && this.side === 'black') this.promotion = true;
    if (this.toY === 0 && this.name === 'pawn' && this.side === 'white') this.promotion = true;
  }

  parseElement(gameArea) {
    this.checkPromotion();
    this.checkCastling();
    this.checkAttack(gameArea);
    this.parseNotation();
  }
}

export default Historyelement;
