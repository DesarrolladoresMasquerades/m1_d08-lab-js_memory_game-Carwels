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

let memoryGame = new MemoryGame(cards)

const memoryBoard = document.getElementById("memory-board")

const cardsHTML = memoryGame.cards.map(
  card=>{
  // These actions can only be taken when the page is completely loaded
  /*
   *
   The following code creates a html element that has the following contents
    <div class="card" data-card-name="${card.name}">
      <div class="back" name="${card.img}"></div>
      <div class="front" style="background: url(img/${card.img}) no-repeat"></div>
    </div>
  */

    const outsideDiv = document.createElement("div")
    outsideDiv.classList.add("card")
    outsideDiv.setAttribute("data-card-name", card.name)

    const insideDivBack = document.createElement("div")
    insideDivBack.classList.add("back")
    insideDivBack.name = card.img

    const insideDivFront = document.createElement("div")
    insideDivFront.classList.add("front")
    insideDivFront.name = card.img
    insideDivFront.style = `background: url(img/${card.img}) no-repeat` // same as HTM inline <div style= ...
    
    outsideDiv.appendChild(insideDivBack)
    outsideDiv.appendChild(insideDivFront)

    return outsideDiv
  }
)


function flipCard(card){
  card.classList.toggle("turned")
}

function setCardsToGuessed(card) {
  card.classList.add('guessed');
}

function updateScoresBoard(score, clicked, guessed) {
  document.getElementById('score').innerText = score;
  document.getElementById('pairs-clicked').innerText = clicked;
  document.getElementById('pairs-guessed').innerText = guessed;
}


function gameWon() {
  const winOverlay = document.createElement('div');
  const winBanner = document.createElement('h1');
  winBanner.innerText = 'YOU HAVE SUPERPOWERS !';
  winOverlay.appendChild(winBanner);
  winOverlay.style.backgroundImage =
    "url('https://wallpaperaccess.com/full/1135868.jpg')";
  winOverlay.classList.add('win-modal');
  document.querySelector('#memory-board').appendChild(winOverlay);
}


cardsHTML.forEach(cardHtml => {
  cardHtml.addEventListener(
    "click",

    // ------ main game loop started by user click ---------
    ( event )=>{
      const clickedCard = event.currentTarget // ----- only way to know which div was clicked -------
      flipCard(clickedCard)

      const playResults = memoryGame.playCard( clickedCard )

      // the following line is based on the fact that I would like to pass complex object from the game logic
      // the object is: { isPair: false, playedCards: this.playedCards }
      if(playResults.isPair){
        playResults.playedCards.forEach(card=> setCardsToGuessed(card))
      }else{
        playResults.playedCards.forEach( card=>{
          setTimeout(()=>flipCard(card), 1 * 1000)
        })
      }
      
        updateScoresBoard(
          memoryGame.score,
          memoryGame.clickedPairs,
          memoryGame.guessedPairs
        )

        if(memoryGame.checkIfGameOver()) gameWon()

    }
    // ---------- end game loop --------
  )

  cardsHTML.forEach((cardHtml) => memoryBoard.appendChild(cardHtml));
});

