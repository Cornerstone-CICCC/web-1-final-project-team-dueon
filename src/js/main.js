import { loadLayout } from './components/layout.js';
import { initNavigation } from './components/navigation.js';

async function init() {
  await loadLayout();
  initNavigation();
}

init();
