let fullCard = document.querySelector('.fullCard')

let header = document.querySelector('.header')
let leftArrow = document.querySelector('.leftArrow');
let nextBtn = document.querySelector('.nextBtn')




document.addEventListener('DOMContentLoaded', function() {
















leftArrow.addEventListener("click", function(){
    window.location.href = 'index.html';

})





let newCard = JSON.parse(localStorage.getItem('ThisCard')) || [];
fullCard.innerHTML = newCard;





let headerSection = JSON.parse(localStorage.getItem('header')) || [];
header.innerHTML = headerSection

// localStorage.clear()
// let similarContent = document.querySelector('.similarContent');
// let similarContentCards = similarContent.querySelectorAll('.card');
// console.log(similarContentCards)


// let matchedCards = JSON.parse(localStorage.getItem('matchedCards')) || [];
// similarContent.innerHTML = matchedCards.join('');



// for (let i = 0; i < matchedCards.length; i++){
  
//     nextBtn.addEventListener('click', function(){

//     })

// }


    // Retrieve matched cards from localStorage
    let matchedCards = JSON.parse(localStorage.getItem('matchedCards')) || [];
    let similarContent = document.querySelector('.similarContent');
  
    // Function to render cards based on the current page
    function renderCards(pageNumber) {
      // Number of cards to display per page
      const cardsPerPage = 3;
  
      // Calculate start and end indices for the current page
      const startIndex = (pageNumber - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
  
      // Slice the matchedCards array to get the cards for the current page
      const currentCards = matchedCards.slice(startIndex, endIndex);
  
      // Update the content of similarContent with the current cards
      similarContent.innerHTML = currentCards.join('');
    }
  
    // Initial render of cards on page load
    renderCards(1);
  
    // Event listener for the "Next" button
    document.getElementById('nextBtn').addEventListener('click', function () {
      // Calculate the total number of pages
      const totalPages = Math.ceil(matchedCards.length / 3);
  
      // Get the current page from localStorage or default to 1
      let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
  
      // Increment the current page, loop back to 1 if at the last page
      currentPage = (currentPage % totalPages) + 1;
  
      // Save the updated current page to localStorage
      localStorage.setItem('currentPage', currentPage);
  
      // Render the cards for the updated current page
      renderCards(currentPage);
    });
  
    // Event listener for the "Previous" button
    document.getElementById('prevBtn').addEventListener('click', function () {
      // Calculate the total number of pages
      const totalPages = Math.ceil(matchedCards.length / 3);
  
      // Get the current page from localStorage or default to 1
      let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
  
      // Decrement the current page, loop back to the last page if at the first page
      currentPage = (currentPage - 2 + totalPages) % totalPages + 1;
  
      // Save the updated current page to localStorage
      localStorage.setItem('currentPage', currentPage);
  
      // Render the cards for the updated current page
      renderCards(currentPage);
    });






    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
      
        if (clickedElement.classList.contains("seeFullText")) {
          let selectedCard = clickedElement.closest('.card');
          let selectedCardButtons = selectedCard.querySelectorAll('.cardButtons button');
      
          let cardBody = document.querySelectorAll('.card-body');
      
          let matchedCardsSet = new Set();
      
          cardBody.forEach(cardBodyElement => {
            let cardButtons = cardBodyElement.querySelector('.cardButtons');
            if (cardButtons && cardBodyElement !== selectedCard) {
              let otherCardButtons = cardButtons.querySelectorAll('button');
      
              // Check for matching buttons
              let hasMatch = Array.from(otherCardButtons).some(otherButton => 
                Array.from(selectedCardButtons).some(selectedButton =>
                  otherButton.textContent === selectedButton.textContent
                )
              );
      
              if (hasMatch) {
                matchedCardsSet.add(cardBodyElement.closest('.card').outerHTML);
              }
            }
          });
      
          // Remove the selected card from the matched cards set
          matchedCardsSet.delete(selectedCard.outerHTML);
      
          // Convert the Set to an array and log the matching cards
          let matchedCardsArray = Array.from(matchedCardsSet);
      
          // Log matching cards
          if (matchedCardsArray.length > 0) {
            localStorage.setItem('matchedCards', JSON.stringify(matchedCardsArray));
          }
      
          localStorage.setItem('ThisCard', JSON.stringify(selectedCard.outerHTML));
        }
      });





  });
  