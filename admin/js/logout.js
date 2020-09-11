
let logoutEl = document.getElementById('log-out')
logoutEl.addEventListener('click', function () {
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('userId', null);
    window.location.href = 'index.html'
});