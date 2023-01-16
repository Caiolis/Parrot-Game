// Global Variables
let timer = 0
let plays = 0
let win = 0
let cards = 0
let temp = null
const board = document.querySelector('.cards-container')
const clock = document.querySelector('.timer span')

const availableCards = [
    'revertitparrot', 
    'metalparrot', 
    'unicornparrot',
    'bobrossparrot',
    'tripletsparrot',
    'fiestaparrot',
    'explodyparrot'
]
const inBoardCards = []
const clickedCards = []

// Ask how many cards the user wants to play and check if that number is valid
function verify() {
    while (cards < 4 || cards > 14 || cards % 2 != 0) {
        cards = prompt("Insert a number between 4 and 14 to play the game (The number has to be even)")
    }
}

// Populate the cards container div with the number of cards that the player wishes to play
function populateCards() {      
    // Create the selection of which card are going to be in game and adds them to a array
    for(i = 0; i < cards / 2; i++) {
        const cardGenerator = `
            <div class="card" onclick="flipCard(this)" data-test="card">
                <img src="./assets/img/back.png" alt="back" class="back" data-test"face-down-image">
                <img src="./assets/img/cards-possibilities/${availableCards[i]}.gif" alt="back" class="hidden" data-test="face-up-image">
            </div>
        `
        for(j = 0; j < 2; j++) {
            inBoardCards.push(cardGenerator)
        }

    }
    shuffleArray(inBoardCards)

    // Add the cards to the board
    for(i = 0; i < cards; i++) {
        board.innerHTML += inBoardCards[i]
    }

    handleTimer()
}

// Function to shuffle the cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Flips the card when clicks
function flipCard(card) {
    card.classList.add('flip')

    if(card.children[1].classList.contains('hidden')) {
        card.children[1].classList.remove('hidden')
        card.children[0].classList.add('hidden')
    }
    
    plays++

    areTheSame(card)
    hasWinner()
}

// Verify if two clicked cards are the same and unflips them if they are not
function areTheSame(card) {

    if(temp == null) {
        card.setAttribute('onclick', " ")
        temp = card
    } else if(temp.innerHTML == card.innerHTML) {
        card.setAttribute('onclick', " ")
        temp = null
        win++        
    } else {
        // Unflip the card if it's not the same as the previous clicked
        setTimeout((clickedCard, clickedTemp) => {
            clickedCard.classList.remove('flip')
            clickedCard.children[1].classList.add('hidden')
            clickedCard.children[0].classList.remove('hidden')
            clickedCard.setAttribute('onclick', "flipCard(this)")

            clickedTemp.classList.remove('flip')
            clickedTemp.children[1].classList.add('hidden')
            clickedTemp.children[0].classList.remove('hidden')
            clickedTemp.setAttribute('onclick', "flipCard(this)")
            temp = null
        }, "1000", card, temp)
        temp = null
    }
}

// Verify if the play has already won or not
function hasWinner() {
    if(win == cards / 2) {
        setTimeout(() => {
            alert(`Você ganhou em ${plays} jogadas! A duração do jogo foi de ${timer} segundos`)
        }, 500)
        setTimeout(playAgain(), 500)
        clearInterval(hourSpan)
    }
}

// Ask if the play wants to play again, if so restarts the game
function playAgain() {
    const play = prompt('Would you like to play again? (Please use sim or não to answer)')
    
    if(play.toLowerCase() == 'sim') {
        location.reload()
    }
}

// Handles the time counting
function handleTimer() {
    hourSpan = setInterval(() => {
        timer++
        clock.innerHTML = timer
    }, 1000)
}

// Running all the functions
verify()
populateCards()
