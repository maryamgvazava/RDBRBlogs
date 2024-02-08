// login form
const login = document.querySelector('.login');
const signInDiv = document.querySelector('.signInDiv')
const crossmark = document.querySelectorAll(".crossmark");
const emailInput = document.querySelector('.emailInput')
const loginBtn = document.querySelector('.loginBtn');
const errmsg = document.querySelector('.errmsg')
const successDiv= document.querySelector('.successDiv');
const ok = document.querySelector('.ok');
const header = document.querySelector('.header')
const coverSection = document.querySelector('.coverSection')
const sortBtnsSec = document.querySelector('.sortBtnsSec')
const cardsSection = document.querySelector('.cardsSection')
const enterBlogBtn = document.querySelector('.enterBlogBtn')
const cardRows = document.querySelector('.cardRows');
const sortBtnsDiv = document.querySelector('.sortBtnsDiv');


let backgroundTransparency = function(color){
    let opacity = [header, coverSection, sortBtnsSec, cardsSection];

for ( let el of opacity){
    el.style.backgroundColor = color 
}
}

login.disabled = false;
login.addEventListener('click', function(){
    signInDiv.style.display = 'flex';
    this.disabled = true
    backgroundTransparency("rgba(26, 26, 31, 0.024)")
})
for(let close of crossmark){
    close.addEventListener("click", function(){
        signInDiv.style.display = 'none';
        successDiv.style.display = 'none';
        login.disabled = false
         backgroundTransparency("rgba(255, 255, 255, 1);")
    });
}

ok.addEventListener('click', function(){
    successDiv.style.display = 'none';
    login.style.display = 'none';
    enterBlogBtn.style.display = 'block';

})


// user validation

loginBtn.addEventListener('click', event => {
  event.preventDefault();

  const apiUrl = 'https://api.blog.redberryinternship.ge/api/login';
  const requestData = { email: emailInput.value }; 


  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(requestData)
    
  })
    .then(response => {
      if (response.status === 204) {
        console.log('User logged in successfully');


        signInDiv.style.display = 'none';
        successDiv.style.display = 'flex';

      } else {
        errmsg.style.visibility = 'visible';
        emailInput.style.border = 'solid 1px rgba(234, 25, 25, 1)';
        emailInput.style.backgroundColor = 'rgba(250, 242, 243, 1)'
        throw new Error('The selected email is invalid.');
        
      }
   
    })
    .catch(error => {
      console.error('Error:', error);
    });
});




emailInput.addEventListener('input', (event ) =>{
    event.preventDefault()
    const requestData = { email: emailInput.value }; 
  if(!requestData.email.includes("@redberry.ge")){
    errmsg.style.visibility = 'visible';
    emailInput.style.border = 'solid 1px rgba(234, 25, 25, 1)';
    emailInput.style.backgroundColor = 'rgba(250, 242, 243, 1)'
  } else{
    errmsg.style.visibility = 'hidden';
    emailInput.style.border = 'solid 1.5px rgba(93, 55, 243, 1)';
    emailInput.style.backgroundColor = 'rgba(247, 247, 255, 1)';
  }
  console.log(JSON.stringify(requestData.email))
  })


document.addEventListener('DOMContentLoaded', function() {
  // Add click event listeners to each button
  sortBtnsDiv.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      const clickedBtnText = this.textContent.trim(); //define clicked button's textContent
      const cardColumns = cardRows.querySelectorAll('.col-lg-4'); //define each col where cards are located

      // Loop through each card column
      cardColumns.forEach(cardColumn => {
        //select all buttons of each cards
        const cardBtns = cardColumn.querySelectorAll('.cardButtons button'); 
        let found = false;

        // Loop through each button within the card column and define textContents
        cardBtns.forEach(cardBtn => {
          const cardBtnText = cardBtn.textContent.trim();
          
          // Check if any button's text matches the clicked button's text
          if (cardBtnText === clickedBtnText) {
            found = true;
          }
        });

        // If a match is found, move the card column to the beginning


        
    // The order-first class is a utility class 
    //typically used in CSS frameworks like Bootstrap to 
    //control the order of flex items within a flex container.

    // When you add the order-first class to an element, 
    //it changes its order in the flex container so that it appears first visually,
    // regardless of its position in the HTML source order.

        if (found) {
          cardColumn.classList.add('order-first');
        } else {
          cardColumn.classList.remove('order-first');
        }
      });
    });
  });
});



document.addEventListener('click', function(event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("seeFullText")) {
    // the .card element of the clicked element
    let selectedCard = clickedElement.closest('.card'); 
    //buttons of the .card element, on which the click was made
    let selectedCardButtons = selectedCard.querySelectorAll('.cardButtons button'); 
    //select all card-body of all .card elements
    let cardBody = document.querySelectorAll('.card-body'); 


    //creating a Set() method to omit the duplicated ones;
    let matchedCardsSet = new Set(); 


      //loop through  each card-body and compare with the selected one:
    cardBody.forEach(cardBodyElement => {
     //selecting .cardbuttons - 'div' where the buttons are located
      let cardButtons = cardBodyElement.querySelector('.cardButtons'); 

      //comparing: if .cardbuttons - 'div' where the buttons are located and 
      //each .card-body of the .card element is not equal to .card itself
      if (cardButtons && cardBodyElement !== selectedCard) {  

        //selecting all buttons, located in the cards (in .cardButtons' div)
        let otherCardButtons = cardButtons.querySelectorAll('button'); 

        // Check for matching buttons - if any of all the .card's buttons textContents 
        //are match to the selected button
        let hasMatch = Array.from(otherCardButtons).some(otherButton =>  
          Array.from(selectedCardButtons).some(selectedButton => 
            otherButton.textContent === selectedButton.textContent 
          )
        );


        if (hasMatch) {
          // if there is any match, add matched button's card to the set
          matchedCardsSet.add(cardBodyElement.closest('.card').outerHTML); 
        }
      }
    });

    // Remove the selected card from the matched cards set
    matchedCardsSet.delete(selectedCard.outerHTML);

    // Convert the Set to an array and log the matching cards
    let matchedCardsArray = Array.from(matchedCardsSet); 

    // and if there is at least one, save it to the local Storage
    if (matchedCardsArray.length > 0) {
      localStorage.setItem('matchedCards', JSON.stringify(matchedCardsArray));
    }
    //save selected card to the local Storage
    localStorage.setItem('ThisCard', JSON.stringify(selectedCard.outerHTML));
  
}
});











const existingCards = JSON.parse(localStorage.getItem('cards')) || [];
let cardArray = existingCards.slice();

function renderCards() {
  cardRows.innerHTML = '';
  cardArray.forEach(cardInfo => {
    cardRows.innerHTML += cardInfo;
  });
}

renderCards();

// localStorage.clear()