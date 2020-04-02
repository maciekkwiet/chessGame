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
    const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const column = [7, 6, 5, 4, 3, 2, 1];
    console.log('sprawdza', this.x, row[this.x]);
    this.x = row[this.x];
    this.y = column[this.y];
    this.toX = row[this.toX];
    this.toY = column[this.toY];
    console.log('to parser');
  }
  checkCastling() {
    console.log('sprcast', this.toX, this.x);
    if (this.name === 'king' && this.toX - this.x < -1) this.castling = true;
    if (this.name === 'king' && this.toX - this.x > 11) this.castling = true;
  }

  checkAttack(gameArea) {
    if (gameArea[(this.toX, this.toY)]) this.attack = true;
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
