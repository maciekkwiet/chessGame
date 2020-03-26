/* eslint-disable */

import Game from '../Game.js';
import King from '../pieces/King.js';
import Rook from '../pieces/Rook.js';

let game;

beforeAll(() => {
  document.body.innerHTML = `<div id="wrapper"><div id="board"></div></div>`;
});

beforeEach(() => {
  game = new Game();
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) game.gameArea[i][j] = null;
});

describe('Check logic behaves according to rules', () => {
  test('When king is checked then he is in check', () => {
    const { gameArea } = game;
    gameArea[0][0] = new King(0, 0, 'black');
    gameArea[7][7] = new Rook(7, 7, 'white');
    game.handleSelect({ id: '7,7' });
    game.handleMove({ id: '0,7' });
    // expect(game.isChecked).toBe(true);
  });
  test('King cannot move into check', () => {
    const { gameArea } = game;
    gameArea[0][0] = new King(0, 0, 'black');
    gameArea[0][6] = new Rook(0, 6, 'white');
    game.handleSelect({ id: '0,0' });
    game.handleMove({ id: '0,1' });
    // expect(game.isChecked).toBe(true);
  });
});
