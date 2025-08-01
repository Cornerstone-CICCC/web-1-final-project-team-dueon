export class BookingFormController {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (!this.form) return;

    this.emailEnabled = false;
    this.bindEvents();
    this.loadEmailConfig();
  }

  async loadEmailConfig() {
    try {
      const { EMAILJS_CONFIG } = await import('../config.js');
      this.serviceID = EMAILJS_CONFIG.SERVICE_ID;
      this.templateID = EMAILJS_CONFIG.TEMPLATE_ID;
      this.publicKey = EMAILJS_CONFIG.PUBLIC_KEY;

      this.emailEnabled = true;
      this.initEmailJS();
    } catch (e) {
      console.warn(
        'Failed to load config.js: Email functionality is disabled.'
      );
      console.error(e);
    }
  }

  initEmailJS() {
    // eslint-disable-next-line
    emailjs.init(this.publicKey);
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    this.form.querySelectorAll('input[type="tel"]').forEach((input) => {
      input.addEventListener('input', this.handlePhoneInputFormat);
    });
  }

  handlePhoneInputFormat(e) {
    const input = e.target;
    const digits = input.value.replace(/\D/g, '').slice(0, 11);

    let formatted = digits;
    if (digits.length <= 3) {
      formatted = digits;
    } else if (digits.length <= 7) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }

    input.value = formatted;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const validationError = this.validate();
    if (validationError) {
      alert(validationError);
      return;
    }

    if (!this.emailEnabled) {
      alert('Email configuration is missing. Unable to send the message.');
      return;
    }

    const data = this.collectFormData();

    try {
      await this.sendEmail(data);
      alert('Your message has been sent!');
      this.form.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      alert('Failed to send message. Please try again later.');
    }
  }

  validate() {
    const getValue = (selector) =>
      this.form.querySelector(selector)?.value?.trim() || '';

    const isChecked = (selector) =>
      this.form.querySelector(selector)?.checked || false;

    const getSelectedValue = (name) =>
      this.form.querySelector(`input[name="${name}"]:checked`)?.value || '';

    if (getValue('#name') === '') {
      return 'Please enter your name.';
    }

    if (getValue('#event-date') === '' && !isChecked('#date-undecided')) {
      return 'Please select an event date or check "Not decided".';
    }

    if (getValue('#event-time') === '' && !isChecked('#time-undecided')) {
      return 'Please select an event time or check "Not decided".';
    }

    const selectedContactMethod = getSelectedValue('contact-method');
    const contactWrap = this.form.querySelector(
      `.contact-method__input-wrap[data-method="${selectedContactMethod}"]`
    );
    const contactInput = contactWrap?.querySelector(
      'input[type="tel"], input[type="email"]'
    );

    if (!contactInput || contactInput.value.trim() === '') {
      return `Please enter your ${selectedContactMethod.toUpperCase()} contact information.`;
    }

    const contactValue = contactInput.value.trim();

    if (selectedContactMethod === 'email') {
      if (!this.isValidEmail(contactValue)) {
        return 'Please enter a valid email address.';
      }
    } else {
      if (!this.isValidPhoneNumber(contactValue)) {
        return 'Please enter a valid phone number.';
      }
    }

    return null;
  }

  isValidPhoneNumber(number) {
    if (!number) return false;

    const digits = number.replace(/\D/g, '');

    return digits.length >= 8 && digits.length <= 15;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  collectFormData() {
    const getValue = (selector) =>
      this.form.querySelector(selector)?.value?.trim() || '';

    const isChecked = (selector) =>
      this.form.querySelector(selector)?.checked || false;

    const getSelectedValue = (name) =>
      this.form.querySelector(`input[name="${name}"]:checked`)?.value || '';

    const selectedContactMethod = getSelectedValue('contact-method');
    const contactWrap = this.form.querySelector(
      `.contact-method__input-wrap[data-method="${selectedContactMethod}"]`
    );
    const contactInput = contactWrap?.querySelector(
      'input[type="tel"], input[type="email"]'
    );
    const contactCode = contactWrap?.querySelector('select')?.value || '';

    return {
      event_type: getSelectedValue('event-type'),
      event_date: isChecked('#date-undecided')
        ? 'Not decided'
        : getValue('#event-date'),
      event_time: isChecked('#time-undecided')
        ? 'Not decided'
        : getValue('#event-time'),
      name: getValue('#name'),
      contact_method: selectedContactMethod,
      contact_value: `${contactCode} ${contactInput?.value || ''}`.trim()
    };
  }

  sendEmail(data) {
    // eslint-disable-next-line
    return emailjs.send(this.serviceID, this.templateID, data);
  }
}
