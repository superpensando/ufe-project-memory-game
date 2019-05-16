/*
 * Create a list that holds all of your cards
 */

 const cardsArray =  ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
 let cardsOpenArray = [];
 let cardsMatchArray = [];

 let cardsMatchNumber = 8; 


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
        newIcon.className =" fa " + item;      
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

let movements = 0;
let click = 0; 
let t0 = 0; 

function cardClean() {
    const deckCards = document.querySelectorAll(".card");
    for (const deckCard of deckCards) {
        deckCard.classList.remove("show");
        deckCard.classList.remove("open");
        deckCard.classList.remove("notmatch");
    }
}

function cardOpenMatch(thisItem,event) {
    
    if ( cardsMatchArray.length  <= cardsMatchNumber ) {
            
        //Add Open Cards to an OpenArray 
        //Add open/show class to HTML (begins with class :not(.open))
        if (!thisItem.classList.contains("open")) {
            
            click += 1;
            if (click === 1) {
                t0 = performance.now();
            }
            //Remove open/show class to HTML
            if (( cardsOpenArray.length === 0) && (movements > 0 )) {
                cardClean();
            }

            thisItem.classList.add("open");
            thisItem.classList.add("show");
            const cardItemClass= thisItem.children[0].classList[1];
            cardsOpenArray.push(cardItemClass);

            //Pair of Cards Actions
            //Match or NotMatch into the Open Cards Array 
            //If Match, Add Card to an Match Array
            if ( cardsOpenArray.length === 2)  {
                
                movements += 1;

                const cardsMatch = document.querySelectorAll(".open");
                if ( cardsOpenArray[0] === cardsOpenArray[1] ) {                                        
                    for (cardMatch of cardsMatch) {
                        cardMatch.classList.add("match");
                    } 
                    cardsMatchArray.push(cardsOpenArray[0]);                                      
                } else {  
                    for (cardMatch of cardsMatch) {
                        cardMatch.classList.add("notmatch");
                    } 
                }

                //Delete cardsOpenArray
                cardsOpenArray.splice(0, 2);

            }
      
        }

   
        //Open the Congratulations PopUp
        if ( cardsMatchArray.length  === cardsMatchNumber ) {
         
            setTimeout(function() {

                const modal = document.querySelector(".modal-content");
                modal.classList.toggle("hide", false);

                //Move Counter
                const moves = document.querySelector(".moves");
                moves.classList.toggle("hide", false);
                moves.textContent = movements; 
                
                //Timer
                const t1=performance.now();
                const timer = document.querySelector(".timer");
                timer.textContent = ((t1-t0)/1000).toFixed(2) + " s"; 
                
                //Star Rating 
                if ( movements > 20 ) {
                    const rating3 = document.querySelector(".fa-star-three");
                    rating3.classList.add("offstars");
                } 
                if ( movements > 30 ) {
                    const rating2 = document.querySelector(".fa-star-two");
                    rating2.classList.add("offstars");
                } 
                if (movements > 40) {
                    const rating1 = document.querySelector(".fa-star-one");
                    rating1.classList.add("offstars");
                }   
                          
            }, 1000); 

        }
    }
}

function eventCards() {
    const deckCards = document.querySelectorAll(".card");
    for (const deckCard of deckCards) {  
        deckCard.addEventListener('click', function(event) {
            cardOpenMatch(this,event);
        });
    }
}

shuffle(cardsArray);
suffleCards(cardsArray); 
eventCards(); 
