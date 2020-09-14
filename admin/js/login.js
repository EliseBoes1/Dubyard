let user;

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

let getUser = () => {
    postData('http://127.0.0.1:12345/getUser', {'id': localStorage.getItem('userId')})
        .then(data => {
           user = data;
        });
        showUser();
}

let showUser = (user) => {
    let name = localStorage.getItem('name');
    document.getElementById('user-inf').innerHTML = `Logged in as ${name}`;

    // let changeProfileInputs = document.querySelector('#manage-acc-form input');
    // changeProfileInputs.forEach(input =>{
    //     console.log(input);
    // })

}

let showLoggedInUser = () => {
    if (localStorage.getItem('loggedIn')) {
        showUser();
    } else {
        document.getElementById('user-inf').innerHTML = '';
    }
}

if(localStorage.getItem('loggedIn')){
    getUser();
}
showLoggedInUser();