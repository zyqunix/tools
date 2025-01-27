const mist = new Howl({ src: ['mist.mp3'], autoplay: true, loop: true })
const swish = new Howl({ src: ['sound1.mp3'] })

const fadeTime = 1100

async function getImage() {
  let response = await fetch('/getimage')

  try {
    return response.json()
  } catch (e) {
    console.error(e)
  }
}

function createImage(data) {
  const leftPos = Math.floor(Math.random() * (window.innerWidth - 200 + 1)) + 'px'
  const topPos = Math.floor(Math.random() * (window.innerHeight - 200 + 1)) + 'px'
  const newDiv = document.createElement('div')

  newDiv.setAttribute('class', 'image')
  newDiv.style.top = topPos
  newDiv.style.left = leftPos
  newDiv.innerHTML = `<img src="https://files.yyyyyyy.info/images/${data.file}"  width="${data.width}" height="${data.height}">`
  document.body.appendChild(newDiv)

  setTimeout(() => {
    newDiv.classList.add('visible')
    swish.play()
  }, 50)

  return newDiv
}

function removeImage() {
  const oldDiv = document.getElementsByClassName('image')[0]

  oldDiv.classList.remove('visible')
  setTimeout(() => {
    oldDiv.parentNode.removeChild(oldDiv)
  }, fadeTime)
}

async function cycleImage() {
  const image = await getImage()
  
  createImage(image.image[0])
  swish.play()
}

mist.play()
cycleImage()

setInterval(() => {
  setTimeout(() => {
    removeImage()
  }, 100)
  cycleImage()
}, 6000)
