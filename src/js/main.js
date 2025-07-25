import { ContactMethodController } from './components/contact.js';
import { BookingFormController } from './components/forms.js';
import { loadLayout } from './components/layout.js';
import { initNavigation } from './components/navigation.js';
import { setActiveLinks } from './utils/activeLink.js';

async function init() {
  await loadLayout();
  initNavigation();
  setActiveLinks();

  new ContactMethodController();
  new BookingFormController('#booking-form');
}

init();
