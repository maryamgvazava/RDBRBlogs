let fullCard = document.querySelector('.fullCard')
let similarContent = document.querySelector('.similarContent')

let newCard = JSON.parse(localStorage.getItem('ThisCard')) || [];
fullCard.innerHTML = newCard;



let matchedCards = JSON.parse(localStorage.getItem('matchedCards')) || [];
similarContent.innerHTML = matchedCards;
// localStorage.clear()