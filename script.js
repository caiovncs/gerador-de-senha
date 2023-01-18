const range = document.querySelector('.range');
const number = document.querySelector('.number');
const selectLowcase = document.getElementById('checkbox1');
const selectUppercase = document.getElementById('checkbox2');
const selectNumber = document.getElementById('checkbox3');
const selectSymbols = document.getElementById('checkbox4');
const btnCheck = document.querySelector('.gerar-senha');
const passwordHtml = document.querySelector('.password');
const nivel = document.querySelector('.nivel span');
const copy = document.querySelector('.copy');
const copyEffect = document.querySelector('.result');


range.value = 10
number.value = 10


range.addEventListener('input', rangeScroll)
number.addEventListener('keyup', inputNumber)


function inputNumber(event) {
  event.preventDefault()
  if(number.value >= 5 && number.value <=20) {
    range.value = number.value
    number.style.border = "none"
  } else {
    number.style.border = "1px solid red"
  }
}

function rangeScroll() {
  number.value = range.value
}


const caracters = Array.from(Array(26)).map((_, i) => i + 97)
const letterSymbols = ["@", "#", "$", "%", "&", "*", "!"]
const letterNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const letterLow = caracters.map((item) => String.fromCharCode(item))
const letterUpper = letterLow.map((item) => item.toUpperCase())


btnCheck.addEventListener('click', () => {
  generatePassword(selectNumber.checked,
    selectSymbols.checked,
    selectUppercase.checked,
    selectLowcase.checked,
    range.value
    );
});


const generatePassword = (hasNumber, hasSymbols, hasUpper, hasLow, rangeValue) => {
  const newArray = [
    ...(hasNumber ? letterNumber : []),
    ...(hasSymbols ? letterSymbols : []),
    ...(hasUpper ? letterUpper : []),
    ...(hasLow ? letterLow : [])
  ];


  if (newArray.length === 0) return;

  let password = "";


  for (let i = 0; i < rangeValue; i++) {
    const randomIndex = Math.floor(Math.random() * newArray.length);
    password += newArray[randomIndex]
  }
  passwordHtml.innerText = password

  if (rangeValue < 6 || newArray.length <= 26) {
    nivel.classList.add('fraco')
    nivel.classList.remove('medio')
    nivel.classList.remove('forte')
  } else if((rangeValue >= 6 && rangeValue <= 10) && newArray.length > 33) {
      nivel.classList.add('medio')
      nivel.classList.remove('fraco')
      nivel.classList.remove('forte')
  } else if (rangeValue > 10 && newArray.length > 20) {
      nivel.classList.add('forte')
      nivel.classList.remove('medio')
      nivel.classList.remove('fraco')
    }
}

copy.addEventListener('click', copiar) 

function copiar() {
  navigator.clipboard.writeText(passwordHtml.innerText);
}