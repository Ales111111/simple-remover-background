const input = document.querySelector('#uploadFile')
const img = document.querySelector('#dwnl-img')
const btnBefore = document.querySelector('#orig')
const btnAfter = document.querySelector('#removed')
const uploadLabel = document.querySelector('#uploadLabel')
const exampleBtn = document.querySelectorAll('.example-img')


input.addEventListener('change', async function () {

    if(this.files[0]) {

    const toBlock = document.querySelector('.upload')

    window.scrollTo({
        top: toBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight,
        behavior: "smooth"
    })   

    // Get upload image

    const beforeImage = this.files[0]
    const beforeImageSRC = URL.createObjectURL(beforeImage)

    const afterImageSRC = await sendImage(beforeImage)

    img.src = afterImageSRC

    downImage(beforeImageSRC, afterImageSRC)

    }
})

exampleBtn.forEach(btn => {
    btn.addEventListener('click', async (e) => {

        let beforeImage

        const beforeImageSRC = e.target.src

        await toDataURL(beforeImageSRC)
        .then(dataUrl => {
        var fileData = dataURLtoFile(dataUrl, "imageName.jpg")
        beforeImage = fileData
        })

        const afterImageSRC = await sendImage(beforeImage)

        img.src = afterImageSRC

        downImage(beforeImageSRC, afterImageSRC)
    })
})

async function sendImage(beforeImage) {

    // Display change

    document.querySelector('.example').classList.add('hidden')

    input.setAttribute("disabled", "disabled")
    uploadLabel.innerText = 'Loading...'
    uploadLabel.classList.add('disabled')


    // API

    const formData = new FormData();
    formData.append("image_file", beforeImage);

    const response = await fetch("https://clipdrop-api.co/remove-background/v1", {
        method: "POST",
        headers: {
            "x-api-key":
            "9bdf9ba5c25a66e89a68221e607ca5900eedee407ddf41a9c30b26ea1a63f0306e93f6d13f71f37c925c741fe6f845c5"
        },
        body: formData
    })

    const outputBlob = await response.blob()

    const afterImageSRC = URL.createObjectURL(outputBlob)

    return afterImageSRC
}

function downImage(beforeImageSRC, afterImageSRC) {

    // Show section download image
    document.querySelector('.download-image').classList.remove('hidden')

    input.removeAttribute("disabled")
    uploadLabel.innerText = 'Upload image'
    uploadLabel.classList.remove('disabled')

    btnBefore.addEventListener('click', () => {
        img.src = beforeImageSRC
        btnAfter.classList.remove('dwnl-text-active')
        btnBefore.classList.add('dwnl-text-active')
    })

    btnAfter.addEventListener('click', () => {
        img.src = afterImageSRC
        btnBefore.classList.remove('dwnl-text-active')
        btnAfter.classList.add('dwnl-text-active')
    })

    // Download image

    const getImg = document.createElement("a")
    const downBtn = document.querySelector("#downBtn")

    downBtn.appendChild(getImg)

    getImg.href = img.src
    getImg.style.display = "none";
    getImg.download = "theremover-image";

    downBtn.addEventListener('click', () => {
        document.body.appendChild(getImg)
        getImg.click()
        document.body.removeChild(getImg)
    })
}

const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}))

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
    u8arr[n] = bstr.charCodeAt(n);
    }
  return new File([u8arr], filename, {type:mime});
}