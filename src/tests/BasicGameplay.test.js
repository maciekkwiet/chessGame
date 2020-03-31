import Game from '../Game.js';
import Rook from '../pieces/Rook.js';
import Bishop from '../pieces/Bishop.js';
import Queen from '../pieces/Queen.js';
import King from '../pieces/King.js';
import Knight from '../pieces/Knight.js';
import Pawn from '../pieces/Pawn.js';

let game;

beforeAll(() => {
  document.body.innerHTML = `<div id="wrapper"><div id="board"></div></div>`;
});

beforeEach(() => {
  game = new Game();
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) game.gameArea[i][j] = null;
});

describe('Game behaves according to chess rules', () => {
  test('Rook can move in a line', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Rook(0, 0, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '0,7' });
    expect(gameArea[0][7]).toBeInstanceOf(Rook);
  });
  test('Rook cannot move in a line when other piece stands in a way', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Rook(0, 0, 'white');
    gameArea[0][3] = new Rook(0, 3, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '0,7' });
    expect(gameArea[0][0]).toBeInstanceOf(Rook);
    expect(gameArea[0][7]).toBeFalsy();
  });
  test('Bishop can move in a diagonal', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Bishop(0, 0, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '7,7' });
    expect(gameArea[7][7]).toBeInstanceOf(Bishop);
  });
  test('Bishop cannot move in a line when other piece stands in a way', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Bishop(0, 0, 'white');
    gameArea[3][3] = new Bishop(3, 3, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '7,7' });
    expect(gameArea[0][0]).toBeInstanceOf(Bishop);
    expect(gameArea[7][7]).toBeFalsy();
  });
  test('Queen can move in a line', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Queen(0, 0, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '0,7' });
    expect(gameArea[0][7]).toBeInstanceOf(Queen);
  });
  test('Queen can move in a diagonal', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Queen(0, 0, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '7,7' });
    expect(gameArea[7][7]).toBeInstanceOf(Queen);
  });
  test('Queen cannot move in a line when other piece stands in a way', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Queen(0, 0, 'white');
    gameArea[0][3] = new Queen(0, 3, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '0,7' });
    expect(gameArea[0][0]).toBeInstanceOf(Queen);
    expect(gameArea[0][7]).toBeFalsy();
  });
  test('Queen cannot move in a line when other piece stands in a way', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Queen(0, 0, 'white');
    gameArea[3][3] = new Queen(3, 3, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '7,7' });
    expect(gameArea[0][0]).toBeInstanceOf(Queen);
    expect(gameArea[7][7]).toBeFalsy();
  });
  test('Knight can move, in L shape', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Knight(0, 0, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '2,1' });
    expect(gameArea[2][1]).toBeInstanceOf(Knight);
  });
  test('King can move by one field', () => {
    const { gameArea } = game;
    gameArea[0][0] = new King(0, 0, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '1,1' });
    expect(gameArea[1][1]).toBeInstanceOf(King);
  });
  test('Pawn can move by one field in straight line', () => {
    const { gameArea } = game;
    gameArea[0][6] = new Pawn(0, 6, 'white');
    game.handleSelect({ id: '0,6' });
    game.handleMove({ id: '0,5' });
    expect(gameArea[0][5]).toBeInstanceOf(Pawn);
  });
  test('Pawn cannot move by diagonal', () => {
    const { gameArea } = game;
    gameArea[0][6] = new Pawn(0, 6, 'white');
    game.handleSelect({ id: '0,6' });
    game.handleMove({ id: '1,5' });
    expect(gameArea[0][6]).toBeInstanceOf(Pawn);
    expect(gameArea[1][5]).toBeFalsy();
  });
  test('Pawn can take other pieces by diagonal', () => {
    const { gameArea } = game;
    gameArea[0][6] = new Pawn(0, 6, 'white');
    gameArea[1][5] = new Pawn(1, 5, 'black');
    game.handleSelect({ id: '0,6' });
    game.handleMove({ id: '1,5' });
    expect(gameArea[1][5]).toBeInstanceOf(Pawn);
    expect(gameArea[1][5]).toHaveProperty('side', 'white');
  });
});
