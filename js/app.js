const t0=performance.now();

/*
 * Create a list that holds all of your cards
 */

 const cardsArray =  ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'anchor', 'leaf', 'bicycle', 'diamond', 'bomb', 'leaf', 'bomb', 'bolt', 'bicycle', 'paper-plane-o', 'cube'];
 let cardsOpenArray = [];
 let cardsMatchArray = [];

 let cardsMatchNumber = 7; // 0 is a position


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
    
}


function suffleCards(array) {

    const deck = document.querySelector(".deck");
    const deckCards = document.querySelectorAll(".card");
    for (const deckCard of deckCards) {
        deckCard.remove();
    }

    const fragment = document.createDocumentFragment();

    for ( item of array) {       
        const newCard = document.createElement('li');
        newCard.className = "card";
        const newIcon = document.createElement('i'); 
        newIcon.className =" fa fa-" + item;      
        newCard.appendChild(newIcon); 
        fragment.appendChild(newCard);      
    }
        
    deck.appendChild(fragment);
      
}

//Restart Button
const restart = document.getElementById("restart");
restart.addEventListener("click", function(){
    const modal = document.querySelector(".modal-content");
    modal.classList.toggle("hide", true);
    modal.classList.toggle("show", false);
    movements = 0; 
    shuffle(cardsArray);
    suffleCards(cardsArray); 
    eventCards();
    cardsMatchArray.splice(0, cardsMatchNumber+1);
    
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function cardClean() {
    const deckCards = document.querySelectorAll(".card");
    for (const deckCard of deckCards) {
        deckCard.classList.toggle("show", false);
        deckCard.classList.toggle("open", false);  
    }
}


let movements = 0;
function cardOpenMatch(thisItem) {
    console.log("arrayMatchLength:" + cardsMatchArray.length );
    console.log("arrayOpenLength:" + cardsOpenArray.length );
    if ( cardsMatchArray.length  <= cardsMatchNumber ) {

        const cardItem=thisItem.querySelector(".fa");
        const cardItemClass= cardItem.classList[1].split("-")[1];
        cardsOpenArray.push(cardItemClass);

        if ( cardsOpenArray.length === 1)  {
            cardClean();
        }

        thisItem.classList.toggle("show", true);
        thisItem.classList.toggle("open", true); 
        
        //Pair of Cards Actions
        if ( cardsOpenArray.length === 2)  {
            
            movements += 1;
            console.log("movements:"+ movements);
            const cardsMatch = document.querySelectorAll(".open");
             if ( cardsOpenArray[0] === cardsOpenArray[1] ) {               
                    console.log("match!");   
                    for (cardMatch of cardsMatch) {
                        cardMatch.classList.toggle("match", true);
                    } 
                    cardsMatchArray.push(cardsOpenArray[0]);                 
            } else {
                    console.log("not match!");            
            }
            cardsOpenArray.splice(0, 2);

        }


        //Open the Congratulations PopUp
        if ( cardsMatchArray.length  === cardsMatchNumber ) {
            console.log("wines in:" + movements);
          
            setTimeout(function() {
                const modal = document.querySelector(".modal-content");
                modal.classList.toggle("hide", false);
                modal.classList.toggle("show", true);
                const moves = document.querySelector(".moves");
                moves.textContent = movements;               
            }, 3000); 

        }
    }
}

function eventCards() {
    const deckCards = document.querySelectorAll(".card");
    for (const deckCard of deckCards) {  
        deckCard.addEventListener('click', function(event) {
            cardOpenMatch(this);
        });
    }
}

shuffle(cardsArray);
suffleCards(cardsArray); 
eventCards(); 


const t1=performance.now();
console.log("Code Time "+ (t1-t0) + ' milliseconds');