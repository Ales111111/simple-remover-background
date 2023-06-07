const  btnOpen = document.querySelector('#modalShow')
const btnClose = document.querySelector('#closePopup')
const popup = document.querySelector('.popup')
const form = document.querySelector('.popup__form')
const nameInput = document.querySelector('#form-name')
const emailInput = document.querySelector('#form-email')
const errorText = 'Please enter a valid value'
const serverPath = 'https://substantial-striped-fukuiraptor.glitch.me/'


btnOpen.addEventListener('click', () => {
    popup.classList.add('popup-visible')
})


btnClose.addEventListener('click', () => {
    hideModal()
    clearStyle()
    clearInput()
})

popup.addEventListener('click', (e) => {
    if(e.target.closest('.popup__wrapper')) {
        return
    } else {
        hideModal()
        clearStyle()
        clearInput()
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = {
        name: nameInput.value, 
        email: emailInput.value
    }


    if (validateEmail(data.email) && data.name.length > 0) {

        fetch(serverPath + 'requests', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        })

        clearStyle()
        clearInput()
        hideModal()
       
    } else {
        if (!data.name.length > 0) {
            nameInput.classList.add('error-input')
            nameInput.parentNode.querySelector('.error-message').innerText = errorText
        }
        if(!validateEmail(data.email)) {
            emailInput.classList.add('error-input')
            emailInput.parentNode.querySelector('.error-message').innerText = errorText
        }
    }
})


function hideModal() {
    popup.classList.remove('popup-visible')
}


function validateEmail(email) {
    const pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    return pattern.test(email)
}

function clearStyle() {
    emailInput.classList.remove('error-input')
    nameInput.classList.remove('error-input')
    document.querySelectorAll('.error-message').forEach((err) => {
        err.innerText = ''
    })
}

function clearInput() {
    emailInput.value = ''
    nameInput.value = ''
}





