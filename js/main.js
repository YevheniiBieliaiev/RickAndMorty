"use strict";

//карточка персонажа
const divContainer = document.querySelector(".card-container");

function createCard(person) {
  const cardInfo = document.createElement("div");
  cardInfo.className = "card-info";
  divContainer.append(cardInfo);

  //The person info
  const personInfo = document.createElement("div");
  personInfo.className = "person-info";
  cardInfo.append(personInfo);

  const title = document.createElement("div");
  title.className = "title";
  personInfo.append(title);

  const fullName = document.createElement("h1");
  fullName.textContent = person.name;
  title.append(fullName);

  const details = document.createElement("div");
  details.className = "details";
  title.append(details);

  const status = document.createElement("div");
  status.className = "live-status";
  if (person.status === "Dead") {
    status.classList.add("dead");
  }
  details.append(status);

  const raceStatus = document.createElement("p");
  raceStatus.textContent = `${person.species} -- ${person.status}`
  details.append(raceStatus);

  const location = document.createElement("div");
  location.className = "location";
  location.textContent = person.location.name;
  personInfo.append(location);

  //The person photo
  const personPhoto = document.createElement("div");
  personPhoto.className = "person-photo";
  cardInfo.append(personPhoto);

  const img = document.createElement("img");
  img.src = person.image;
  img.alt = person.name;
  personPhoto.append(img);
}

//запрос
async function getPersons(get) {
  let response = await fetch(`https://rickandmortyapi.com/api/character/${get}`)
  return response.json()
}
//функция для отрисовки по ID
async function drawCardsId(resp) {
  let data = await getPersons(resp);
  data.forEach(item => { createCard(item) })
}
//функция для отрисовки для checkbox
async function drawCards(func) {
  let data = await func;
  data.results.forEach(item => { createCard(item) })
}
//функция очистки поля для каждого check
function clearField() {
  while (divContainer.firstChild) {
    divContainer.removeChild(divContainer.firstChild);
  }
}
//для динамики с ID персонажей (простая функцияя для отображения персов с N до N + length)
function dynamicId(start, length) {
  const arrId = new Array(length).fill(0).map(item => start++);
  return arrId;
}
//рандомные значения ID на определенную length
//нужно проверка на одинаковое значене эллемента и замена , и снова проверка...
function dynamicRandomId(min, max, length) {
  function randElem() {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const arrId = new Array(length).fill(0).map(item => randElem());
  return arrId
}
//вызов по ID
//drawCardsId(dynamicId(1, 10));
drawCardsId(dynamicRandomId(10, 67, 10));


//логика для get по чекбоксу
function sortPerson(event) {
  if (event.target) {
    if (event.target.textContent === "Male") {
      clearField();
      drawCards(getPersons(`?gender=${event.target.textContent}`));
    } else if (event.target.textContent === "Female") {
      clearField();
      drawCards(getPersons(`?gender=${event.target.textContent}`));
    }
    if (event.target.textContent === "Alive") {
      clearField();
      drawCards(getPersons(`?status=${event.target.textContent}`));
    } else if (event.target.textContent === "Dead") {
      clearField();
      drawCards(getPersons(`?status=${event.target.textContent}`));
    }
  }
}

//прослушка
const form = document.querySelector(".form-wrapper");
form.addEventListener("click", sortPerson);










