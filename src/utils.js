export const create2DArray = () => {
  const board = new Array(8);
  for (let i = 0; i < 8; i++) {
    board[i] = new Array(8);
  }
  return board;
};

export const parseId = id => [Number(id[0]), Number(id[2])];

export const handleOverlay = () =>
  document.getElementById('play').addEventListener('click', function() {
    document.getElementById('startScreen').style.animationPlayState = 'paused';
    document.getElementById('startScreen').style.opacity = '0';
    document.getElementById('startScreen').style.transition = 'opacity 0.3s linear';
    const isFinished = document.getElementById('startScreen').style.transition;
    console.log(isFinished);
    if (isFinished === 'opacity 0.3s linear 0s') {
      document.getElementById('startScreen').style.display = 'none';
    }
  });
