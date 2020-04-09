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
    [...document.querySelectorAll('.square.light')].map(node => (node.classList.add(this.currentColor)).changeElementColor);
    

    this.currentColor = e.target.dataset.color;
    ['body', '#wrapper', '#game-title', '#board'].forEach(selector => this.changeElementColor(selector));
    [...document.querySelectorAll('.square.dark')].map(node => (node.classList.add(this.currentColor)).changeElementColor);

  }

  

  changeElementColor(selector, fallback = '') {
    document.querySelector(selector).classList = fallback;
    // 1 zwr. element wewn. dok. 
    document.querySelector(selector).classList.add(this.currentColor);
  }
}
export default ThemePicker;
