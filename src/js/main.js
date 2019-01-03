
// load all images
function requireAll(r) { r.keys().forEach(r) }
requireAll(require.context('../images/', true))

import WebFont from 'webfontloader'
var scrollToElement = require('scroll-to-element')

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

// Set initial variables
const mainWrapper = document.getElementById('main_wrapper')
const menuLinks = document.querySelectorAll('#main_navigation .menu-link')
const menuArray = [...menuLinks]

function init() {

  // Munu links clicks
  menuArray.map(link => {
    link.addEventListener('click', menuClick)
  })

  // Set #main_wrapper opacity to 1 when js loaded
  mainWrapper.style.opacity = 1
}

// Menu click function
function menuClick(e) {

  e.preventDefault()

  // remove active class
  menuArray.map(link => link.classList.remove('active'))
  // add active class
  this.classList.add('active')
  
  // Scroll to section
  const { section } = this.dataset
  if(section) {
    scrollToElement(`#${section}`, {
      offset: 0,
      duration: 750
    });
  }
}