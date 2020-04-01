export const create2DArray = () => {
  const board = new Array(8);
  for (let i = 0; i < 8; i++) {
    board[i] = new Array(8);
  }
  return board;
};

export const copy2DArray = arr => {
  const arrCopy = [];
  for (let i = 0; i < arr.length; i++) {
    arrCopy[i] = [...arr[i]];
  }
  return arrCopy;
};

export const iterateOver2DArray = (callback, arr) => {
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[0].length; y++) {
      callback(arr[x][y], x, y);
    }
  }
};

export const parseId = id => [Number(id[0]), Number(id[2])];

export const handleOverlay = () =>
  document.getElementById('play').addEventListener('click', function() {
    document.getElementById('startScreen').style.animationPlayState = 'running';
  });
