function calculatePercentage() {
  // Получаем значения из полей ввода
  const age = parseInt(document.getElementById('age').value);
  const year = parseInt(document.getElementById('year').value);
  const minAge = 15;
  // Проверка корректности ввода
  if (isNaN(age) || isNaN(year) || age <= 0 || year <= 0 || year > new Date().getFullYear()) {
    document.getElementById('result').textContent = "Пожалуйста, введите корректные данные.";
    return;
  }

   //Проверка возраста min
   if (age < minAge) {
    document.getElementById('result').textContent = `Ошибка: минимальный возраст должен быть ${minAge} лет.`;
    return;
  }

  





  // Текущий год
  const currentYear = new Date().getFullYear();
  
  // Количество лет, проведенных в университете
  const yearsInUniversity = currentYear - year;

    
    const birthYear = currentYear - age;
    if (year < birthYear) {
      document.getElementById('result').textContent = "Ошибка: год поступления не может быть раньше вашего рождения";
      return;
    }

  // Если человек поступил позже, чем его возраст, ошибка
  if (yearsInUniversity < 0 || year > currentYear) {
    document.getElementById('result').textContent = "Год поступления не может быть в будущем.";
    return;
  }


  // Расчет процента жизни в университете
  const percentage = (yearsInUniversity / age) * 100;

  rs.httpGet("validate");
  rs_facts.httpGet("facts",{"x-rapidapi-host":" facts-by-api-ninjas.p.rapidapi.com","x-rapidapi-key":"33aa5503e8msh667f36060bafa9bp1bf1a1jsnd2e378f64292"});
  let msg = "Сервер ответил ошибку";

  if (state) {
    msg = `Вы провели ${percentage.toFixed(2)}% своей жизни в университете.`;
  }

  // Вывод результата
  document.getElementById('result').textContent = msg + "</br></br>" + fact;
}



class RequestsSender {

  constructor(url, callback, isAsync = true) {
      this.url = url;
      this.callback = callback;
      this.isAsync = isAsync;
  }

  httpGet(path = "", headers ={}) {
      var xmlHttp = new XMLHttpRequest();
      let callback = this.callback;
      xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", this.url + "/" + path, this.isAsync);
      for (let key in headers){
        xmlHttp.setRequestHeader(key,headers[key]);
      }
      xmlHttp.send(null);
  }

  httpPost(path = "", data, contentType = null) {
      var xmlHttp = new XMLHttpRequest();
      let callback = this.callback;
      xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("POST", this.url + "/" + path, this.isAsync);
      if (contentType != null) {
          xmlHttp.setRequestHeader("Content-Type", contentType);
      }
      xmlHttp.send(data);
  }
}
function logCallback(text) {
  console.log(text)
}

function alertCallback(text) {
  alert(text)
}

function changeStateCallback(text){
  console.log(text)
  let response = JSON.parse(text);
  state = response.message;
}

function addFactCallback(text){
  console.log(text)
  let response = JSON.parse(text);
  fact = response[0].fact
}

let fact = "";
let state = true;
const apiURL = "http://172.20.10.12:8000";
const apiURLFacts = "https://facts-by-api-ninjas.p.rapidapi.com/v1";
let rs = new RequestsSender(apiURL, changeStateCallback, isAsync=false);
let rs_facts = new RequestsSender(apiURLFacts, addFactCallback, isAsync=false);
// rs.httpGet("facts",{"x-rapidapi-host":" facts-by-api-ninjas.p.rapidapi.com","x-rapidapi-key":"33aa5503e8msh667f36060bafa9bp1bf1a1jsnd2e378f64292"});


