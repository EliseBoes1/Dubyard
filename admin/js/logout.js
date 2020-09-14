
let logoutEl = document.getElementById('log-out')
logoutEl.addEventListener('click', function () {
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('userId', ' ');
    localStorage.setItem('name', ' ');
    window.location.href = 'index.html'
});