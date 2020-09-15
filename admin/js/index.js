'use strict';
let signupForm = document.getElementById('signup-form');
let loginForm = document.getElementById('login-form');

if (loginForm || signupForm != null) {
    loginForm.style.display = 'none';

    let signupBtn = document.getElementById('signup-btn');
    let loginBtn = document.getElementById('login-btn');

    signupBtn.addEventListener('click', function (e) {
        e.preventDefault();
        signupUser();
    });

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        loginUser();
    });
}

let loginBtns = Array.from(document.getElementsByClassName('login'));
loginBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        switchSignup();
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
    });
});

let signupBtns = Array.from(document.getElementsByClassName('signup'));
signupBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        switchLogin();
    });
});

let switchLogin = () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
}

let switchSignup = () => {
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

let signupUser = () => {
    const newUser = {
        firstname: document.getElementById('firstname-signup').value,
        lastname: document.getElementById('lastname-signup').value,
        email: document.getElementById('email-signup').value,
        password: document.getElementById('password-signup').value,
        blogposts: [],
        recipes: [],
        calendarposts: []
    }

    const rptPw = document.getElementById('rptpassword-signup').value;

    if (newUser.password == rptPw) {
        postData('http://127.0.0.1:12345/signup', newUser)
            .then(data => {
                if (data.resp == "false") {
                    document.getElementById('signup-email-warn').style.display = 'block';
                } else {
                    document.getElementById('signup-succes').style.display = 'block';
                    document.getElementById('signup-email-warn').style.display = 'none';
                    setTimeout(switchSignup(), 2000);
                };
            });
        document.getElementById('signup-pw-warning').style.display = 'none';
    } else {
        document.getElementById('signup-pw-warning').style.display = 'block';
    }
}

let loginUser = () => {
    const loggedInUser = {
        email: document.getElementById('email-login').value,
        password: document.getElementById('password-login').value
    }
    try {
        postData('http://127.0.0.1:12345/login', loggedInUser)
            .then(data => {
                console.log(data);
                if (data.resp != null) {
                    document.getElementById('login-pw-warn').style.display = 'block';
                } else {
                    console.log(data);
                    document.getElementById('login-pw-warn').style.display = 'none';
                    localStorage.setItem('loggedIn', true);
                    localStorage.setItem('userId', data._id);
                    localStorage.setItem('name', data.firstname);
                    window.location.href = 'addpost.html';
                }
            });
    } catch (err) {
        console.log(err);
    }
}

function showCalendarInputs(type) {
    let inputBtn = document.getElementById(`${type}-input`);
    let inputDiv = document.getElementById(`${type}-input-opts`);
    if (inputBtn.checked) {
        inputDiv.style.display = 'flex';
    } else {
        inputDiv.style.display = 'none';
    }
}