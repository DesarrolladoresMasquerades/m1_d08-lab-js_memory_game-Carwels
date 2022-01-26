const MemoryGame = require("./memory");

console.log("Memory index.js loaded")
const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

let memoryGame = new MemoryGame(cards) //1

const memoryBoard = document.getElementById("memory-goard") //2

const cardsHTML = memoryGame.cards.map( //3
  card => {
  // These actions can only be taken when the page is completely loaded
  /*
   *
   The following code creates a html element that has the following contents
    <div class="card" data-card-name="${card.name}">
      <div class="back" name="${card.img}"></div>
      <div class="front" style="background: url(img/${card.img}) no-repeat"></div>
    </div>
  */

    const outsideDiv = document.createElement("div") //4
    outsideDiv.classList.add("card")
    outsideDiv.setAttribute("data-card-name", card.name)

    const insideDivBack = document.createElement("div") //back of card
    insideDivBack.classList.add("back")
    insideDivBack.name = card.img

    const insideDivFront = document.createElement("div") //front of card
    insideDivFront.classList.add("front")
    insideDivFront.name = card.img
    insideDivFront.style = `background: url(img/${card.img}) no-repeat` // same as HTML inline <div style=...

    outsideDiv.appendChild(insideDivBack)
    outsideDiv.appendChild(insideDivFront)

    return outsideDiv
  }
)

cardHTML.forEach( cardHtml => { // Now we will create event so the user can click in the card
  cardHtml.addEventListener(
    "click",

    // ------ main game loop started by user click -------------
    ( event ) => {                      // ---- only way to know which div was clicked ------
      const clickedCard = event.currentTarget //this is the only way to know, which html has been click(who originated you?)
      flipCard(clickedCard)

      const playResults = memoryGame.playCard()

       // the following line is based on the fact that I would like to pass complex object from the game logic
      // the object is: { isPair: false, playedCards: this.playedCards }
      if(playResults.isPair) {
        playResults.playedCards.forEach(card => setCardsToGuessed(card))
      } else {
        playResults.cards.forEach ( card => {
          setTimeout( () => flipCard(), 1 * 1000 )
        })

        updateScoreBoard(
          memoryGame.score,
          memoryGame.clickedPairs,
          memoryGame.guessedPairs

        )

        if(memoryGame.checkIfGameOver()) gameWon()
      }
    }
    // ------- end game loop ----------
  )

  cardsHTML.forEach((cardHtml) => memoryBoard.appendChild(cardHtml));

});