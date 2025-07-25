import { ContactMethodController } from './components/contact.js';
import { BookingFormController } from './components/forms.js';
import { LayoutLoader } from './components/layout.js';
import { NavigationController } from './components/navigation.js';
import { ActiveLinkController } from './utils/activeLink.js';

async function init() {
  const layoutLoader = new LayoutLoader();
  await layoutLoader.loadLayout();
  new NavigationController();
  new ActiveLinkController();
  new ContactMethodController();
  new BookingFormController('#booking-form');
}

init();
