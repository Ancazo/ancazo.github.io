/* Timer */
let second = 0
let timer = document.querySelector("#timer-number");
let interval;
const startTimer = () => {
    interval = setInterval(function(){
        timer.innerHTML = second;
        second++;
    },1000);
}

// click counter
let noOfClicks = 0

//start the timer
startTimer()



//picture array for 4 x 4
const pictureArrayFourXFour = [
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



const createCardsFourXFour = () => {

    // for (let i = 0; i < 8; i++) {
        // console.log('test')
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        // console.log(card)
        document.querySelector('#card-box').appendChild(card)
        
        // let flipCard = document.createElement('div')
        // flipCard.attributes('class', 'flip-card')
        // card.appendChild(flipCard)
        
        // let flipCardInner = document.createElement('div')
        // flipCardInner.attributes('class', 'flip-card-inner')
        // flipCard.appendChild(flipCardInner)
        
        // let flipCardFront = document.createElement('div')
        // flipCardFront.attributes('class', 'flip-card-front')
        // flipCardInner.appendChild(flipCardFront)
        
        // let flipCardFrontImage = document.createElement('img')
        // flipCardFrontImage.attributes('class', 'card-image')
        // flipCardFrontImage.attributes('src', frontCardPicture)
        // flipCardFrontImage.attributes('alt', 'card-front')
        // flipCardFront.appendChild(flipCardFrontImage)
        
        // let flipCardBack = document.createElement('div')
        // flipCardBack.attributes('class', 'flip-card-back')
        // flipCardInner.appendChild(flipCardBack)
        
        // let flipCardBackImage = document.createElement('img')
        // flipCardBackImage.attributes('class', 'card-image')
        // flipCardBackImage.attributes('src', pictureArrayFourXFour[0])
        // flipCardBackImage.attributes('alt', 'card-back')
        // flipCardFront.appendChild(flipCardBackImage)
    // }
}

// createCardsFourXFour()


// Game Logic
let flipCards = document.querySelectorAll('.card')

// array for opened cards
let openedCardImageSource = [];
let openedCardSelected = [];
let noOfPairedCardsOpen = 0

const gameLogic = (event) => {
    
    event.currentTarget.querySelector('div').style.transform = 'rotateY(180deg)';
    openedCardImageSource.push(event.currentTarget.querySelector('.flip-card-back').querySelector('img').src);
    openedCardSelected.push(event.currentTarget);
    noOfClicks +=1
    document.querySelector('#count-number').innerHTML = noOfClicks
    if  ((openedCardImageSource.length === 2) && openedCardImageSource[0] === openedCardImageSource[1]) {
        // alert('Match!')
        noOfPairedCardsOpen += 1
        winningCondition()
        console.log(noOfPairedCardsOpen)
        for (let x = 2; x >= 0; x--) {
            openedCardSelected.pop()
            openedCardImageSource.pop()
            console.log(openedCardSelected)
        }
    } else if ((openedCardImageSource.length === 2) && openedCardImageSource[0] !== openedCardImageSource[1]) {
        // alert('NOT Match!')
        openedCardSelected[0].querySelector('div').style.transform = 'rotateY(360deg)';
        openedCardSelected[1].querySelector('div').style.transform = 'rotateY(360deg)';
        for (let x = 2; x >= 0; x--) {
            openedCardSelected.pop()
            openedCardImageSource.pop()
        }
    }
}

const winningCondition = () => {
    if (noOfPairedCardsOpen === 8) {
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
        congratulations.innerHTML ='congratulations'
        newDivGameOverWinningMessage.appendChild(congratulations)

        let winningMessage = document.createElement('p')
        winningMessage.innerHTML ='You had completed the game!'
        newDivGameOverWinningMessage.appendChild(winningMessage)

        let finalCount = document.createElement('h4')
        finalCount.innerHTML =`Count: ${noOfClicks}`
        newDivGameOverWinningMessage.appendChild(finalCount)

        let finaltimer = document.createElement('h4')
        finaltimer.innerHTML =`Timer: ${second}`
        newDivGameOverWinningMessage.appendChild(finaltimer)

        let homeButton = document.createElement('button')
        homeButton.setAttribute('type', 'button')
        homeButton.setAttribute('id', 'home-button')
        homeButton.setAttribute('class', 'btn btn-outline-dark')
        homeButton.innerHTML = 'Home'
        newDivGameOverWinningMessage.appendChild(homeButton)

        const backToHome = () => {
            window.location='../firstPage/firstPage.html'
        }
        
        document.querySelector('#home-button').addEventListener('click', backToHome)
    }
}


for (const flipCard of flipCards) {
    flipCard.addEventListener("click", gameLogic)
}