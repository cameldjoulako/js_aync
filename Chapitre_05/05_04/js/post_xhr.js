//grab required elements
let btn = document.getElementById('btnSend');
let txtField = document.getElementById('message')

btn.addEventListener('click', handleClick, false);

function handleClick(e){
    //grab value typed in text field
    let message = txtField.value;
    //create xhr
    makeRequest(message)
        .then(data => createSuccessHtml(data))
        .catch(error => createErrorHtml(error))
        .then( html => updateUI(html))
        .finally(() => resetForm());
}

function makeRequest(message){
    return new Promise((resolve, reject) => {
        let reqBody = {'text' : message};
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:3000/server.php');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    //request is a success
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    //request failed
                    reject(JSON.parse(xhr.responseText))
                }
            }
        }
        xhr.send(JSON.stringify(reqBody));
    });
}

function createSuccessHtml(data){
    return html = `<p>${data}</p>`;
}
//createErrorHtml
let createErrorHtml = (data) => {

    return html = `
        <h1>Une erreur s'est produite !</h1>
        <p>${data.message}</p>
    `
}


let updateUI = html => {
    let response = document.getElementById('response');
    //empty response container
    response.innerHTML = '';
    //replace with htmlString
    response.insertAdjacentHTML( 'beforeend', html);
}
function resetForm(){
    txtField.value = '';
}
