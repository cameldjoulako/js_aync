//grab required elements
let btn = document.getElementById('btnSend');
let response = document.getElementById('response');

//request options
let baseUrl = "http://api.openweathermap.org/data/2.5/weather"
let key = "dda251625ca4ba3ce0a58fb9525fe9ea";

//initialize required variables

//event listeners
btn.addEventListener('click', handleClick, false);

function handleClick(e){
    //disable submit button
    btn.disabled = true;
    //loop around all 4 form fields
    document.querySelectorAll('.form-field').forEach((element, index) => {
        //grab city field
        let cityField = document.getElementById(`city-${index}`);
        //get city value
        city = cityField.value;
        //disable city field
        cityField.disabled = true;
        //show corresponding spinner;
        updateUI(`<img src="images/spinner.gif" alt="spinner" id="spinner">`, index);
        //make a request
    });
}

function makeRequest(city){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', buildUrl(city));
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if(xhr.status == 200) {
                    //success
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    //failure
                    reject(JSON.parse(xhr.responseText));
                }
            }
        }
        xhr.send();
    });
}

function createSuccessHtml(data, index){
    let weather = data.weather[0]
        let html =  `
            <h1>Le temps à ${data.name}</h1>
            <p class="weatherMain">
                <img src="http://openweathermap.org/img/w/${weather.icon}.png" alt="${weather.description}" /><span>${weather.description}</span>
            </p>
            <p>Température : ${data.main.temp.toFixed(1)} °C</p>
        `
        updateUI(html, index);
}

function createErrorHtml(data, index){
    let html = `
        <h1>Une erreur s'est produite !</h1>
        <p>${data.message}</p>
    `
    updateUI(html, index)
}

/*Utilities*/
let buildUrl = city => `${baseUrl}?units=metric&lang=fr&q=${city}&appid=${key}`;
let updateUI = (html, index) => {
    //empty response container
    let response = document.getElementById(`response-${index}`)
    response.innerHTML = '';
    //replace with htmlString
    response.insertAdjacentHTML( 'beforeend', html);
}

let resetCityField = (cityField) => {
    cityField.disabled = false;
    cityField.value = '';
}