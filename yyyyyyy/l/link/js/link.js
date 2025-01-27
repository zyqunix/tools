const imageAmount = 50
const animationSpeed = 250
const bg = new Howl({
  src: ['websdr_recording_2015-06-23T17-09-53Z_433.5kHz.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.5
})
const magic = new Howl({ src: ['magic-welcome-before.mp3'] })
const open = new Howl({ src: ['swing-knock.mp3'], volume: 0.5 })
const container = document.getElementById('container')

async function fetchImages (amount) {
  let response = await fetch(`/loadimage/${amount}`)
  if (response.status == 200) {
    return response.json()
  } else {
    throw new HttpError(response)
  }
}

function createImage (id, data) {
  let newDiv = document.createElement('div')
  newDiv.setAttribute('id', id)
  newDiv.setAttribute('class', 'image')
  newDiv.innerHTML = `<img src="https://files.yyyyyyy.info/${data.key}">`
  container.appendChild(newDiv)

  return newDiv
}

function growImage (div) {
  try {
    div.classList.add('grow')
    return div
  } catch (error) {
    return null
  }
}

function resetImage (div) {
  try {
    div.classList.remove('grow')
    return div
  } catch (error) {
    return null
  }
}

async function cycleImages () {
  const images = await fetchImages(imageAmount)

  magic.play()

  images.forEach((image, index) => {
    createImage(index, image)
  })

  const imageCount = Array.from(Array(images.length).keys())
  let shiftedImageCount = imageCount.splice(images.length - 20, images.length)
  shiftedImageCount = shiftedImageCount.concat(imageCount)

  let i = 0
  let z = 1

  setInterval(() => {
    i == images.length - 1 ? (i = 0) : i++
    z++

    let currentDiv = document.getElementById(i)
    let previousDiv = document.getElementById(shiftedImageCount[i])

    currentDiv.style.zIndex = z

    open.play()
    growImage(currentDiv)
    resetImage(previousDiv)
  }, animationSpeed)
}

bg.play()
cycleImages()
