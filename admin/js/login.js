
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
    const response = postData('http://127.0.0.1:12345/getUser', {'id': localStorage.getItem('userId')})
        .then(data => {
           return data;
        });
}

let showLoggedInUser = () => {
    if (localStorage.getItem('loggedIn')) {
        let user = getUser();
        showUser(user);
    } else {
        document.getElementById('user-inf').innerHTML = '';
    }
}

let showUser = (user) => {
    console.log(user);
}

showLoggedInUser();