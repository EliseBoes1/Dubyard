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

async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
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

let showAllPosts = (divToAppend, blogposts) => {
    let allPostsEl = document.querySelector(divToAppend);
    blogposts.forEach(post => {
        if (post.tags.includes('Voeding')) {
            const postImg = encodeURI(post.img);
            allPostsEl.prepend(`
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
                <p class="line"></p>  
                    <a href="recept.html?id=${post.id}" class="read-more ${post.id}">
                            Bekijk recept >>
                        </a>
                </figcaption>
            </figure>
        `)
        } else {
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
                <p class="line"></p>  
                    <a href="blogpost.html?id=${post.id}" class="read-more ${post.id}">
                            Lees blogpost >>
                        </a>
                </figcaption>
            </figure>
        `)
        }
    });
};

let showBlogposts = (divToAppend, blogposts) => {
    let allPostsEl = document.getElementById(divToAppend);
    for (let i = 0; i < 9; i++) {
        const post = blogposts[i]
        if (post.tags.includes('Voeding')) {
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
                <p class="line"></p>  
                    <a href="recept.html?id=${post.id}" class="read-more ${post.id}">
                            Bekijk recept >>
                        </a>
                </figcaption>
            </figure>
        `)
        } else {
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
                <p class="line"></p>  
                    <a href="blogpost.html?id=${post.id}" class="read-more ${post.id}">
                            Lees blogpost >>
                        </a>
                </figcaption>
            </figure>
        `)
        }
    };
};
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
        const recipeTime = recipe.recept.time;
        const recipeEdition = recipe.recept.edition;
        let recipesEl = document.getElementById('posts');
        recipesEl.insertAdjacentHTML('beforeend', `
        <figure id="${recipe.id}" class="reg-post ${recipeEdition} ${recipeTime}">
        <h3>${recipe.title}</h3>
        <div class="post-inf">
            <p class="added-on">Geplaatst op: ${recipe.day}/${recipe.month}/${recipe.year}</p>
            <p class="post-tag">${recipe.tags[0]}</p>
        </div>
        <img src="${recipe.img}">
        <figcaption>
        <p class="line"></p>   
        <a href="recept.html?id=${recipe.id}" class="read-more ${recipe.id}">
                Bekijk recept >>
            </a>
        </figcaption>
    </figure>
        `);
    });

    goToBlogPost(recipes);
    let searchEl = document.getElementById('search-recipe');
    searchEl.addEventListener('keyup', function () {
        searchRecipes(this.value);
    });

    let searchRecipes = (searchInput) => {
        let recipesEl = document.getElementById('posts');
        recipesEl.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeTime = recipe.recept.time;
            const recipeEdition = recipe.recept.edition;
            const recipeTitle = recipe['title'].toLocaleLowerCase();
            if (recipeTitle.includes(searchInput.toLocaleLowerCase())) {
                recipesEl.insertAdjacentHTML('beforeend', `
        <figure id="${recipe.id}" class="reg-post ${recipeTime} ${recipeEdition}">
        <h3>${recipe.title}</h3>
        <div class="post-inf">
            <p class="added-on">Geplaatst op: ${recipe.day}/${recipe.month}/${recipe.year}</p>
            <p class="post-tag">${recipe.tags[0]}</p>
        </div>
        <img src="${recipe.img}">
        <figcaption>
        <p class="line"></p>   
        <a href="recept.html?id=${recipe.id}" class="read-more ${recipe.id}">
                Bekijk recept >>
            </a>
        </figcaption>
    </figure>
        `);
            }
        });
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

    const nextYear = new Date().getFullYear() + 1;
    const myCalender = new CalendarPicker('#calendar .calendar', {
        // If max < min or min > max then the only available day will be today.
        min: new Date(),
        max: new Date(nextYear, 10) // NOTE: new Date(nextYear, 10) is "Sun Nov 01 nextYear"
    });

    // const currentDateElement = document.getElementById('current-date');
    // currentDateElement.textContent = myCalender.value;

    // const currentDayElement = document.getElementById('current-day');
    // currentDayElement.textContent = myCalender.value.getDay();

    // const currentToDateString = document.getElementById('current-datestring');
    // currentToDateString.textContent = myCalender.value.toDateString();

    // myCalender.onValueChange((currentValue) => {
    //    currentDateElement.textContent = currentValue;
    //    currentDayElement.textContent = currentValue.getDay();
    //    currentToDateString.textContent = currentValue.toDateString();
    //    console.log(`The current value of the calendar is: ${currentValue}`);
    // });
});

let date = new Date();

let showWorkshops = posts => {
    let updateMonth = (newMonth, newYear = 2020) => {
        const monthControlsDiv = document.querySelector('#month-controls p');
        monthControlsDiv.innerHTML = '';
        monthControlsDiv.insertAdjacentHTML(`beforeend`, `
            ${newMonth} , <span class="bold">${newYear}</span>
        `);
    }

    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const monthControlsDiv = document.querySelector('#month-controls p');
    monthControlsDiv.innerHTML = `${currentMonth} , <span class="bold">${currentYear}</span>`;
    const activeMonth = +monthControlsDiv.textContent.trim().substr(0, 2);
    const activeYear = +monthControlsDiv.textContent.trim().substr(4, 8);

    let updatePosts = (posts, activeMonth, activeYear) => {
        const calendarpostsDiv = document.getElementById('calendar-posts');
        calendarpostsDiv.innerHTML = '';
        posts.forEach(calendarPost => {
            if (calendarPost.workshop.month == activeMonth && calendarPost.workshop.year == activeYear) {
                const calendarpostsDiv = document.getElementById('calendar-posts');
                calendarpostsDiv.insertAdjacentHTML('beforeend', `
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
            }
        });
    }

    let monthControls = document.querySelectorAll('#month-controls img');
    monthControls[0].addEventListener('click', function () {
        const activeMonth = +monthControlsDiv.textContent.trim().substr(0, 2);
        const activeYear = +monthControlsDiv.textContent.trim().substr(4, 8);
        showPrevMonth(activeMonth);
        checkYear(activeMonth, activeYear);
    });
    monthControls[1].addEventListener('click', function () {
        const activeMonth = +monthControlsDiv.textContent.trim().substr(0, 2);
        const activeYear = +monthControlsDiv.textContent.trim().substr(4, 8);
        showNextMonth(activeMonth);
        // checkYear(activeMonth, activeYear);
    });

    // let checkYear = (activeMonth, activeYear) => {
    //     if(activeMonth == 1){
    //         activeYear = activeYear-1;
    //         activeMonth = 12;
    //         updateMonth(activeMonth, activeYear);
    //         updatePosts(posts, activeMonth, activeYear);
    //     }else if(activeMonth = 12){
    //         activeYear = activeYear +1;
    //         activeMonth = 1;
    //         updateMonth(activeMonth, activeYear);
    //         updatePosts(posts, activeMonth, activeYear);
    //     }else{

    //     }
    // }

    let showPrevMonth = activeMonth => {
        if (activeMonth != 1) {
            activeMonth = (+activeMonth) - 1;
            updateMonth(activeMonth);
            updatePosts(posts, activeMonth, activeYear);
        }
    }

    let showNextMonth = activeMonth => {
        console.log(activeMonth);
        if (activeMonth != 12) {
            activeMonth = (+activeMonth) + 1;
            updateMonth(activeMonth);
            updatePosts(posts, activeMonth, activeYear);
        } else {
            activeMonth = 0;
            activeYear += 1;
        }
    }
    updatePosts(posts, activeMonth, activeYear);
};

