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
const test = document.querySelector('.test')

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
    login.innerText = "დაამატე ბლოგი";
    login.disabled = false
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

  // blogs




  // validation form for blog upload
const myImageInput = document.getElementById('myImageInput');
const imageFileLink = document.getElementById('imageFileLink');
const author = document.getElementById('author');
const cardHeader = document.getElementById('cardHeader');
const enterDescr = document.getElementById('enterDescr');
const publDate = document.getElementById('publDate');
const cathegory = document.getElementById('cathegory');
const uploademail = document.getElementById('uploademail');
const publishBtn = document.getElementById('publishBtn');
let cardRows = document.querySelector('.cardRows')
const min4Symbol = document.querySelector('.restr1')
const min2Word = document.querySelector('.restr2')
const onlyGeorgian = document.querySelector('.restr3');
const min2SymbolHeader = document.querySelector('.restr4');
const min2SymbolDescription = document.querySelector('.restr5');
const mailCheck = document.querySelector('.restr6');
const focussTyle = document.querySelectorAll('.focussTyle')
const uploadImgDiv  = document.querySelector('.uploadImgDiv ');
const div = document.querySelector('#div')
let btnssdiv2 = document.querySelector('.sortBtnsDiv2')

// uploadImg section

let selectedFile = myImageInput.files[0];
const imgName = document.querySelector('.imgName');
const uploadIMGsection = document.querySelector('.uploadIMGsection')



document.addEventListener('DOMContentLoaded', function() {
  const myImageInput = document.getElementById('myImageInput');
  const imageFileLink = document.getElementById('imageFileLink');

  myImageInput.addEventListener('change', function() {
     selectedFile = myImageInput.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function(e) {
        uploadedImg = e.target.result;
        
        imgName.append(selectedFile.name);
        imgName.style.display = 'flex'
        uploadImgDiv.style.height = '56px';
        uploadIMGsection.style.display = 'none';
      };
      reader.readAsDataURL(selectedFile);
    }

      console.log(selectedFile)
  });

  imageFileLink.addEventListener('click', function(event) {
    event.preventDefault();
    myImageInput.click();
  });





});

selectedFile = ''

// input restriction checks

let blogFormValidation = function(inputType, minLengthWarning, noSpaceWarning, regexWarning) {
  inputType.addEventListener('input', function() {
    const inputValue = inputType.value;
    const regex = /^[\u10A0-\u10FF]+(?: [\u10A0-\u10FF]+)*$/;
    if (inputType === cardHeader || inputType === enterDescr) {
      inputValue.length > 4 ? (minLengthWarning.style.color = 'rgba(20, 216, 28, 1)', inputType.classList.add("focussTyleSuccess")) :
      (minLengthWarning.style.color = 'rgba(234, 25, 25, 1)', inputType.classList.remove("focussTyleSuccess"));
    } else {
      inputValue.length <= 4 ?  minLengthWarning.style.color = 'rgba(234, 25, 25, 1)': minLengthWarning.style.color = 'rgba(20, 216, 28, 1)';
      !inputValue.includes(" ") ?  noSpaceWarning.style.color = 'rgba(234, 25, 25, 1)' : noSpaceWarning.style.color = 'rgba(20, 216, 28, 1)';
      regex.test(inputValue) ? (regexWarning.style.color = 'rgba(20, 216, 28, 1)', inputType.classList.add("focussTyleSuccess")) :
       (regexWarning.style.color = 'rgba(234, 25, 25, 1)', inputType.classList.remove("focussTyleSuccess"))
    }
    return (inputValue.length > 4 && inputValue.includes(" ") && regex.test(inputValue));
  });
}

const isAuthorValid = blogFormValidation(author, min4Symbol, min2Word, onlyGeorgian);
const isCardHeaderValid = blogFormValidation(cardHeader, min2SymbolHeader);
const isEnterDescrValid = blogFormValidation(enterDescr, min2SymbolDescription);


uploademail.addEventListener('input', (event ) =>{
  event.preventDefault()
  const requestData = { email: uploademail.value }; 
  if(!requestData.email.includes("@redberry.ge")){
    mailCheck.style.display = 'block';
    uploademail.classList.add("unsuccessfulStyle")
    uploademail.classList.remove("focussTyleSuccess")
  } else{
    mailCheck.style.display = 'none';
    uploademail.classList.remove("unsuccessfulStyle")
    uploademail.classList.add("focussTyleSuccess")
  }

})

