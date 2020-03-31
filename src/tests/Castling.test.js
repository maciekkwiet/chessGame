import Game from '../Game';
import King from '../pieces/King';
import Rook from '../pieces/Rook';

let game;

beforeAll(() => {
  document.body.innerHTML = `<div id="wrapper"><div id="board"></div></div>`;
});

beforeEach(() => {
  game = new Game();
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) game.gameArea[i][j] = null;
});

describe('Castling works as intended', () => {
  test('King can do short castle, both rook and king are in correct places after castling', () => {
    const { gameArea } = game;
    gameArea[4][0] = new King(4, 0, 'black');
    gameArea[7][0] = new Rook(7, 0, 'black');
    game.handleSelect({ id: '4,0' });
    game.handleMove({ id: '6,0' });
    expect(gameArea[4][0]).toBeNull();
    expect(gameArea[7][0]).toBeNull();
    expect(gameArea[6][0]).toBeInstanceOf(King);
    expect(gameArea[5][0]).toBeInstanceOf(Rook);
  });
  test('King can do long castle, both rook and king are in correct places after castling', () => {
    const { gameArea } = game;
    gameArea[4][0] = new King(4, 0, 'black');
    gameArea[0][0] = new Rook(0, 0, 'black');
    game.handleSelect({ id: '4,0' });
    game.handleMove({ id: '2,0' });
    expect(gameArea[4][0]).toBeNull();
    expect(gameArea[0][0]).toBeNull();
    expect(gameArea[2][0]).toBeInstanceOf(King);
    expect(gameArea[3][0]).toBeInstanceOf(Rook);
  });
  test('King cannot castle if the rook was moved', () => {
    const { gameArea } = game;
    gameArea[4][0] = new King(4, 0, 'black');
    gameArea[0][0] = new Rook(0, 0, 'black');
    gameArea[0][0].hasMoved = true;
    game.handleSelect({ id: '4,0' });
    game.handleMove({ id: '2,0' });
    expect(gameArea[4][0]).toBeInstanceOf(King);
    expect(gameArea[0][0]).toBeInstanceOf(Rook);
    expect(gameArea[2][0]).toBeNull();
    expect(gameArea[3][0]).toBeNull();
  });
  test('King cannot castle if he had already moved', () => {
    const { gameArea } = game;
    gameArea[4][0] = new King(4, 0, 'black');
    gameArea[0][0] = new Rook(0, 0, 'black');
    gameArea[4][0].hasMoved = true;
    game.handleSelect({ id: '4,0' });
    game.handleMove({ id: '2,0' });
    expect(gameArea[4][0]).toBeInstanceOf(King);
    expect(gameArea[0][0]).toBeInstanceOf(Rook);
    expect(gameArea[2][0]).toBeNull();
    expect(gameArea[3][0]).toBeNull();
  });
  test('King cannot castle when piece is in the way', () => {
    const { gameArea } = game;
    gameArea[4][0] = new King(4, 0, 'black');
    gameArea[1][0] = new Rook(1, 0, 'black');
    gameArea[0][0] = new Rook(0, 0, 'black');
    game.handleSelect({ id: '4,0' });
    game.handleMove({ id: '2,0' });
    expect(gameArea[4][0]).toBeInstanceOf(King);
    expect(gameArea[0][0]).toBeInstanceOf(Rook);
    expect(gameArea[2][0]).toBeNull();
    expect(gameArea[3][0]).toBeNull();
  });
  test('King cannot castle when it is in check', () => {
    const { gameArea } = game;
    gameArea[4][0] = new King(4, 0, 'black');
    gameArea[0][0] = new Rook(0, 0, 'black');

    gameArea[0][0] = new Rook(4, 7, 'white');
    game.handleSelect({ id: '4,0' });
    game.handleMove({ id: '2,0' });
    expect(gameArea[4][0]).toBeInstanceOf(King);
    expect(gameArea[0][0]).toBeInstanceOf(Rook);
    expect(gameArea[2][0]).toBeNull();
    expect(gameArea[3][0]).toBeNull();
  });
  test('King cannot castle when it would put him in check', () => {
    const { gameArea } = game;
    gameArea[4][0] = new King(4, 0, 'black');
    gameArea[0][0] = new Rook(0, 0, 'black');

    gameArea[0][0] = new Rook(2, 7, 'white');
    game.handleSelect({ id: '4,0' });
    game.handleMove({ id: '2,0' });
    expect(gameArea[4][0]).toBeInstanceOf(King);
    expect(gameArea[0][0]).toBeInstanceOf(Rook);
    expect(gameArea[2][0]).toBeNull();
    expect(gameArea[3][0]).toBeNull();
  });
  test('King cannot castle when neighbouring square is attacked', () => {
    const { gameArea } = game;
    gameArea[4][0] = new King(4, 0, 'black');
    gameArea[0][0] = new Rook(0, 0, 'black');

    gameArea[0][0] = new Rook(3, 7, 'white');
    game.handleSelect({ id: '4,0' });
    game.handleMove({ id: '2,0' });
    expect(gameArea[4][0]).toBeInstanceOf(King);
    expect(gameArea[0][0]).toBeInstanceOf(Rook);
    expect(gameArea[2][0]).toBeNull();
    expect(gameArea[3][0]).toBeNull();
  });
});
