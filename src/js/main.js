import { ContactMethodController } from './components/contact.js';
import { loadLayout } from './components/layout.js';
import { initNavigation } from './components/navigation.js';
import { setActiveLinks } from './utils/activeLink.js';

async function init() {
  await loadLayout();
  initNavigation();
  setActiveLinks();

  new ContactMethodController();
}

init();
