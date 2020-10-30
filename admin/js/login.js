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


let showUser = (user) => {
    let name = localStorage.getItem('name');
    document.getElementById('user-inf').innerHTML = `Logged in as ${name}`;
}

let getUser = (route) => {
    postData(`http://127.0.0.1:12345/${route}`, {
            'id': localStorage.getItem('userId')
        })
        .then(data => {
                user = data;
                if (document.getElementById('manage-acc-form') != null) {
                    document.getElementById('firstname-manage').value = data.firstname,
                    document.getElementById('lastname-manage').value = data.lastname
                    document.getElementById('email-manage').value = data.email
                    document.getElementById('oldpassword-manage').value = ''
                    document.getElementById('password-manage').value = ''
             }
                showUser();
        });
}

let updateUser = profileData => {
    postData(`http://127.0.0.1:12345/editprofile`, profileData).then(data => {
        localStorage.setItem('userId', data._id);
        localStorage.setItem('name', data.firstname);
        window.location.href = 'manageaccount.html';
    });
}

let editUserInf = () => {
    const editedProfile = {
        firstname: document.getElementById('firstname-manage').value,
        lastname: document.getElementById('lastname-manage').value,
        email: document.getElementById('email-manage').value,
        oldpassword: document.getElementById('oldpassword-manage').value,
        password: document.getElementById('password-manage').value,
        id: localStorage.getItem('userId')
    }
    if(document.getElementById('oldpassword-manage').value == document.getElementById('password-manage').value){
            updateUser(editedProfile);
            document.getElementById('manage-pw-warning').style.display = "none";
    }else{
        document.getElementById('manage-pw-warning').style.display = "block";
    }
}

let showLoggedInUser = () => {
    if (localStorage.getItem('loggedIn')) {
        showUser();
    } else {
        document.getElementById('user-inf').innerHTML = '';
    }
}

if (localStorage.getItem('loggedIn')) {
    getUser('getUser');
}

showLoggedInUser();

if (document.getElementById('manage-btn') != null) {
    document.getElementById('manage-btn').addEventListener('click', function (e) {
        e.preventDefault();
        editUserInf();
    });
}