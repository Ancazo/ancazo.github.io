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
const flipCards = document.querySelectorAll('.cards')

let noOfPairedCardsOpen = 0;
let selectedCard;
const selectedCardSources = [];

//click counter
let clickCounter = 0

//timer
let second = 0
const timer = document.querySelector("#timer-counter");
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
const onClick = (event) => {
    const currentCard = event.currentTarget;
    currentCard.style.transform = 'rotateY(180deg)';
    const selectedSource = currentCard.innerHTML;
    
    if(!selectedCard){
        selectedCard = currentCard
        clickCounter += 1;
        selectedCardSources.push(selectedSource)
    } else if (currentCard.id === selectedCard.id) {
        return
    } else {
        if (!selectedCardSources.includes(selectedSource)) {
            selectedCardSources.pop();
            setTimeout(() => {
                currentCard.style.transform = 'rotateY(360deg)';
                selectedCard.style.transform = 'rotateY(360deg)';
            }, 1000);
        }
        setTimeout(() => {
            selectedCard = undefined;
        }, 1000);
        clickCounter += 1;
        checkWinningCondition()
    }
    document.querySelector('#click-counter').innerHTML = clickCounter
}

for (const flipCard of flipCards) {
    flipCard.addEventListener("click", onClick)
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
const checkWinningCondition = () => {
    if (localStorage.getItem('gameModeSelected') === 'gameMode2' && selectedCardSources.length === 8) {
        displayWinningMessage()
    } else if( localStorage.getItem('gameModeSelected') === 'gameMode1' && selectedCardSources.length === 6) {
        displayWinningMessage()
    }
}


//reset the game
const reload = () => {
    location.reload()
}

document.querySelector('#reset').addEventListener('click', reload)

//quit the game
const quit = () => {
    window.location='../firstPage/firstPageV1.html'
}

document.querySelector('#stop').addEventListener('click', quit)


// $.ajax ({
//     url:"https://gateway.marvel.com/v1/public/characters",
//     method:"GET",
//     ts: '1'
//     apikey: '488d84cd14d1c4f5742f1171be6ec22b'
//     hash: 'edd27ff0be3d3925d5fba3acf3b0f75b'
//     headers: {
//     },
//     success: function(response) {
//     },
//     error: function (err) {
//     }
// })