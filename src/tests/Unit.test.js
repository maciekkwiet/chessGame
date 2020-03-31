import Game from '../Game';
import Pawn from '../pieces/Pawn';
import Rook from '../pieces/Rook';
import Bishop from '../pieces/Bishop';
import Queen from '../pieces/Queen';
import King from '../pieces/King';
import Knight from '../pieces/Knight';

let game;

beforeAll(() => {
  document.body.innerHTML = `<div id="wrapper"><div id="board"></div></div>`;
});

beforeEach(() => {
  game = new Game();
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) game.gameArea[i][j] = null;
});

describe('Piece.findLegalMoves returns correct moves', () => {
  test('White pawn can move up', () => {
    const piece = new Pawn(0, 2, 'white');
    const moves = piece.findLegalMoves(game.gameArea);
    expect(moves).toIncludeAllMembers(['0,1']);
  });
  test('Black pawn can move down', () => {
    const piece = new Pawn(0, 2, 'black');
    const moves = piece.findLegalMoves(game.gameArea);
    expect(moves).toIncludeAllMembers(['0,3']);
  });
  test('Rook can move in line ', () => {
    const piece = new Rook(0, 0, 'black');
    const moves = piece.findLegalMoves(game.gameArea);
    expect(moves).toIncludeAllMembers([
      '0,1',
      '0,2',
      '0,3',
      '0,4',
      '0,5',
      '0,6',
      '0,7',
      '1,0',
      '2,0',
      '3,0',
      '4,0',
      '5,0',
      '6,0',
      '7,0',
    ]);
  });
  test('Bishop can move in diagonal ', () => {
    const piece = new Bishop(0, 0, 'black');
    const moves = piece.findLegalMoves(game.gameArea);
    expect(moves).toIncludeAllMembers(['1,1', '2,2', '3,3', '4,4', '5,5', '6,6', '7,7']);
  });
  test('Queen can move in line and in diagonal', () => {
    const piece = new Queen(0, 0, 'black');
    const moves = piece.findLegalMoves(game.gameArea);
    expect(moves).toIncludeAllMembers([
      '1,1',
      '2,2',
      '3,3',
      '4,4',
      '5,5',
      '6,6',
      '7,7',
      '0,1',
      '0,2',
      '0,3',
      '0,4',
      '0,5',
      '0,6',
      '0,7',
      '1,0',
      '2,0',
      '3,0',
      '4,0',
      '5,0',
      '6,0',
      '7,0',
    ]);
  });
  test('King can move by one square', () => {
    const piece = new King(0, 0, 'black');
    const moves = piece.findLegalMoves(game.gameArea);
    expect(moves).toIncludeAllMembers(['1,0', '1,1', '0,1']);
  });
  test('Knight can move by in L', () => {
    const piece = new Knight(0, 0, 'black');
    const moves = piece.findLegalMoves(game.gameArea);
    expect(moves).toIncludeAllMembers(['1,2', '2,1']);
  });
});
