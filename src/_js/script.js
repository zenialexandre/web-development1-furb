const labelForm = document.getElementsByClassName('labelForm');
const inputForm = document.getElementsByClassName('form-control');
const submitButton = document.getElementById('submitButton');
const estado = document.getElementById('estado');
const user = document.getElementById('user');
const password = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const bootstrapHeader = document.getElementById('header');

function tabDisplay() {
    if (window.location.pathname == '/Web-Development1-FURB/src/index.html') {
        document.getElementById('indexTab').style.color = 'aquamarine';
    } else if (window.location.pathname == '/Web-Development1-FURB/src/login.html') {
        document.getElementById('loginTab').style.color = 'aquamarine';
    } else if (window.location.pathname == '/Web-Development1-FURB/src/cadastro.html') {
        document.getElementById('cadastroTab').style.color = 'aquamarine';
    } else if (window.location.pathname == '/Web-Development1-FURB/src/cadastro2.html') {
        document.getElementById('cadastro2Tab').style.color = 'aquamarine';
    }
}

function normal() {
    document.body.style.background = 'linear-gradient(to right, #92abff, #5580f7)';
    submitButton.style.background = 'linear-gradient(to right, #d0dbff, #5580f7)';
    submitButton.style.borderRadius = '25%';
    estado.style.backgroundColor = 'white';
    bootstrapHeader.style.background = 'linear-gradient(to right, #92abff, #5580f7)';

    for (let i = 0; i < labelForm.length; i++) {
        labelForm[i].style.fontFamily = 'Arial';

        for (let j = 0; j < inputForm.length; j++) {
            inputForm[j].style.backgroundColor = 'white';
        }
    }
} 

function custom() {
    document.body.style.background = 'linear-gradient(to right, #d0dbff, #3ac7ff)';
    submitButton.style.background = 'linear-gradient(to right, #d0dbff, #3ac7ff)';
    submitButton.style.borderRadius = '60%';
    estado.style.backgroundColor = 'skyblue';
    bootstrapHeader.style.background = 'linear-gradient(to right, #d0dbff, #3ac7ff)';

    for (let i = 0; i < labelForm.length; i++) {
        labelForm[i].style.fontFamily = 'Lobster';

        for (let j = 0; j < inputForm.length; j++) {
            inputForm[j].style.backgroundColor = 'skyblue';
        }
    }
}

function changeLoginButtonState() {
    if (user.value.trim().length > 0 && password.value.trim().length > 0) {
        loginButton.disabled = false; 
    } else {
        loginButton.disabled = true;
    }
}

function setCookie(daysToExpire) {
    let data = new Date();
    data.setTime(data.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + data.toGMTString();

    document.cookie = "username=" + user.value.trim() + ";" + expires + ";path=/";
    window.location = "./index.html";
}

function getCookie(pCookie) {
    var vetCookies = document.cookie.split(';');
    for (var i = 0; i < vetCookies.length; i++) {
        linhaCookie = vetCookies[i].trim();
        if (linhaCookie.indexOf(vetCookies) == 0) {
            return linhaCookie.substring((pCookie.length+1), linhaCookie.length);
        }
    }
}

function changeUserDisplay() {
    document.getElementById('headerUsername').innerText = getCookie('username');
    document.getElementById('iconeUser').style.opacity = '1';    
}

function checkCookie() {
    let cookie = this.getCookie('username');

    if (cookie !== "") {
        this.changeUserDisplay();
    }
}

window.addEventListener('load', this.tabDisplay());
