
import WebFont from 'webfontloader'

// Import styles
import './sass/main.scss'

const mainWrapper = document.getElementById('main_wrapper')

// Load fonts
WebFont.load({
  google: {
    families: ['Roboto', 'Dosis']
  },
  active: () => {
    // Once fonts are loaded, run the rest
    init()
  }
});

function init() {
  // Set #main_wrapper opacity to 1 when js loaded
  mainWrapper.style.opacity = 1
}
