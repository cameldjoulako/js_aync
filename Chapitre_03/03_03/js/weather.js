//grab required elements
let btn = document.getElementById('btnSend');
let cityField = document.getElementById("city");
let response = document.getElementById('response');

//request options
let baseUrl = "http://api.openweathermap.org/data/2.5/weather"
let key = "dda251625ca4ba3ce0a58fb9525fe9ea";

//event listeners
btn.addEventListener('click', handleClick, false);

function handleClick(e){
    //grab city value
    let city = cityField.value;
    //disable form
    cityField.disabled = true;
    btn.disabled = true;
    //show spinner
    updateUI(`<img src="images/spinner.gif" alt="spinner" id="spinner">`);
    //create xhr
    let req = fetch(buildUrl(city));
        req.then(response => response.json())
        .then(data => createSuccessHtml(data))
        .catch(error => createErrorHtml(error))
        .finally(() => resetForm());
    console.log(req);
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

function createSuccessHtml(data){
    let weather = data.weather[0]
        let html =  `
            <h1>Le temps à ${data.name}</h1>
            <p class="weatherMain">
                <img src="http://openweathermap.org/img/w/${weather.icon}.png" alt="${weather.description}" /><span>${weather.description}</span>
            </p>
            <p>Température : ${data.main.temp.toFixed(1)} °C</p>
        `
        updateUI(html);
}

function createErrorHtml(data){
    let html = `
        <h1>Une erreur s'est produite !</h1>
        <p>${data.message}</p>
    `
    updateUI(html)
}

/*Utilities*/
let buildUrl = city => `${baseUrl}?units=metric&lang=fr&q=${city}&appid=${key}`;
let updateUI = html => {
    //empty response container
    response.innerHTML = '';
    //replace with htmlString
    response.insertAdjacentHTML( 'beforeend', html);
}

function resetForm(){
    //reset form
    cityField.disabled = false;
    btn.disabled = false;
}