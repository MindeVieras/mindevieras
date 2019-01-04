
// Import styles
import '../sass/main.scss'

// Import Portfolio Class
import Portfolio from './portfolio'
const P = new Portfolio()

// main window events
window.onload = P.init()
window.addEventListener('scroll', () => P.onScroll())