let findByPage = () => {
    let selectedPage = document.getElementsByClassName('selected')[0].innerHTML;
    if (selectedPage == 'Kunst &amp; Deco') {
        selectedPage = 'Kunstdeco'
    }
    if (selectedPage == 'Home') {
        getData('http://127.0.0.1:12345/allposts')
            .then(data => {
                showBlogposts(`posts-wrapper`, data);
            });
    } else {
        postData('http://127.0.0.1:12345/getpostperpage', {
                'tag': selectedPage
            })
            .then(data => {
                const selectedToLower = selectedPage.toLocaleLowerCase();
                if (document.getElementById('workshop-calendar') != null) {
                    showWorkshops(data);
                } else if (document.getElementById('recipes') != null) {
                    const recipes = data.filter(post => post.tags.includes('Voeding'));
                    showAllRecipes(recipes);
                } else {
                    showAllPosts(`#posts`, data);
                }
            })
    }

}

if (document.getElementById('blogpost') != null) {} else {
    findByPage();
}

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
    if (post.tags.includes('Voeding')) {
        const ingrEl = document.querySelector('#ingredients ul');
        const titleEl = document.querySelector('#recipe-inf article');
        titleEl.innerHTML = `  <h1>${post.title}</h1>
        <ul>
            <li>
                <img src="img/icons/clock_white.svg" alt="">
                <p>${post.recept.cookdur}</p>   
            </li>
            <li>
                <img src="img/icons/group_white.svg" alt="">
                <p>${post.recept.amtpeople}</p>
            </li>
        </ul>
    <p>${post.description} </p>`;
        post.recept.ingredients.forEach(ingredient => {
            ingrEl.insertAdjacentHTML('beforeend', `
                <li>${ingredient}</li>
            `)
        });
        blogpostDiv.innerHTML = `
    <div id="article">
        <div id="content">${ post.content}</div>
    </div>`;
        const recipeHeader = document.querySelector('#recipe-header img');
        recipeHeader.src = post.img;
    } else {
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
        });
    }
}

const blogpost = document.getElementById('blogpost');
const recipe = document.getElementById('recipe');

if (blogpost != null) {
    const url = window.location.href;
    const selectedPage = url.split('id=');
    findPost(selectedPage[1]);
}

const allPostsEl = document.getElementById('allposts');
if (allPostsEl.length != 0) {
    getData('http://127.0.0.1:12345/allposts')
        .then(data => {
            showAllPosts('#allposts #posts #posts-wrapper', data)
        });
}