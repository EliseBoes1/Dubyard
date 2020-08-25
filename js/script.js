'use strict';

let mainNav = document.getElementById('main-nav');

const hamburgerMenu = document.getElementById('hamburger-menu');
hamburgerMenu.addEventListener('click', function(){
    if (mainNav.style.display === "none") {
        mainNav.style.display = "block";
      } else {
        mainNav.style.display = "none";
      }
    this.src = '';
});