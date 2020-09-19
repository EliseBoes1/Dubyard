let logoutEl = document.getElementById('log-out')
if (logoutEl != null) {
    logoutEl.addEventListener('click', function () {
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('userId', ' ');
        localStorage.setItem('name', ' ');
        window.location.href = 'index.html'
    });
}