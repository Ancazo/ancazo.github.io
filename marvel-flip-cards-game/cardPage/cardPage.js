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

startTimer()

// Game Logic

let flipCards = document.querySelectorAll('.flip-card')
let flipCardsInner = document.querySelectorAll('.flip-card-inner')

// array for opened cards
let openedCardImageSource = [];
let openedCardSelected = [];

const gameLogic = (event) => {
    
    event.currentTarget.querySelector('div').style.transform = 'rotateY(180deg)';
    openedCardImageSource.push(event.currentTarget.querySelector('.flip-card-back').querySelector('img').src);
    openedCardSelected.push(event.currentTarget);
    noOfClicks +=1
    document.querySelector('#count-number').innerHTML = noOfClicks
    if  ((openedCardImageSource.length === 2) && openedCardImageSource[0]=== openedCardImageSource[1]) {
        alert('Match!')
        for (let x = 2; x >= 0; x--) {
            openedCardSelected.pop()
            openedCardImageSource.pop()
            console.log(openedCardSelected)
        }
    } else if ((openedCardImageSource.length === 2) && openedCardImageSource[0] !== openedCardImageSource[1]) {
        alert('NOT Match!')
        openedCardSelected[0].querySelector('div').style.transform = 'rotateY(360deg)';
        openedCardSelected[1].querySelector('div').style.transform = 'rotateY(360deg)';
        for (let x = 2; x >= 0; x--) {
            openedCardSelected.pop()
            openedCardImageSource.pop()
        }
    }
    
}

for (const flipCard of flipCards) {
    flipCard.addEventListener("click", gameLogic)
}