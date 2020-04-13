class ThemePicker {
  constructor() {
    const pickButtons = [...document.querySelectorAll('#startScreen ul>li')];
    this.handleColorPick = this.handleColorPick.bind(this);
    pickButtons.forEach(node => node.addEventListener('click', this.handleColorPick));
    this.currentColor = 'blue';
  }

  handleColorPick(e) {
    this.currentColor = e.target.dataset.color;
    ['body', '#wrapper', '#game-title', '#board'].forEach(selector => this.changeElementColor(selector));
    [...document.querySelectorAll('.square.light,.square.dark')].map(node => node.classList.add(this.currentColor));
    // console.log('.square.light,.square.light');
    this.pieceSrc();
  }

  changeElementColor(selector, fallback = '') {
    document.querySelector(selector).classList = fallback;
    // 1 zwr. element wewn. dok.
    document.querySelector(selector).classList.add(this.currentColor);
  }
  pieceSrc = () => {
    const pieceClass = [...document.querySelectorAll('img.piece')];
    for (let i = 0; i < pieceClass.length; i++) {
      let currentPieceSrc = pieceClass[i].src;
      let splitted = currentPieceSrc.split('/');
      splitted[6] = this.currentColor;
      console.log(splitted.join('/'));
      const joined = splitted.join('/');
      pieceClass[i].src = joined;
    }
  };
}
export default ThemePicker;
