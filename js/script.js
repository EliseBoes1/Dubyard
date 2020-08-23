'use strict';

let mainNav = document.getElementById('main-nav');
mainNav.className += 'hidden';

const hamburgerMenu = document.getElementById('hamburger-menu');
hamburgerMenu.addEventListener('click', function(){
    mainNav.classList.toggle('hidden');
    this.src = '';
});