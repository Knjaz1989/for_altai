window.addEventListener('load', () => {
  const targetLangDD = new LangDropdown('targetLangDD');
  const originalLangDD = new LangDropdown('originalLangDD');

  targetLangDD.init();
  originalLangDD.init();
})

class LangDropdown {
  constructor(id) {
    this.html = document.getElementById(id);
    this.select = this.html.querySelector('.lang-dropdown__select');
    this.controls = this.html.querySelector('.lang-dropdown__controls');
  }

  init() {
    // Add caption renewal on select change
    this.select.addEventListener('change', (e) => {
      this.controls.innerText = e.target.value;
    });

    // Add toggling to option, for the same choice toggling
    this.select.addEventListener('click', (e) => {
      if (e.target.tagName === 'OPTION') {
        this.select.classList.toggle('lang-dropdown__hidden');
      }
    })

    // Add toggle to controls
    this.controls.addEventListener('click', (e) => {
      this.select.classList.toggle('lang-dropdown__hidden');
      this.select.focus();
    });
  }
}
