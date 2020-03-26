/* eslint-disable */

document.body.innerHTML = `<div id="wrapper"><div id="board"></div></div>`;

import Game from '../Game.js';
const game = new Game();

test('Correct number of pieces has been setup', () => {
  expect(game.gameArea.flat().length).toBe(32);
});

test('Rooks are in correct place', () => {
  expect(game.gameArea[0][0]).toBe();
});
