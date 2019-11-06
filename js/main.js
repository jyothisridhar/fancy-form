//Questions Array

const questions = [
  {question: 'Enter your first Name'},
  {question: 'Enter your last Name'},
  {question: 'Enter your Email', pattern: /\S+@\S+\.\S+/},
  {question: 'Create a password', type: "password"}
];

//Transition times
const shakeTime = 100;
const switchTime = 200; //transition between Questions

//Init position at first question
let position = 0;

//Get DOM elements
const formBox = document.querySelector('#form-box');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progressBar = document.querySelector('#progress-bar');

//events
document.addEventListener('DOMContentLoaded', getQuestion);

//click next button
nextBtn.addEventListener('click', validate);
prevBtn.addEventListener('click', () => {
  if(position)
  {
    position = position -1;
    getQuestion();
  }
});

//enter click
inputField.addEventListener('keyup', e => {
  if(e.keyCode == 13){
    validate();
  }
})
//functions
function getQuestion(){
  inputLabel.innerHTML = questions[position].question;

  inputField.type = questions[position].type || 'text';

  inputField.value = questions[position].answer || '';
  inputField.focus();

  //set progress bar width
  progressBar.style.width = (position * 100) / questions.length + '%';

  //add user icon or back arrow
  prevBtn.className = position ? 'fas fa-arrow-left': 'fas fa-user';

  showQuestion();
}

function showQuestion(){
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

//hide question to go the next one
function hideQuestion(){
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;

}

function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}
function validate(){
  if(!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  }
  else {
    inputPass();
  }
}

function inputFail(){
  formBox.className = 'error';

  for(let i =0; i < 6; i++){
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1 )* 20, 0);
    setTimeout(transform, shakeTime * 6, 0,0);
    inputField.focus();
  }
}

function inputPass(){
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  questions[position].answer = inputField.value;
  position++;

  if(questions[position]){
    hideQuestion();
    getQuestion();
  }
  else {
    hideQuestion();
    formBox.className = 'close';
    progressBar.style.width = '100%';
    formComplete();
  }
}

function formComplete(){
  console.log(questions);
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(
    document.createTextNode(
      `Thanks ${questions[0].answer}! You are now registered.`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
