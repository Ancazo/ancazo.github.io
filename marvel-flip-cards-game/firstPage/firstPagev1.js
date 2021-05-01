const startTheGame = () => {
    window.location='../cardPage/cardPageV1.html'
}

document.querySelector('#start-button').addEventListener('click',startTheGame)


// #e95146 === rgb(233, 81, 70)   dark orange
// #fe9a20 rgba(168,1,8,255) orange
const gameModes = ['gameMode1','gameMode2'];

let gameModeSelected ;

const gameModeSelect = (event) => {
    gameModeSelected = event.currentTarget.id
    event.currentTarget.style.background = '#e95146';
    const otherGameModes = gameModes.filter(item=> item!==event.currentTarget.id);
    for (let i of otherGameModes ) {
        let gameMode = document.querySelector(`#${i}`)
        gameMode.style.background = '#fe9a20';
    }
    
    //store game mode in local storage
    localStorage.setItem('gameModeSelected',gameModeSelected)
}

const gameModeButtons = document.querySelectorAll('.game-mode');

for ( let button of gameModeButtons) {
    button.addEventListener('click',gameModeSelect);
}

const startButton = document.querySelector('#start-button');

const checkIfCanStart = (e) => {
    if (gameModeSelected !==undefined && document.querySelector('#name-input').value !=='') {
        startButton.disabled = false;
        startButton.style.background = '#a80108'
        startButton.onmouseover = function () {
        startButton.style.background = '#f3f2c4'
        } 
    }
}

// document.querySelector('#name-input').addEventListener('change',checkIfCanStart)
document.querySelector('#name-input').oninput = checkIfCanStart