class ThemePicker {
  constructor() {
    const pickButtons = [...document.querySelectorAll('#startScreen ul>li')];
    this.handleColorPick = this.handleColorPick.bind(this);
    pickButtons.forEach(node => node.addEventListener('click', this.handleColorPick));
    this.currentColor = 'blue';
  }

  handleColorPick(e) {
    this.currentColor = e.target.dataset.color;
    ['body', '#wrapper', '#game-title', '#board', '#clock-bg', '#table-bg '].forEach(selector =>
      this.changeElementColor(selector),
    );
    [...document.querySelectorAll('.square.light,.square.dark')].map(node => {
      node.classList.remove('blue', 'pink', 'green', 'purple');
      node.classList.add(this.currentColor);
    });
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
      const imgPosition = splitted.indexOf('img');
      splitted[imgPosition + 1] = this.currentColor;
      const joined = splitted.join('/');
      pieceClass[i].src = joined;
    }
  };
}
export default ThemePicker;
