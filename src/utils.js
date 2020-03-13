export const create2DArray = () => {
  const board = new Array(8);
  for (let i = 0; i < 8; i++) {
    board[i] = new Array(8);
  }
  return board;
};

export const parseId = id => [Number(id[0]), Number(id[2])];
