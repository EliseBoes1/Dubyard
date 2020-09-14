
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
           return data;
        });
}

let showLoggedInUser = () => {
    if (localStorage.getItem('loggedIn')) {
        showUser('lala');
    } else {
        document.getElementById('user-inf').innerHTML = '';
    }
}

let showUser = (user = '') => {
    let name = localStorage.getItem('name');
    document.getElementById('user-inf').innerHTML = `Logged in as ${name}`;
}

showLoggedInUser();