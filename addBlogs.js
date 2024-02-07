 // blogs
 const login = document.querySelector('.login');
 const crossmark = document.querySelectorAll(".crossmark");
 const test = document.querySelector('.test')
 

  // validation form for blog upload
  const myImageInput = document.getElementById('myImageInput');
  const imageFileLink = document.getElementById('imageFileLink');
  const author = document.getElementById('author');
  const cardHeader = document.getElementById('cardHeader');
  const enterDescr = document.getElementById('enterDescr');
  const publDate = document.getElementById('publDate');
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
  let btnssdiv2 = document.querySelector('.sortBtnsDiv2')


// buttons addition
 
const downarrow = document.getElementById('downarrow')
const btns = document.querySelector('.btns')
const sortBtnsDivsel = document.querySelector('.sortBtnsDivsel')
const sortBtnsDivselbtn = sortBtnsDivsel.querySelectorAll('button')

  
  // uploadImg section
  
  let selectedFile;
  const imgName = document.querySelector('.imgName');
  const uploadIMGsection = document.querySelector('.uploadIMGsection')
  
  document.addEventListener('DOMContentLoaded', function() {
    
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
  


  
    
   
  document.addEventListener('DOMContentLoaded', function () {
    function checkFields() {
      // Check if all input fields have values
      const allFieldsFilled = author.value.trim() !== '' &&
                              cardHeader.value.trim() !== '' &&
                              enterDescr.value.trim() !== '' &&
                              publDate.value.trim() !== '' &&
                              uploademail.value.trim() !== '' &&
                              selectedFile !== '' && // Check if an image is uploaded
                              btnssdiv2.querySelectorAll('button').length > 0; // Check if there are button elements in btnssdiv2
  
      // Update the style of the publish button
      if (allFieldsFilled) {
          publishBtn.disabled = false; // Enable the button
          publishBtn.style.color = 'green'; // Set the color to green
      } else {
          publishBtn.disabled = true; // Disable the button
          publishBtn.style.color = 'red'; // Set the color to red
      }
  }
  
  // Attach event listeners to input fields
  author.addEventListener('keyup', checkFields);
  cardHeader.addEventListener('keyup', checkFields);
  enterDescr.addEventListener('keyup', checkFields);
  publDate.addEventListener('keyup', checkFields);
  uploademail.addEventListener('keyup', checkFields);
  
  // Call the function initially to set the initial state of the button
  checkFields();
  
  // Add event listener for image upload
  myImageInput.addEventListener('change', function() {
      selectedFile = myImageInput.files[0];
      checkFields(); // Check fields after image upload
  });
  
  // Add event listener for button clicks in btnssdiv2
  // btnssdiv2.addEventListener('click', checkFields);
  

// Create a new MutationObserver instance
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
      // Check if nodes were added or removed
      if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
          // Call the checkFields function to update the state of the publish button
          checkFields();
      }
  });
});

// Configure the MutationObserver to watch for changes in the child nodes of btnssdiv2
const observerConfig = { childList: true };

// Start observing the DOM subtree of btnssdiv2
observer.observe(btnssdiv2, observerConfig);

// Call checkFields initially to set the initial state of the publish button
checkFields();







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
  
  const existingCards = JSON.parse(localStorage.getItem('cards')) || [];
  cardArray = existingCards.slice();


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
            <a class="seeFullText" href="index2.html">სრულად ნახვა <img src="./images/icons/Arrow.png" alt=""></a>
          </div>
        </div>
      </div>
    `;

    cardArray.push(cardInfo);
    localStorage.setItem('cards', JSON.stringify(cardArray));
    clearFields();
   
  });

  
  
  publishBtn.addEventListener("click", function(){
    window.location.href = 'index.html';

})

  
})

// localStorage.clear()