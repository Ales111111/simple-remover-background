const btnCloseImage = document.querySelector('#closeDwnlImage')

btnCloseImage.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.download-image').classList.add('hidden')
    document.querySelector('.example').classList.remove('hidden')
})