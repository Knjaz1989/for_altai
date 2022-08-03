// import 'babel-polyfill'
import '../css/app.scss'
import './order-form/order-form'
import './lang-dropdown/lang-dropdown'


const menuBurger=document.querySelector('.header__burger_icon')

const menuBurgerClose=document.querySelector('.header__burger_close')
const menuBurgerLinks=document.querySelector('.header__burger_menu')

const menuBurgerActive=document.querySelector('.header__burger')


/* menuBurger.addEventListener('click', function(e){
    document.body.classList.toggle("lock")
    menuBurgerActive.classList.toggle('active')
})
menuBurgerLinks.addEventListener('click', function(e){
    document.body.classList.toggle("lock")
    menuBurgerActive.classList.toggle('active')
}) */

menuBurgerClose.onclick=()=>toggleBurger()
menuBurger.onclick=()=>toggleBurger()
menuBurgerLinks.onclick=()=>toggleBurger()

function toggleBurger(){
           document.body.classList.toggle("lock")
        menuBurgerActive.classList.toggle('active')

}
