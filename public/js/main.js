const form = document.querySelector('#update-form');
const shirtContainer = document.querySelector('#shirt-container');
const shirtContainerText = document.querySelector('#shirt-container fieldset');
const shirtSvg = document.querySelector('svg');
const shirtAccent = document.querySelector('#accent-color');
const shirtBackground = document.querySelector('#shirt-bg');
const shirtBackgroundColor = document.querySelector('fieldset:last-child');
const btn = document.querySelector('.btn--save');
const preview = document.querySelector('.btn--preview');
const print = document.querySelector('.btn--print');
const inputShirtType = document.querySelectorAll('[name="type"]');
const inputShirtSize = document.querySelectorAll('[name="size"]');
const inputColor = document.querySelectorAll('[name="color"]');
const inputTextColor = document.querySelectorAll('[name="textColor"]');

function shirtColor() {
    if (shirtAccent.classList.length > 0) {
        shirtAccent.className.baseVal = '';
        shirtBackground.className.baseVal = '';
    }
    shirtAccent.className.baseVal = this.id;
    shirtBackground.className.baseVal = this.id;
    shirtBackgroundColor.className = this.id;
}

function shirtSize() {
    if (shirtSvg.classList.length > 0) {
        shirtSvg.className.baseVal = '';
    } 
    shirtSvg.className.baseVal = this.id;
}

function shirtType() {
    if (shirtContainer.classList.length > 0) {
        shirtContainer.className = '';
    }
    shirtContainer.className = this.id;
}

function shirtText() {
    if (shirtContainerText.classList.length > 0) {
        shirtContainerText.className = '';
    }         
    shirtContainerText.className = this.id;
}

function request() {
    const data = JSON.parse(this.responseText);
    // alert(data)
    // console.log('datareq', data);
}

function sendData() {
    const xhttp = new XMLHttpRequest();
    const formData = new FormData(form);
    const id = document.querySelector('[name="hidden_id"]').value;

    for (let [key, value] of formData.entries()) { 
        console.log(key, value);
    }
    xhttp.addEventListener('load', request);
    xhttp.open('POST', `${id}`, true);
    xhttp.send(formData);
}

for(i = 0; i < inputShirtType.length; i++) {
    inputShirtType[i].addEventListener('change', shirtType);
}

for(i = 0; i < inputShirtSize.length; i++) {
    inputShirtSize[i].addEventListener('change', shirtSize);
}

for(i = 0; i < inputColor.length; i++) {
    inputColor[i].addEventListener('change', shirtColor);
}

for(i = 0; i < inputTextColor.length; i++) {
    inputTextColor[i].addEventListener('change', shirtText);
}

if(form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        sendData();
    });
}

if(print) {
    print.addEventListener('click', function() {
        window.print();
    });
}

if(preview) {
    preview.classList.add('btn--inactive')
}