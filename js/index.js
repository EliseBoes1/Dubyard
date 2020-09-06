'use strict';

let mainNav = document.getElementById('main-nav');

const hamburgerMenu = document.getElementById('hamburger-menu');
hamburgerMenu.addEventListener('click', function () {
    if (mainNav.style.display === "none") {
        mainNav.style.display = "block";
    } else {
        mainNav.style.display = "none";
    }
    this.src = '';
});
fetch('../data/blogposts.json')
    .then(response => {
        return response.json()
    })
    .then(data => {
        // showBlogposts('allposts', data.blogposts);
        showAllRecipes(data.recipes);

        // console.log(typeOf(document.getElementById('recipes')));
        // if (document.getElementById('recipes').length == null) {
        // }
    })
    .catch(err => {})

let showBlogposts = (divToAppend, blogposts) => {
    let allPostsEl = document.getElementById(divToAppend);

    blogposts.forEach(blogpost => {
        allPostsEl.insertAdjacentHTML('afterend', `
    <figure class="reg-post">
        <h3>${blogpost.title}</h3>
        <div class="post-inf">
            <p class="added-on">Geplaatst op: ${blogpost.date}</p>
            <p class="line"></p>
            <p class="post-tag">${blogpost.type}</p>
        </div>
        <img src="img/placeholders/DSC_0565.JPG" alt="">
        <figcaption>
            <p>${blogpost.description}</p>
            <div class="line"></div>
            <a href="blogpost.html" class="read-more ${blogpost.id}">
                    Lees blogpost >>
                </a>
        </figcaption>
    </figure>
        `)
    });


    // let readmore = Array.from(document.getElementsByClassName('read-more'));
    // readmore.forEach(readmoreBtn => {
    //     console.log(readmoreBtn)
    //         readmoreBtn.addEventListener('click', function () {
    //             console.log('hello');
    //         });
    //     });

    //     let searchEl = document.getElementById('search-recipe');
    //     searchEl.addEventListener('keyup', function(){
    //         searchRecipes(this.value);
    //     });

    //    let searchRecipes = (searchInput) =>{

    //     }
}

let showAllRecipes = recipes => {
    recipes.forEach(recipe => {
        let recipesEl = document.getElementById('recipes');
        recipesEl.insertAdjacentHTML('beforeend', `
        <figure id="${recipe.id}" class="reg-post ${recipe.tags[0]} ${recipe.tags[1]} ${recipe.tags[2]}">
        <h3>${recipe.title}</h3>
        <div class="post-inf">
            <p class="added-on">Geplaatst op: ${recipe.date}</p>
            <p class="line"></p>
            <p class="post-tag">${recipe.type}</p>
        </div>
        <img src="${recipe.placeholder}" alt="${recipe.alt[0]}">
        <figcaption>
            <p>${recipe.description}</p>
            <div class="line"></div>
            <a href="recept.html" class="read-more ${recipe.id}">
                Lees blogpost >>
            </a>
        </figcaption>
    </figure>
        `);
    })

    goToBlogPost(recipes);
    let searchEl = document.getElementById('search-recipe');
    searchEl.addEventListener('keyup', function () {
        searchRecipes(this.value);
    });

    let searchRecipes = (searchInput) => {

    }
}

let goToBlogPost = allPosts => {
    let readmore = Array.from(document.getElementsByClassName('read-more'));
    readmore.forEach(readmoreBtn => {
        readmoreBtn.addEventListener('click', function () {
            const postId = this.classList[1];
            localStorage.setItem('postId', postId);
        });
    });
}

console.log(document.getElementById('blogpost').length)

// if(document.getElementById('blogpost').length == undefined){
//     console.log(true);
// }else{
//     console.log(false)
// }

let calendarDivs = Array.from(document.getElementsByClassName('calendar'));
calendarDivs.forEach(calendarDiv => {
    calendarDiv.innerHTML = `
<div class="month">
    <ul>
        <li class="prev">&#10094;</li>
        <li id="month-inf">
            August<br>
            <span style="font-size:18px">2017</span>
        </li>
        <li class="next">&#10095;</li>
    </ul>
</div>

<ul class="weekdays">
    <li>Mo</li>
    <li>Tu</li>
    <li>We</li>
    <li>Th</li>
    <li>Fr</li>
    <li>Sa</li>
    <li>Su</li>
</ul>

<ul class="days">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li><span class="active">10</span></li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
    <li>17</li>
    <li>18</li>
    <li>19</li>
    <li>20</li>
    <li>21</li>
    <li>22</li>
    <li>23</li>
    <li>24</li>
    <li>25</li>
    <li>26</li>
    <li>27</li>
    <li>28</li>
    <li>29</li>
    <li>30</li>
    <li>31</li>
</ul>`
});