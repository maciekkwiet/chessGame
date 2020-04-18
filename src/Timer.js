class Timer {
  constructor(seconds, player, handleEndGame, color) {
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.seconds = seconds;
    this.color = color;
    this.player = player;
    this.handleEndGame = handleEndGame;
    this.timerHandler = document.querySelector('#' + player);
    this.end = document.querySelector('#end');
  }

  start() {
    this.interval = setInterval(() => this.timedown(), 1000);
  }

  pause() {
    clearInterval(this.interval);
  }

  stop() {
    this.pause();
    this.handleEndGame();
    console.log("STOP");
  }

  tie() {
    this.pause();
    this.end.style.display = 'flex';
    this.end.innerHTML = '<div>We have a tie</div>';
  }

  timedown() {
    this.timerHandler.innerHTML = this.convertSeconds(this.seconds);
    if (this.seconds > 0) {
      this.seconds--;
      return this.seconds;
    } else this.stop();
  }

  convertSeconds(s) {
    let min = Math.floor(s / 60);
    let sec = s % 60;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    return min + ':' + sec;
  }
}

export default Timer;
