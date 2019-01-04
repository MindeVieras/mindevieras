

import WebFont from 'webfontloader'
import scrollToElement from 'scroll-to-element'

export default class Portfolio {

  constructor() {

    // Set initial variables
    this.mainWrapper = document.getElementById('main_wrapper')
    this.menuList = document.getElementById('main_navigation')
    this.menuItems = this.menuList.querySelectorAll('.menu-link')
    this.sections = document.querySelectorAll('#main_content .main-section')
    this.scrollOffset = window.innerHeight / 2
    
    // Munu clicks
    this.menuItems.forEach(link => {
      link.addEventListener('click', this.menuClick)
    })

    // this.menuClick = this.menuClick.bind(this)
  }

  init() {
    this.loadFonts()
    this.setInitialOpacity()
    this.onScroll()
  }

  // Load fonts
  loadFonts() {
    WebFont.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900']
      }
    })
  }

  // Set #main_wrapper opacity to 1 when js loaded
  setInitialOpacity() {
    this.mainWrapper.style.opacity = 1
  }
  
  // on menu click scroll to section
  menuClick(e) {

    e.preventDefault()
    
    const href = this.getAttribute('href')
    if(href) {
      scrollToElement(href, {
        offset: 0,
        duration: 750
      })
    }
  }

  // window scroll event handler
  onScroll() {
    this.sections.forEach(section => {
      const currentPosition = document.documentElement.scrollTop || document.body.scrollTop
      const isInView = section.offsetTop <= currentPosition + this.scrollOffset
      if (isInView) {
        const menuItemID = section.getAttribute('id')
        const activeItem = this.menuList.querySelector(`[href="#${menuItemID}"]`)
        if (!activeItem) {
          return
        }

        this.removeCurrentActive()
        this.setActive(activeItem)
      }
    })
  }

  // set menu active menu item
  setActive(activeItem) {
    activeItem.classList.add('active')
  }

  // remove active menu class
  removeCurrentActive() {
    this.menuItems.forEach(item => {
      item.classList.remove('active')
    })
  }
}
