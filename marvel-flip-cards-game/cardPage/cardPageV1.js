
const pictureArray = [
    '../assets/card-pictures/ironman-landscape.png',
    '../assets/card-pictures/blackpanter.png',
    '../assets/card-pictures/captian-america.jpg',
    '../assets/card-pictures/hawkeye.jpg',
    '../assets/card-pictures/hulk.jpg',
    '../assets/card-pictures/vision.jpg',
    '../assets/card-pictures/thor.png',
    '../assets/card-pictures/black-widow.png'
]

const frontCardPicture = '../assets/marvel-logo.png'


for (let i = 0; i < 16; i++) {
    const cardArea = document.querySelector('#actual-card-space')
    const newCard = document.createElement('div')
    newCard.setAttribute('class','cards')
    // newCard.setAttribute('object-fit', 'cover')
    newCard.setAttribute('id', `card${i}`)
    
    let newCardFront = document.createElement('div')
    // newCardFront.setAttribute('background',`url(${frontCardPicture})`)
    newCardFront.style.backgroundImage = `url('${frontCardPicture}')`
    newCardFront.style.height = '100px'
    newCardFront.style.width = '100px'

    newCard.appendChild(newCardFront)

    newCard.style.minWidth = '20%';
    cardArea.appendChild(newCard)
}