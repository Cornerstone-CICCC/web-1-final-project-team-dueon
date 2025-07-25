export class ContactMethodController {
  constructor() {
    this.radios = Array.from(
      document.querySelectorAll('input[name="contact-method"]')
    );
    this.inputWraps = Array.from(
      document.querySelectorAll('.contact-method__input-wrap')
    );
    this.currentValue = this.getCheckedRadioValue();

    if (this.radios.length && this.inputWraps.length) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.updateUI(this.currentValue);
  }

  bindEvents() {
    this.radios.forEach((radio) =>
      radio.addEventListener('change', (e) => this.handleChange(e))
    );
  }

  handleChange(event) {
    const newValue = event.target.value;
    if (newValue !== this.currentValue) {
      this.currentValue = newValue;
      this.updateUI(newValue);
    }
  }

  updateUI(selectedValue) {
    this.inputWraps.forEach((wrap) => {
      const isActive = wrap.dataset.method === selectedValue;
      wrap.style.display = isActive ? 'flex' : 'none';
      wrap.classList.toggle('fade-in', isActive);
    });
  }

  getCheckedRadioValue() {
    const checked = this.radios.find((radio) => radio.checked);
    return checked ? checked.value : null;
  }
}