const currentDate = new Date();
const formattedDate = `${currentDate.getDate() < 10 ? '0' : ''}${currentDate.getDate()
}.${currentDate.getMonth() + 1 < 10 ? '0' : ''}${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

publDate.addEventListener('focus', function(){
  publDate.value = formattedDate;
  publDate.disabled = true;
  publDate.classList.add("focussTyleSuccess")

})





// buttons addition

const market = document.querySelector('.marketsel')
const appl = document.querySelector('.applsel')
const AI = document.querySelector('.AIsel')
const UI = document.querySelector('.UIsel')
const research = document.querySelector('.researchsel')
const figma = document.querySelector('.figmasel')
const choosecategory = document.querySelector('.choosecategory')
  const btnCollection = document.getElementById('buttonCollection') 
  const downarrow = document.getElementById('downarrow')
const whitecross = document.querySelectorAll('.whitecross')
const crossmarkBtnSelect = document.querySelectorAll('.crossmarkBtnSelect')
const btns = document.querySelector('.btns')
const addCardsButtons = document.querySelector('.addCardsButtons')

  const sortBtnsDivsel = document.querySelector('.sortBtnsDivsel')
  const sortBtnsDivselbtn = sortBtnsDivsel.querySelectorAll('button')
  


  
   
document.addEventListener('DOMContentLoaded', function () {
downarrow.addEventListener('click', function(){
    sortBtnsDivsel.classList.toggle('selectedButtonsDiv');
 
  })
  let arr2 = [];
sortBtnsDivsel.addEventListener('click', function(event) {
  const clickedElement = event.target;
  if (clickedElement.tagName === 'BUTTON') {
    const buttonText = clickedElement.textContent.trim();
    const buttonIndex = arr2.findIndex(button => button.textContent.trim() === buttonText);
    if (buttonIndex === -1) {
      arr2.push(clickedElement);
      const newButton = clickedElement.cloneNode(true);
      btnssdiv2.appendChild(newButton);
      newButton.addEventListener('click', function(event) {
        event.target.parentNode.removeChild(event.target);
        const index = arr2.findIndex(button => button.textContent.trim() === event.target.textContent.trim());
        if (index !== -1) {
          arr2.splice(index, 1);
        }
      });
    }
  }
  iterateArr2();
});

function iterateArr2() {
  const matchedButtons = [];
  arr2.forEach(item => {
    sortBtnsDivselbtn.forEach(eachBtn => {
      if (item.textContent.trim() === eachBtn.textContent.trim()) {
        matchedButtons.push(eachBtn);
      }
    });
  });
  return matchedButtons;

}

  
    function clearFields() {
        author.value = '';
        cardHeader.value = '';
        enterDescr.value = '';
        publDate.value = '';
        uploademail.value = '';
       
        imgName.innerHTML = '';
        imgName.style.display = 'none'
        uploadImgDiv.style.height = '180px';
        uploadIMGsection.style.display = 'flex';
   
    }


   // Declare cardArray outside the event handler
let cardArray = [];

publishBtn.addEventListener('click', function () {
  const matchedButtons = iterateArr2();
  const matchedButtonsHTML = matchedButtons.map(button => button.outerHTML).join('');

  const cardObject = {
    image: uploadedImg,
    author: author.value,
    title: cardHeader.value,
    description: enterDescr.value,
    published: formattedDate,
    buttons: matchedButtonsHTML
  };

  let cardInfo = `
    <div class="col col-lg-4">
      <div class="card" style="width: 408px; height: 620px;">
        <img src="${cardObject.image}" class="card-img-top" alt="..." width="408" height="328">
        <div class="card-body">
          <h5 class="">${cardObject.author}</h5>
          <p class="published">${cardObject.published}</p>
          <p class="title">${cardObject.title}</p>
          <div class="cardButtons">${cardObject.buttons}</div>
          <p class="card-text">${cardObject.description}</p>
          <a class="seeFullText" target="_blank" href="index2.html">სრულად ნახვა <img src="./images/icons/Arrow.png" alt=""></a>
        </div>
      </div>
    </div>
  `;
  
  // Push cardInfo to cardArray
  cardArray.push(cardInfo);
  localStorage.setItem('cards', JSON.stringify(cardArray));
  renderCards();
  clearFields();
 
});




function renderCards() {
  cardRows.innerHTML = '';
  cardArray.forEach(cardInfo => {
    cardRows.innerHTML += cardInfo;


  });
}


const existingCards = JSON.parse(localStorage.getItem('cards')) || [];
cardArray = existingCards.slice();
renderCards();



document.addEventListener('click', function(event) {
  const clickedElement = event.target;
  console.log(clickedElement);
  const classes = Array.from(clickedElement.classList);
  if(classes.includes("seeFullText")){
    let selctedCard = clickedElement.closest('.card').outerHTML
     localStorage.setItem('ThisCard', JSON.stringify(selctedCard));
    console.log(clickedElement.closest('.card').outerHTML)
  }
});




})

