'use strict';
let mainNav = document.getElementById('main-nav');

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

const hamburgerMenu = document.getElementById('hamburger-menu');
hamburgerMenu.addEventListener('click', function () {
    if (mainNav.style.display === "none") {
        mainNav.style.display = "block";
    } else {
        mainNav.style.display = "none";
    }
    this.src = '';
});

let showBlogposts = (divToAppend, blogposts) => {
    let allPostsEl = document.getElementById(divToAppend);
    blogposts.forEach(post => {
        const postImg = encodeURI(post.img);
        allPostsEl.insertAdjacentHTML('beforeend', `
        <figure class="reg-post" id="${post.id}">
            <div class="img-wrapper">
                <img src ="${postImg}" alt="">
            </div>
                <figcaption>
                <h3>${post.title}</h3>
                <div class="post-inf">
                    <p class="added-on">Geplaatst op: ${post.day}/${post.month}/${post.year}</p>
                    <p class="post-tags"></p>
                </div>
                    <a href="blogpost.html?id=${post.id}" class="read-more ${post.id}">
                            Lees blogpost >>
                        </a>
                </figcaption>
            </figure>
        `)
    });
};

fetch('http://127.0.0.1:12345/allposts')
    .then(response => {
        return response.json()
    })
    .then(data => {
        if (document.querySelector('#search input') == null) {
            showBlogposts('posts-wrapper', data);   
        } else if(post.tags.includes('Voeding')) {
            const recipes = data.filter(post => post.tags.includes('Voeding'));
            showAllRecipes(recipes);
        }
    })
    .catch(err => {})

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

let showAllRecipes = recipes => {
    recipes.forEach(recipe => {
        let recipesEl = document.getElementById('posts');
        recipesEl.insertAdjacentHTML('beforeend',`
        <figure id="${recipe.id}" class="reg-post ${recipe.tags[0]}">
        <h3>${recipe.title}</h3>
        <div class="post-inf">
            <p class="added-on">Geplaatst op: ${recipe.day}/${recipe.month}/${recipe.year}</p>
            <p class="line"></p>
            <p class="post-tag">${recipe.tags[0]}</p>
        </div>
        <img src="${recipe.img}">
        <figcaption>
            <p>${recipe.description}</p>
            <div class="line"></div>
            <a href="blogpost.html" class="read-more ${recipe.id}">
                Bekijk recept >>
            </a>
        </figcaption>
    </figure>
        `);
    });

    goToBlogPost(recipes);
    let searchEl = document.getElementById('search-recipe');
    console.log(searchEl)
    searchEl.addEventListener('keyup', function () {
        searchRecipes(this.value);
    });

    let searchRecipes = (searchInput) => {
        console.log(searchInput);
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

let showWorkshops = posts => {
    posts.forEach(calendarPost => {
        const calendarpostsDiv = document.getElementById('calendar-posts');
        document.getElementById('calendar-posts').insertAdjacentHTML('beforeend', `
            <figure class="reg-post">
                <div class="num-calendar">${calendarPost.workshop.day}</div>
                     <div class="img-wrapper">
                         <img src="${calendarPost.img}" alt="">
                            </div>
                            <figcaption>
                                <h4>${calendarPost.title}</h4>
                                <p>${calendarPost.description}</p>
                                <div class="post-inf">
                                    <div class="date">
                                        <img src="img/icons/clock_white.svg" alt="clock time hour">
                                        <p>${calendarPost.workshop.timeFrom} - ${calendarPost.workshop.timeTo}</p>
                                    </div>
                                <div class="location">
                            <img src="img/icons/pin_white.svg" alt="pin location maps">
                        <p>${calendarPost.workshop.location}k</p>
                    </div>
                 </div>
             </figcaption>
        </figure>`);
    });
};

let findByPage = () => {
    const selectedPage = document.getElementsByClassName('selected')[0].innerHTML;
    postData('http://127.0.0.1:12345/getpostperpage', {
            'tag': selectedPage
        })
        .then(data => {
            console.log(data, selectedPage);
            if (document.getElementById('workshop-calendar') != null) {
                showWorkshops(data);
            } else {
                const selectedToLower = selectedPage.toLocaleLowerCase();
                showBlogposts(`posts`, data);
            }
        })
}

if (document.getElementById('updates') != null || document.getElementById('blogpost') != null || document.querySelector('#search input') != null) {} else {
    findByPage();
}

// findByPage();

let findPost = (selectedId) => {
    postData('http://127.0.0.1:12345/getPost', {
            'id': selectedId
        })
        .then(data => {
            showPost(data);
        })
}

let showPost = post => {
    const blogpostDiv = document.querySelector('#blogpost');
    blogpostDiv.innerHTML = `<h1>${post.title}</h1>
        <div id="blog-inf">
            <p id="blog-tags" ></p>
            <p id="added-on"> Geplaats op: ${post.day}/${post.month}/${post.year}</p>
        </div>
    <div id="article">
        <div id="inl">
         <p>${post.description}</p></div>
         <img src="${post.img}">
        <div id="content">${ post.content}</div>
    </div>`;

    post.tags.forEach(tag => {
        let tagDiv = document.getElementById('#blog-tags');
        tagDiv.insertAdjacentHTML('beforeend', `${tag}`);
    })
}

const blogpost = document.getElementById('blogpost');

if (blogpost != null) {
    const url = window.location.href;
    const selectedPage = url.split('id=');
    findPost(selectedPage[1]);
}