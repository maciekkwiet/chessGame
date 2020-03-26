/* eslint-disable */

import Game from '../Game.js';
let game;
beforeAll(() => {
  document.body.innerHTML = `<div id="wrapper"><div id="board"></div></div>`;
  game = new Game();
});

describe('Initial board setup', () => {
  test('Correct number of pieces has been setup', () => {
    expect(game.gameArea.flat().length).toBe(32);
  });

  test('Rooks are in correct place', () => {
    expect(game.gameArea[0][0]).toHaveProperty('name', 'rook');
    expect(game.gameArea[0][7]).toHaveProperty('name', 'rook');
    expect(game.gameArea[7][0]).toHaveProperty('name', 'rook');
    expect(game.gameArea[7][7]).toHaveProperty('name', 'rook');
  });

  test('Knights are in correct place', () => {
    expect(game.gameArea[1][0]).toHaveProperty('name', 'knight');
    expect(game.gameArea[6][0]).toHaveProperty('name', 'knight');
    expect(game.gameArea[1][7]).toHaveProperty('name', 'knight');
    expect(game.gameArea[6][7]).toHaveProperty('name', 'knight');
  });
  test('Bishops are in correct place', () => {
    expect(game.gameArea[2][0]).toHaveProperty('name', 'bishop');
    expect(game.gameArea[5][0]).toHaveProperty('name', 'bishop');
    expect(game.gameArea[2][7]).toHaveProperty('name', 'bishop');
    expect(game.gameArea[5][7]).toHaveProperty('name', 'bishop');
  });
  test('Queens are in correct place', () => {
    expect(game.gameArea[3][0]).toHaveProperty('name', 'queen');
    expect(game.gameArea[3][7]).toHaveProperty('name', 'queen');
  });
  test('Kings are in correct place', () => {
    expect(game.gameArea[4][0]).toHaveProperty('name', 'king');
    expect(game.gameArea[4][7]).toHaveProperty('name', 'king');
  });

  test('Pawns are in correct place', () => {
    for (let i = 0; i < 8; i++) {
      expect(game.gameArea[i][1]).toHaveProperty('name', 'pawn');
      expect(game.gameArea[i][6]).toHaveProperty('name', 'pawn');
    }
  });
});
