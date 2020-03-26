/* eslint-disable */

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
  test('Bishop can move in a diagonal', () => {
    const { gameArea } = game;
    gameArea[0][0] = new Bishop(0, 0, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '7,7' });
    expect(gameArea[7][7]).toBeInstanceOf(Bishop);
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
  test('Pawn can move by one field', () => {
    const { gameArea } = game;
    gameArea[0][6] = new Pawn(0, 6, 'white');
    game.handleSelect({ id: '0,6' });
    game.handleMove({ id: '0,5' });
    expect(gameArea[0][5]).toBeInstanceOf(Pawn);
  });
});
