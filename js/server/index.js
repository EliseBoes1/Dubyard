'use strict';

let signupForm = document.getElementById('signup-form');
let loginForm = document.getElementById('login-form');
loginForm.style.display = 'none';

let loginBtns = Array.from(document.getElementsByClassName('login'));
loginBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
    });
});

let signupBtns = Array.from(document.getElementsByClassName('signup'));
signupBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
    });
});

async function addUser(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

let signupBtn = document.getElementById('signup-btn');

signupBtn.addEventListener('click', function (e) {
    e.preventDefault();
    
    const newUser = {
        firstName : document.getElementById('firstname-signup').value,
        lastName : document.getElementById('lastname-signup').value,
        email : document.getElementById('email-signup').value,
        password : document.getElementById('password-signup').value,
        rptPassword : document.getElementById('rptpassword-signup').value
    }
    addUser('http://127.0.0.1:12345/signup', newUser)
        .then(data => {
            console.log(data);
        });
});


    // fetch('http://127.0.0.1:12345/signup', {mode: 'cors'}).then(response => {
    //     console.log(response);
    //     return response.json();
    //   }).then(data => {
    //     // Work with JSON data here
    //     console.log(data);
    //   }).catch(err => {
    //     // Do something for an error here
    //     console.log("Error Reading data " + err);
    //   });