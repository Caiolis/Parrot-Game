// Global Variables
let cards = 0
const board = document.querySelector('.cards-container')

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
            <div class="card">
                <img src="./assets/img/back.png" alt="back" class="back">
                <img src="./assets/img/cards-possibilities/${availableCards[i]}.gif" alt="back" class="front">
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
}

// Function to shuffle the cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

verify()
populateCards()