let fullCard = document.querySelector('.fullCard')


let newCard = JSON.parse(localStorage.getItem('ThisCard')) || [];
fullCard.innerHTML = newCard;

// localStorage.clear()