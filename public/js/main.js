

const form = document.querySelector('#update-form');
const shirtContainer = document.querySelector('#shirt-container');
const shirtContainerText = document.querySelector('#shirt-container fieldset');
const shirtSvg = document.querySelector('svg');
const shirtAccent = document.querySelector('#accent-color');
const shirtBackground = document.querySelector('#shirt-bg');
const h1 = document.querySelector('h1');

function shirtColor(data) {

    if (shirtAccent.classList.length>0) {
        shirtAccent.className.baseVal = '';
        shirtBackground.className.baseVal = '';
    }
    shirtAccent.className.baseVal = data.color.name;
    shirtBackground.className.baseVal = data.color.name;

}

function shirtSize(data) {
    if (shirtSvg.classList.length > 0) {
        shirtSvg.className.baseVal = '';
    } 
    shirtSvg.className.baseVal = data.size;
}

function shirtType(data) {
    if (shirtContainer.classList.length > 0) {
        shirtContainer.className = '';
    }
    shirtContainer.className = data.type;
}

function shirtText(data) {
    if (shirtContainerText.classList.length > 0) {
        shirtContainerText.className = '';
    }         
    shirtContainerText.classList.add(data.textColor.name);
}

function request() {
    const data = JSON.parse(this.responseText);
    shirtColor(data);
    shirtSize(data);
    shirtType(data);
    shirtText(data);
    // alert(data)
    // console.log('datareq', data);
}

function sendData() {
    const xhttp = new XMLHttpRequest();
    const formData = new FormData(form);
    const id = document.querySelector('[name="hidden_id"]').value;

    // for (let [key, value] of formData.entries()) { 
    //     console.log(key, value);
    // }
    xhttp.addEventListener('load', request);
    xhttp.open('POST', `${id}`, true);
    xhttp.send(formData);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    sendData();
});

// input.addEventListener("change", function (event) {
//     event.preventDefault();
//     sendData();
// });
