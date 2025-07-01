let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(() => {
  let currentTime = new Date();

  hrs.innerHTML =
    (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
  min.innerHTML =
    (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
  sec.innerHTML =
    (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);

//API KEY: "d61b754da4b4ed329416ce7e11a1eaa1"
//API URL: "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const apiKey = "d61b754da4b4ed329416ce7e11a1eaa1";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=antalya";

async function checkWeather(city) {
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  var data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML =
    data.main.humidity + "% Humidity";
  document.querySelector(".wind").innerHTML =
    data.wind.speed + " km/h Wind Speed";
}

checkWeather();

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You  must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveTask();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveTask();
  }
  if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveTask();
  }
});

inputBox.addEventListener("keypress", function(event){
  if(event.key === "Enter"){
    event.preventDefault();
    addTask();
  }
});

function saveTask() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask("data");

const quote = document.getElementById('quote');// quote değişkeni oluştur ve quote elementini ata
const author = document.getElementById('author');// author değişkeni oluştur ve author elementini ata
const api_url = "http://api.quotable.io/random";//api_url değişkeni oluştur ve api linkini ekle

async function getquote(url){//getquote asenkron fonksiyonu oluştur
    const response = await fetch(url);//response değişkeni oluştur ve fetch ile url i ata
    var data = await response.json();//data değişkeni oluştur ve response değişkenindeki JSON datayı ata
    quote.innerHTML = data.content;//quote değişkenindeki HTML elementine JSON datadaki content datasını ata
    author.innerHTML = data.author;//author değişkenindellen HTML elementine JSON datadaki author datasını ata
}

getquote(api_url);//getquote fonksiyonuna api_url değişkenini parametre olarak ata ve çalıştır


const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("in-view");
      entry.target.classList.remove("not-in-view");
    }
    else{
      entry.target.classList.remove("in-view");
      entry.target.classList.add("not-in-view");
    }
  })
}, {
  rootMargin: "0px", 
  threshold: [0, 0.1, 1],
},
)

const tags = document.querySelectorAll('h1, h2, span, p, img, input, blockquote, ul, .row, .newBtn');

tags.forEach((tag) => {
  observer.observe(tag)
})

const backgrounds = {
  "time" : "#a37dd1",
  "weather-section" : "#20639B",
  "to-do-section" : "#ff5945",
  "quote-section" : "#f5d537"
};

const observedSections = document.querySelectorAll(".time, .weather-section, .to-do-section, .quote-section");

const newObserver = new IntersectionObserver(entries =>{
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const sectionClass = Array.from(entry.target.classList).find(cls => backgrounds[cls]);
      if(sectionClass){
        document.body.style.backgroundColor = backgrounds[sectionClass];
      }
    }
  });
}, {threshold: 0.6});

observedSections.forEach(section => newObserver.observe(section));