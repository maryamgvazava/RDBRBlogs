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


let backgroundTransparency = function(color){
    let opacity = [header, coverSection, sortBtnsSec, cardsSection];

for ( let el of opacity){
    el.style.backgroundColor = color //"rgba(26, 26, 31, 0.024);"
    // el.style.opacity = percent //"24%"
}
}



login.disabled = false

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
         backgroundTransparency("none")
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

