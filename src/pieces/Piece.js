class Piece {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side; //'black' or 'white'
    this.hasMoved = false;
  }
  move(to) {
    const newX = Number(to[0]);
    const newY = Number(to[1]);

    //clearing previous place
    console.log(document.getElementById(`${this.x},${this.y}`));
    document.getElementById(`${this.x},${this.y}`).innerHTML = '';

    //setting new
    this.x = newX;
    this.y = newY;
    document.getElementById(to).innerHTML = this.display;
    console.log(document.getElementById(`${this.x},${this.y}`));
    this.hasMoved = true;
  }

  findLegalMoves() {}
}

export default Piece;
