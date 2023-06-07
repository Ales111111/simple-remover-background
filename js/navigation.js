// Burger animation

const iconBurger = document.querySelector('.header__burger')
const menu = document.querySelector('.header__menu')

if(iconBurger) {
    iconBurger.addEventListener('click', function() {
        document.body.classList.toggle('scroll-lock')
        iconBurger.classList.toggle('burger-active')
        menu.classList.toggle('header__menu-active')
    })
}

// Smooth scroll

const menuLinkArray = document.querySelectorAll('.menu__link')

if (menuLinkArray.length > 0) {
    menuLinkArray.forEach((link)=> {
        link.addEventListener('click', function(e) {
            const menuLink = e.target
            if (menuLink.dataset.to && document.querySelector(menuLink.dataset.to)) {
                const toBlock = document.querySelector(menuLink.dataset.to)
                const toBlockValue = toBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight

                if(menu.classList.contains('header__menu-active')) {
                    document.body.classList.remove('scroll-lock')
                    iconBurger.classList.remove('burger-active')
                    menu.classList.remove('header__menu-active')
                }

                window.scrollTo({
                    top: toBlockValue,
                    behavior: "smooth"
                })
            }
            e.preventDefault()
        })
    })
}