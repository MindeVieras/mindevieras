
// load all images
function requireAll(r) { r.keys().forEach(r) }
requireAll(require.context('../images/', true))

import WebFont from 'webfontloader'

// Import styles
import '../sass/main.scss'

// Load fonts
WebFont.load({
  google: {
    families: ['Roboto:100,300,400,500,700,900']
  },
  active: () => {
    // Once fonts are loaded, run the rest
    init()
  }
});

function init() {

  const mainWrapper = document.getElementById('main_wrapper')

  // Set #main_wrapper opacity to 1 when js loaded
  mainWrapper.style.opacity = 1
}
