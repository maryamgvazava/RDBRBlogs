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
      const clickedBtnText = this.textContent.trim();
      const cardColumns = cardRows.querySelectorAll('.col-lg-4');

      // Loop through each card column
      cardColumns.forEach(cardColumn => {
        const cardBtns = cardColumn.querySelectorAll('.cardButtons button');
        let found = false;

        // Loop through each button within the card column
        cardBtns.forEach(cardBtn => {
          const cardBtnText = cardBtn.textContent.trim();
          
          // Check if any button's text matches the clicked button's text
          if (cardBtnText === clickedBtnText) {
            found = true;
          }
        });

        // If a match is found, move the card column to the beginning
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
    let selectedCard = clickedElement.closest('.card'); // იმ ელემენტის ქარდი, რომელზეც ხდება კლიკი
    let selectedCardButtons = selectedCard.querySelectorAll('.cardButtons button'); //იმ ქარდის ღილაები, რომელიც ავირჩიე

    let cardBody = document.querySelectorAll('.card-body');  //ყველა ქარდის body

    let matchedCardsSet = new Set();  //

    cardBody.forEach(cardBodyElement => {
      let cardButtons = cardBodyElement.querySelector('.cardButtons'); //ყველა ქარდის ბოდიში არსებული ღილაკების div
      if (cardButtons && cardBodyElement !== selectedCard) {  //თუ ყველა ქარდის ბოდიში არსებული ღილაკები და ყველა ქარდის body არ უდრის არჩეულ ქარდს
        let otherCardButtons = cardButtons.querySelectorAll('button'); //ყველა ქარდის ბოდიში არსებული ღილაკების div-ში არსებული ღილაკები

        // Check for matching buttons
        let hasMatch = Array.from(otherCardButtons).some(otherButton =>  //ყველა ღილაკების დივში არსებული ღილაკები
          Array.from(selectedCardButtons).some(selectedButton => //იმ ქარდების ღილაკები რომელიც ავირჩიე
            otherButton.textContent === selectedButton.textContent //თუ ემთხვევა ერთმანეთს
          )
        );

        if (hasMatch) {
          matchedCardsSet.add(cardBodyElement.closest('.card').outerHTML); //მაშინ დაამატოს უახლოესი ქარდ ელემენტი matchedCardsSet-ში
        }
      }
    });

    // Remove the selected card from the matched cards set
    matchedCardsSet.delete(selectedCard.outerHTML); //matchedCardsSet -დანნ წაშალოს არჩეული ქარდის კოპი

    // Convert the Set to an array and log the matching cards
    let matchedCardsArray = Array.from(matchedCardsSet); // და სეთი გადააკეთოს მასივად

    // Log matching cards
    if (matchedCardsArray.length > 0) {
      localStorage.setItem('matchedCards', JSON.stringify(matchedCardsArray)); // და მასივი შეინახოს ლოკალურ მეხსიერებაში. 
    }

    localStorage.setItem('ThisCard', JSON.stringify(selectedCard.outerHTML)); //არჩეული ქარდი შეინახოს ლოკალურ მეხსიერებაში
  
}
});

localStorage.setItem('header', JSON.stringify(header.outerHTML)); //ჰედერის სექცია შეინახოს ლოკალურ მეხსიერებაში










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