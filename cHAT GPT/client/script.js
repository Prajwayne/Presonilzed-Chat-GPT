import bot from './assets/bot.svg'
import user from './assets/user.svg'

// not workign with react at this stage therefore have to target html elements manually
const form = document.querySelector('form');
const chatConatiner = document.querySelector('chat_containe');// same name as html file 

// ceate one variable 
let loadInterval;


//function that loads our messages 
// it will generate 3 dots while thinking (...) this function enable that 
function loader(element)
{
  element.textContent = '';


  loadInterval = setInterval(()=>{
    element.textContent += '.';

    //not more than 3 dots at 300 milisecods interval 
    if (element.textContent === '....'){
      element.textContent = '';

    }
  },300)
}

//typing personality letter by letter 
function typeText(element, text){
  let index = 0;//at the start index is set to zero

  let interval = setInterval(() =>{
    if(index <text.length){ // check if we are still typing
      element.innerHTML += text.chartAt(index);// charecter under specific index
      index++;

    }else{
      clearInterval(interval);// clear the inteval after reaching the end
    }
  }, 20)
}
// Funtion to generate unique Id to every single meesage to map over them 
function generateUniqueID() {
  // we can generate Id by current Date and Time 
  const timestamp = Date.now();
  // we can create eben more random by cretaing random number 
  const randomNumber = Math.random();
  // to Push futher we can create a hexadecimal string
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp} - ${hexadecimalString}`;

}
//Chat stipes retursn template strings
function chatStripe(isAi, value, uniqueId) {
  return (
      `
      <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
              <div class="profile">
                  <img 
                    src=${isAi ? bot : user} 
                    alt="${isAi ? 'bot' : 'user'}"  
                  />
              </div>
              <div class="message" id=${uniqueId}>${value}</div>
          </div>
      </div>
  `
  )
}
//trigger to generate AI generated response 
// its async function and going to take an event 
const handleSubmit = async (e) =>{
  // do not reload the browser by default
  e.preventDefault();

  //get data 

  const data = new FormData(form); //form element from html 

  //genertae users chats stripe 
  chatConatiner.innerHTML += chatStripe(false,data.get('promt')); //false because its not AI its user

  form.reset();


  //bot chatstripe 
  const uniqueId = generateUniqueID();
  chatConatiner.innerHTML += chatStripe(true," ", uniqueId);
// keep scrolling down 
  chatConatiner.scrollTop = chatConatiner.scrollHeight;

//fecth newly created div 
  const messageDiv = document.getElementById(uniqueId);
  

   loader(messageDiv);

}
 // handel submit 
 form.addEventListener('submit',handleSubmit);
 //press enter key 
 form.addEventListener('keyup',(e) => {
  if(e.keyCode === 13){
    handleSubmit(e);
  }
 })
