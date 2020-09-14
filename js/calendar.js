'use strict';

// fetch('../data/calendar.json')
//     .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         showACalendarCards(data.calendar);
//     })
//     .catch(err => {})

// let showCalendarCards = calendarCards => {
//     let calendarDiv = document.getElementById('workshop-calendar');
//     calendarDiv.insertAdjacentHTML('beforeend', `
// <div id="month-controls">
//                 <img src="img/icons/left_arrow.svg" alt="left arrow left-arrow">
//                 <p>
//                     Januari,
//                     <span class="bold"> 2020</span>
//                 </p>
//                 <img src="img/icons/right_arrow.svg" alt="right arrow right-arrow">
//             </div>
//             <section id="posts">
//                 <figure class="head-post">
//                     <div class="num-calendar">2</div>
//                     <div class="img-wrapper">
//                         <img src="img/placeholders/pizza.jpg" alt="">
//                     </div>
//                     <figcaption>
//                         <h4>Dit is een titel</h4>
//                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptas officiis
//                             reiciendis totam deleniti laborum vel nulla accusantium, quos ipsam?</p>
//                         <div class="post-inf">
//                             <div class="date">
//                                 <img src="img/icons/clock_white.svg" alt="clock time hour">
//                                 <p> 16:00 - 18:00</p>
//                             </div>
//                             <div class="location">
//                                 <img src="img/icons/pin_white.svg" alt="pin location maps">
//                                 <p> Meerbeek</p>
//                             </div>
//                         </div>
//                     </figcaption>
//                 </figure>
//                 <figure class="reg-post">
//                     <div class="num-calendar">8</div>
//                     <div class="img-wrapper">
//                         <img src="img/placeholders/pexels-visually-us-1909572.jpg" alt="">
//                     </div>
//                     <figcaption>
//                         <h4>Dit is een titel</h4>
//                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptas officiis
//                             reiciendis totam deleniti laborum vel nulla accusantium, quos ipsam?</p>
//                         <div class="post-inf">
//                             <div class="date">
//                                 <img src="img/icons/clock_white.svg" alt="clock time hour">
//                                 <p> 16:00 - 18:00</p>
//                             </div>
//                             <div class="location">
//                                 <img src="img/icons/pin_white.svg" alt="pin location maps">
//                                 <p> Meerbeek</p>
//                             </div>
//                         </div>
//                     </figcaption>
//                 </figure>
//                 <figure class="reg-post">
//                     <div class="num-calendar">13</div>
//                     <div class="img-wrapper">
//                         <img src="img/placeholders/pexels-sergio-souza-3553903.jpg" alt="">
//                     </div>
//                     <figcaption>
//                         <h4>Dit is een titel</h4>
//                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptas officiis
//                             reiciendis totam deleniti laborum vel nulla accusantium, quos ipsam?</p>
//                         <div class="post-inf">
//                             <div class="date">
//                                 <img src="img/icons/clock_white.svg" alt="clock time hour">
//                                 <p> 16:00 - 18:00</p>
//                             </div>
//                             <div class="location">
//                                 <img src="img/icons/pin_white.svg" alt="pin location maps">
//                                 <p> Meerbeek</p>
//                             </div>
//                         </div>
//                     </figcaption>
//                 </figure>
//                 <figure class="reg-post">
//                     <div class="num-calendar">18</div>
//                     <div class="img-wrapper">
//                         <img src="img/placeholders/pexels-lisa-fotios-4938733.jpg" alt="">
//                     </div>
//                     <figcaption>
//                         <h4>Dit is een titel</h4>
//                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptas officiis
//                             reiciendis totam deleniti laborum vel nulla accusantium, quos ipsam?</p>
//                         <div class="post-inf">
//                             <div class="date">
//                                 <img src="img/icons/clock_white.svg" alt="clock time hour">
//                                 <p> 16:00 - 18:00</p>
//                             </div>
//                             <div class="location">
//                                 <img src="img/icons/pin_white.svg" alt="pin location maps">
//                                 <p> Meerbeek</p>
//                             </div>
//                         </div>
//                     </figcaption>
//                 </figure>
//                 <figure class="reg-post">
//                     <div class="num-calendar">24</div>
//                     <div class="img-wrapper">
//                         <img src="img/placeholders/pexels-buğra-doğan-3561946.jpg" alt="">
//                     </div>
//                     <figcaption>
//                         <h4>Dit is een titel</h4>
//                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptas officiis
//                             reiciendis totam deleniti laborum vel nulla accusantium, quos ipsam?</p>
//                         <div class="post-inf">
//                             <div class="date">
//                                 <img src="img/icons/clock_white.svg" alt="clock time hour">
//                                 <p> 16:00 - 18:00</p>
//                             </div>
//                             <div class="location">
//                                 <img src="img/icons/pin_white.svg" alt="pin location maps">
//                                 <p> Meerbeek</p>
//                             </div>
//                         </div>
//                     </figcaption>
//                 </figure>
//                 </div>
// `)

// }