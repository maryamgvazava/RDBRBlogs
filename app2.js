let fullCard = document.querySelector('.fullCard');
let header = document.querySelector('.header')
let leftArrow = document.querySelector('.leftArrow');
let nextBtn = document.querySelector('.nextBtn')

document.addEventListener('DOMContentLoaded', function() {
  leftArrow.addEventListener("click", function(){
    window.location.href = 'index.html';

})

//get data from localStorage and in case there is not any data, it will convert to empty array
let newCard = JSON.parse(localStorage.getItem('ThisCard')) || [];    
//implement data in fullcard html element, from localStorage
fullCard.innerHTML = newCard;

    

    // Retrieve matched cards from localStorage
    let matchedCards = JSON.parse(localStorage.getItem('matchedCards')) || [];
    console.log(matchedCards)

    let similarContent = document.querySelector('.similarContent');
  
    function renderCards(pageNumber) {
      const cardsPerPage = 3;
      const startIndex = (pageNumber - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const currentCards = matchedCards.slice(startIndex, endIndex);
      similarContent.innerHTML = currentCards.join('');
    }
  
    renderCards(1);
  
    document.getElementById('nextBtn').addEventListener('click', function () {
      // calculates the total number of pages based on the number of matched cards and the cards per page
      const totalPages = Math.ceil(matchedCards.length / 3);
      // It retrieves the current page number from localStorage or defaults to 1 if nothing is found;
      //on the click, if cuurentPage is not equal to totalPages, it is increased by 1;
      //but if the numbers are equal, modulo is 0; it adds 1 to currentPage and returns tu the 1 page;
        let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
        // It increments the current page, looping back to 1 if it reaches the last page. 
        currentPage = (currentPage % totalPages) + 1;
        // It then saves the updated current page to localStorage and renders the cards for the updated page.
        localStorage.setItem('currentPage', currentPage);
        renderCards(currentPage);
    });
  
    document.getElementById('prevBtn').addEventListener('click', function () {
      // calculates the total number of pages based on the number of matched cards and the cards per page
      const totalPages = Math.ceil(matchedCards.length / 3);
      // It retrieves the current page number from localStorage or defaults to 1 if nothing is found;
      //on the click, if currentpage == 1, that means, that 
      //1-2 = -1;
      //if totalPages is 1, -1 +1 == 0;
      //0%1  == 0; so it adds 1 to it and returns to the first page;
      //if currentPage > 1, it decreases the current page by one;
      //e.g. if i have 20 cards, i have 7 pages (according to totalPages)
      //if my currentPage is equal to 5>>
      //(5-2+7)%7+1=4;, so, the previous page will be  4th page;
      let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
      currentPage = (currentPage - 2 + totalPages) % totalPages + 1;
      localStorage.setItem('currentPage', currentPage);
      renderCards(currentPage);
    });


    document.addEventListener('click', function(event) {
      const existingCards = JSON.parse(localStorage.getItem('cards')) || [];
      // .slice(): The slice() method in JavaScript is used to create a shallow copy 
      // of a portion of an array into a new array.
      //  When called without any arguments, as in this case, it creates a copy of the entire array.
      let cardArray = existingCards.slice();
      // Initialize a Set to store matched cards
      let matchedCardsSet = new Set(); 
      
      const clickedElement = event.target;
    
      if (clickedElement.classList.contains("seeFullText")) {
        let selectedCard = clickedElement.closest('.card');
        //select all buttons of clicked card
        let selectedCardButtons = selectedCard.querySelectorAll('.cardButtons button');
    
          // Iterate over each card in cardArray
        cardArray.forEach(cardInfo => {
          // Create a temporary div element, for each cardInfo element
          let cardBodyElement = document.createElement('div'); 
           // Set its innerHTML to the card HTML string
          cardBodyElement.innerHTML = cardInfo; 
         
     
          if (cardBodyElement !== selectedCard) { // Check if it's not the selected card
            let cardButtons = cardBodyElement.querySelector('.cardButtons'); // Get card buttons divs


            if (cardButtons) {
              let otherCardButtons = cardButtons.querySelectorAll('button'); // Get all card buttons, axcept selected ones
    
              // Check for matching buttons
              let hasMatch = Array.from(otherCardButtons).some(otherButton => 
                Array.from(selectedCardButtons).some(selectedButton =>
                  otherButton.textContent === selectedButton.textContent
                )
              );
    

              // The hasMatch variable determines whether there's a match between any buttons in the selectedCard and any buttons in the current cardBodyElement.
              // If there's a match (hasMatch is true), it adds the entire cardInfo (HTML content) to the matchedCardsSet.
              // The matchedCardsSet contains the HTML content of all cards that have at least one matching button with the selectedCard.
              if (hasMatch) {
                matchedCardsSet.add(cardInfo); // Add the card info to matchedCardsSet
              }
              
            }
          }
        });
    
        // Convert the Set to an array and store in localStorage
        let matchedCardsArray = Array.from(matchedCardsSet);
        localStorage.setItem('matchedCards', JSON.stringify(matchedCardsArray));
        
        localStorage.setItem('ThisCard', JSON.stringify(selectedCard.outerHTML));
        console.log(selectedCard.outerHTML);
      }
    });
  })    

  