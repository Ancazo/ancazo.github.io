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

startTimer()

// Game Logic

let flipCards = document.querySelectorAll('.flip-card')
let flipCardsInner = document.querySelectorAll('.flip-card-inner')

// array for opened cards
let openedCards = [];

const myScript = (event) => {

    // console.log(event)
    
    event.currentTarget.querySelector('div').style.transform = 'rotateY(180deg)';
    openedCards.push(event.currentTarget.querySelector('.flip-card-back').querySelector('img').src);
    if  ((openedCards.length === 2) && openedCards[0]=== openedCards[1]) {
        alert('Match!')
    } else if ((openedCards.length === 2) && openedCards[0] !== openedCards[1]) {
        alert('NOT Match!')
        event.currentTarget.querySelector('div').style.transform = 'rotateY(360deg)';
    }
}

for (const flipCard of flipCards) {
    flipCard.addEventListener("click", myScript)
}