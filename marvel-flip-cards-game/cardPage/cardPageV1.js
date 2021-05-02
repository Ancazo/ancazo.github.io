let pictureArray = [
    '../assets/card-pictures/ironman-landscape.png',
    '../assets/card-pictures/blackpanter.png',
    '../assets/card-pictures/captian-america.jpg',
    '../assets/card-pictures/hawkeye.jpg',
    '../assets/card-pictures/hulk.jpg',
    '../assets/card-pictures/vision.jpg',
    '../assets/card-pictures/thor.png',
    '../assets/card-pictures/black-widow.png'
]


//front card picture
const frontCardPicture = '../assets/marvel-logo.png'

//test local storage
console.log(localStorage.getItem('gameModeSelected'))

//decide is 12 or 16 cards
let noOfCards = 16

if (localStorage.getItem('gameModeSelected') === 'gameMode1' ) {
    noOfCards = 12;
    //reduce array size to 6
    pictureArray = pictureArray.slice(2)
}

//double length of array
const doublePictureArray = pictureArray.concat(pictureArray)

//random the pictures in array
doublePictureArray.sort(()=>Math.random()-0.5)
console.log(doublePictureArray)

for (let i = 0; i < noOfCards; i++) {
    const cardArea = document.querySelector('#actual-card-space')
    const newCard = document.createElement('div')
    newCard.setAttribute('class','cards')
    newCard.setAttribute('id', `card${i}`)
    newCard.style.justifyContent = 'center'
    
    let newCardFront = document.createElement('div')
    newCardFront.setAttribute('class','cardFront')
    newCardFront.style.backgroundImage = `url('${frontCardPicture}')`
    newCard.appendChild(newCardFront)

    let newCardBack = document.createElement('div')
    newCardBack.setAttribute('class','cardBack')
    newCardBack.style.backgroundImage = `url('${doublePictureArray[i]}')`
    newCard.appendChild(newCardBack)

    newCard.style.minWidth = '20%';
    cardArea.appendChild(newCard)
}

//Game Logic
let flipCards = document.querySelectorAll('.cards')

// array for opened cards
let openedCardId = [];
let openedCardSelected = [];
let noOfPairedCardsOpen = 0

//click counter
let clickCounter = 0

//timer
let second = 0
let timer = document.querySelector("#timer-counter");
let interval;
const startTimer = () => {
    interval = setInterval(function(){
        timer.innerHTML = second;
        second++;
    },1000);
}

//start the timer
startTimer()


//game logic function
const gameLogic = (event) => {
    clickCounter += 1
    document.querySelector('#click-counter').innerHTML = clickCounter

    let frontToBack = event.currentTarget
    let backToFront = event.currentTarget.querySelector('.cardBack')
    console.log(frontToBack.querySelector('.cardBack'))

    openedCardSelected.push(event.currentTarget.innerHTML)
    openedCardId.push(event.currentTarget)

    frontToBack.style.transform = 'rotateY(180deg)'
    frontToBack.style.transition = '1s'
    frontToBack.style.transformStyle = 'preserve-3d';

    backToFront.style.transform = 'rotateY(180deg)'
    backToFront.style.transformStyle = 'preserve-3d';
    backToFront.style.transition = '1s'


    if (openedCardSelected[0] === openedCardSelected[1]) {
        noOfPairedCardsOpen += 1
        winningCondition()
        for (let i = 2; i >= 0; i--) {
            openedCardSelected.pop()
            openedCardId.pop()
        }
    } else if ((openedCardSelected.length === 2) && openedCardSelected[0] !== openedCardSelected[1]) {
        openedCardId[0].style.transform = 'rotateY(360deg)'
        openedCardId[1].style.transform = 'rotateY(360deg)'
        openedCardId[0].querySelector('.cardBack').style.transform = 'rotateY(180deg)'
        openedCardId[1].querySelector('.cardBack').style.transform = 'rotateY(180deg)'

        

        for (let i = 2; i >= 0; i--) {
            openedCardSelected.pop()
            openedCardId.pop()
        }
    }
    // console.log(openedCardSelected)
    console.log(openedCardId)
    // console.log(noOfPairedCardsOpen)

}

for (const flipCard of flipCards) {
    flipCard.addEventListener("click", gameLogic)
}


const displayWinningMessage = () => {

    let newDivGameOver = document.createElement('div')
    newDivGameOver.setAttribute('id', 'game-over')
    document.querySelector('body').appendChild(newDivGameOver)
    
    let newDivGameOverlayer = document.createElement('div')
    newDivGameOverlayer.setAttribute('id', 'transparent-layer')
    newDivGameOver.appendChild(newDivGameOverlayer)

    let newDivGameOverMessage = document.createElement('div')
    newDivGameOverMessage.setAttribute('id', 'game-over-message')
    newDivGameOver.appendChild(newDivGameOverMessage)
    
    let newDivGameOverPicture = document.createElement('img')
    newDivGameOverPicture.setAttribute('id', 'winning-picture')
    newDivGameOverPicture.setAttribute('src', '../assets/win.png')
    newDivGameOverPicture.setAttribute('alt', 'win')
    newDivGameOverMessage.appendChild(newDivGameOverPicture)

    let newDivGameOverWinningMessage = document.createElement('div')
    newDivGameOverWinningMessage.setAttribute('id', 'message-box')
    newDivGameOverMessage.appendChild(newDivGameOverWinningMessage)
    
    let congratulations = document.createElement('h1')
    congratulations.innerHTML ='Congratulations'
    newDivGameOverWinningMessage.appendChild(congratulations)
    
    let winningMessage = document.createElement('p')
    winningMessage.innerHTML ='You had completed the game!'
    newDivGameOverWinningMessage.appendChild(winningMessage)
    
    let finalCount = document.createElement('h4')
    finalCount.innerHTML =`Count: ${clickCounter}`
    newDivGameOverWinningMessage.appendChild(finalCount)
    
    let finaltimer = document.createElement('h4')
    finaltimer.innerHTML =`Timer: ${second}`
    newDivGameOverWinningMessage.appendChild(finaltimer)
    
    let homeButton = document.createElement('button')
    homeButton.setAttribute('type', 'button')
    homeButton.setAttribute('id', 'home-button')
    homeButton.style.background = '#fe9a20'
    homeButton.innerHTML = 'Home'
    newDivGameOverWinningMessage.appendChild(homeButton)
    
    const backToHome = () => {
        window.location='../firstPage/firstPageV1.html'
    }
    
    document.querySelector('#home-button').addEventListener('click', backToHome)
}

//winning condition checker
const winningCondition = () => {
    if (localStorage.getItem('gameModeSelected') === 'gameMode2' && noOfPairedCardsOpen === 8) {
        displayWinningMessage()
    } else if( localStorage.getItem('gameModeSelected') === 'gameMode1' && noOfPairedCardsOpen === 6) {
        displayWinningMessage()
    }
}