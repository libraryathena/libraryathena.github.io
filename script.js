const menuButton = document.querySelector(".nav-btn");
const dropdown = document.querySelector(".dropdown");
const snackbar = document.querySelector("#snackbar");

const guestSubmitButton = document.querySelector("#guest-submit");
const guestFirstName = document.querySelector("#guest-first-name");
const guestLastName = document.querySelector("#guest-last-name");
const guestCabin = document.querySelector("#guest-cabin");
const guestDate = document.querySelector("#guest-date");

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
// gsap.registerPlugin(SplitText);

select = e => document.querySelector(e);
selectAll = e => document.querySelectorAll(e);

const stage = select('.stage');
const slides = selectAll(".slide");
const links = selectAll(".slide__scroll-link");
const titles = selectAll('.col__content-title');
const overlay = select('.overlay');
// const introTitle = new SplitText('.intro__title', {type: "lines", linesClass: "intro-line"});
// const splitTitles = new SplitText(titles, {type: "lines, chars", linesClass: "line", charsClass: "char", position: "relative" });
let slideID = 0;

const carousel = select('.carousel');

function initHeader() {

    // animate the logo and fake burger button into place

    let tl = gsap.timeline({ delay: 0.5 });

    tl.from('.logo', {
        y: -40,
        opacity: 0,
        duration: 2,
        ease: 'power4'
    })
        .from('.nav-btn__svg rect', {
            scale: 0,
            transformOrigin: "center right",
            duration: 0.6,
            ease: 'power4',
            stagger: 0.1
        }, 0.6)
        .to('.nav-rect', {
            scale: 0.8,
            transformOrigin: "center left",
            duration: 0.4,
            ease: 'power2',
            stagger: 0.1
        }, "-=0.6")

    // create mouse animations for the faux burger button

    let navBtn = select('.nav-btn');

    navBtn.addEventListener("mouseover", (e) => {
        gsap.to('.nav-rect', {
            scaleX: 1,
            transformOrigin: "top left",
            duration: 0.4,
            ease: "power4"
        });
    });

    navBtn.addEventListener("mouseout", (e) => {
        gsap.to('.nav-rect', {
            scaleX: 0.8,
            transformOrigin: "top left",
            duration: 0.6,
            ease: "power4"
        });
    });
}

function initIntro() {

    // animate the intro elements into place

    let tl = gsap.timeline({ delay: 1.2 });

    tl
        .from('.intro__txt', {
            x: -100,
            opacity: 0,
            ease: 'power4',
            duration: 3
        }, 0.7)
        .from('.intro__img--1', {
            // x: -50,
            y: 50,
            opacity: 0,
            ease: 'power2',
            duration: 10
        }, 1)
        .from('.intro__img--2', {
            // x: 50,
            y: -50,
            opacity: 0,
            ease: 'power2',
            duration: 10
        }, 1);

    // set up scrollTrigger animation for the when the intro scrolls out

    let stl = gsap.timeline({
        scrollTrigger: {
            trigger: '.intro',
            scrub: 1,
            start: "top bottom", // position of trigger meets the scroller position
            end: "bottom top"
        }
    });

    stl.to('.intro__title', {
        x: 400,
        ease: 'power4.in',
        duration: 3,

    })
        .to('.intro__txt', {
            y: 100,
            ease: 'power4.in',
            duration: 3,
        }, 0);
}

function initRules() {
    let tl = gsap.timeline({ delay: 1.2 });
    let slideIns = selectAll('.slide-in');

    slideIns.forEach((slide) => {
        tl.from(slide, {
            x: 400,
            opacity: 0,
            ease: 'power4',
            duration: 2
        }, 0.7);
    });

    // let stl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: '.slide-out-trigger',
    //         scrub: 1,
    //         start: "top bottom", // position of trigger meets the scroller position
    //         end: "bottom top"
    //     }
    // });

    // slideIns.forEach((slide) => {
    //     stl.to(slide, {
    //         x: 400,
    //         y: "-50%",
    //         ease: 'power4.in',
    //         duration: 3,
    //     }, 0);
    // });
}

function initLinks() {

    // ScrollToPlugin links

    links.forEach((link, index, e) => {

        let linkST = link.querySelector('.slide__scroll-line');

        link.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 2,
                scrollTo: {
                    y: "#slide-" + (index + 2)
                },
                ease: "power2.inOut"
            });
            slideID++;
        });

        link.addEventListener("mouseover", (e) => {
            gsap.to(linkST, {
                y: 40,
                transformOrigin: "bottom center",
                duration: 0.6,
                ease: "power4"
            });
        });

        link.addEventListener("mouseout", (e) => {
            gsap.to(linkST, {
                y: 0,
                transformOrigin: "bottom center",
                duration: 0.6,
                ease: "power4"
            });
        });

    });

    // ScrollToPlugin link back to the top

    let top = select('.footer__link-top');

    top.addEventListener("click", (e) => {
        e.preventDefault();
        scrollTop();
    });

    top.addEventListener("mouseover", (e) => {
        gsap.to('.footer__link-top-line', {
            scaleY: 3,
            transformOrigin: "bottom center",
            duration: 0.6,
            ease: "power4"
        });
    });

    top.addEventListener("mouseout", (e) => {
        gsap.to('.footer__link-top-line', {
            scaleY: 1,
            transformOrigin: "bottom center",
            duration: 0.6,
            ease: "power4"
        });
    });

    // Dummy slide links

    let slideLinks = selectAll('.slide-link');

    slideLinks.forEach((slideLink, index, e) => {

        let slideL = slideLink.querySelector('.slide-link__line');

        slideLink.addEventListener("mouseover", (e) => {
            gsap.to(slideL, {
                x: 20,
                scaleX: 0.3,
                transformOrigin: "right center",
                duration: 0.8,
                ease: "power4"
            });
        });
        slideLink.addEventListener("mouseout", (e) => {
            gsap.to(slideL, {
                x: 0,
                scaleX: 1,
                transformOrigin: "right center",
                duration: 0.8,
                ease: "power4"
            });
        });
    })
}

function initSlides() {

    // Animation of each slide scrolling into view

    slides.forEach((slide, i) => {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: "40% 50%", // position of trigger meets the scroller position
            }
        });

        tl.from(slide.querySelectorAll('.col__content-title'), {
            ease: "power4",
            y: "+=5vh",
            duration: 2.5,
        })
            .from(slide.querySelectorAll('.line__inner'), {
                y: 200,
                duration: 2,
                ease: "power4",
                stagger: 0.1
            }, 0)
            .from(slide.querySelectorAll('.col__content-txt'), {
                x: 100,
                y: 50,
                opacity: 0,
                duration: 2,
                ease: "power4"
            }, 0.4)
            .from(slide.querySelectorAll('.slide-link'), {
                x: -100,
                y: 100,
                opacity: 0,
                duration: 2,
                ease: "power4"
            }, 0.3)
            .from(slide.querySelectorAll('.slide__scroll-link'), {
                y: 200,
                duration: 3,
                ease: "power4"
            }, 0.4)
            .to(slide.querySelectorAll('.slide__scroll-line'), {
                scaleY: 0.6,
                transformOrigin: "bottom left",
                duration: 2.5,
                ease: "elastic(1,0.5)"
            }, 1.4)
    });

    // External footer link scroll animation

    gsap.from('.footer__link', {
        scrollTrigger: {
            trigger: '.footer',
            scrub: 2,
            start: "50% 100%", // position of trigger meets the scroller position
            end: "0% 0%",
        },
        y: "20vh",
        ease: 'sine'
    })
}

function initParallax() {

    slides.forEach((slide, i) => {
        let imageWrappers = slide.querySelectorAll('.col__image-wrap');

        gsap.fromTo(imageWrappers, {
            y: "-30vh"
        }, {
            y: "30vh",
            scrollTrigger: {
                trigger: slide,
                scrub: true,
                start: "top bottom", // position of trigger meets the scroller position
                snap: {
                    snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
                    duration: 1,
                    ease: 'power4.inOut'
                }
            },
            ease: 'none'
        })
    });
}

function scrollTop() {
    gsap.to(window, {
        duration: 2,
        scrollTo: {
            y: "#slide-0"
        },
        ease: "power2.inOut"
    });
    gsap.to('.footer__link-top-line', {
        scaleY: 1,
        transformOrigin: "bottom center",
        duration: 0.6,
        ease: "power4"
    });
}

function scrollToIndex(index) {
    gsap.to(window, {
        duration: 1.0,
        scrollTo: {
            y: "#slide-" + (index)
        },
        ease: "power2.inOut"
    });
    slideID = index;
}

function initKeys() {
    document.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowDown') { // down arrow to next slide
            e.preventDefault();
            if (slideID <= slides.length) {
                slideID++;
                gsap.to(window, {
                    duration: 2,
                    scrollTo: {
                        y: "#slide-" + slideID
                    },
                    ease: "power2.inOut"
                });
            }
        }
        else if (e.key == 'ArrowUp') { // up arrow to top
            e.preventDefault();
            slideID = 0;
            scrollTop();
        }
    });
}

function init() {
    gsap.set(stage, { autoAlpha: 1 });
    initHeader();
    initIntro();
    initRules();
    initLinks();
    initSlides();
    initParallax();
    initKeys();
}

function toggleNavBar() {
    if (dropdown.style.height == '0px') {
        dropdown.style.height = '30vh';
        dropdown.style.paddingTop = '60px';
        dropdown.style.paddingBottom = '60px';
    } else {
        dropdown.style.height = '0px';
        dropdown.style.paddingTop = '0px';
        dropdown.style.paddingBottom = '0px';
    }
}

let libWings = [
    // Wing Section
    {
        name: "Fiction Section 01",
        img: "assets/lib-section-1.jpg",
        description: "This aisle is housing </br> Action & Adventure, Crime & Mystery, and Fantasy books."
    },
    {
        name: "Fiction Section 02",
        img: "assets/lib-section-2.jpg",
        description: "This aisle is housing </br> Horror, Romance, and Science Fiction books."
    },
    {
        name: "Non-fiction Section 01",
        img: "assets/lib-section-3.jpg",
        description: "This aisle is housing </br> Academic, Bibliography, Biography, and Essay books."
    },
    {
        name: "Non-fiction Section 02",
        img: "assets/lib-section-4.jpg",
        description: "This aisle is housing </br> Journalistic writing, Reference work, </br> Self-help, and Travel books."
    },
    // Reading Rooms
    {
        name: "West Wing",
        img: "assets/lib-read-1.jpg",
        description: ""
    },
    {
        name: "East Wing",
        img: "assets/lib-read-2.jpg",
        description: ""
    },
    {
        name: "North Wing",
        img: "assets/lib-read-3.jpg",
        description: ""
    },
    {
        name: "South Wing",
        img: "assets/lib-read-4.jpg",
        description: ""
    },
];

window.onload = () => {

    menuButton.onclick = toggleNavBar;
    guestDate.valueAsDate = new Date();
    guestDate.min = new Date().toISOString().slice(0, -14);
    guestSubmitButton.onclick = () => {
        event.preventDefault();
        addGuest();
    }

    init();

    loadReview();
    loadStories();

    initShortStories();

    let toBookSection = document.querySelector('#to-booksection');
    toBookSection.onclick = () => {
        // stage.classList.add('hidden');
        // vid.classList.remove('hidden');
        // vid.play();

        location.href = './booksection/index.html';
    }

    select('#review-button').onclick = () => {
        $('.overlay').fadeIn();
        $('.carousel').fadeIn();
        if (!flkty) initCarousel();
    }

    select('.overlay-wing-content').addEventListener('click', e => e.stopPropagation());
    select('.carousel').addEventListener('click', e => e.stopPropagation());

    overlay.addEventListener('click', (e) => {
        $('.overlay').fadeOut();
        $('.overlay-wing-content').fadeOut();
        $('.carousel').fadeOut();
    });

    selectAll('.grid-img-container').forEach((elm, i) => {
        elm.onclick = () => {
            $('.overlay').fadeIn();
            $('.overlay-wing-content').fadeIn();
            select('.wing-img').src = libWings[i].img;
            select('.wing-title').innerText = libWings[i].name;
            select('.wing-desc').innerHTML = libWings[i].description;
        }
    });
};

var reviews = [];

function loadReview() {
    db.collection('library')
        .doc('review').get()
        .then((doc) => {
            reviews = doc.data().reviews.slice(-10);

            reviews.forEach((review) => {
                carousel.innerHTML += `
                <div class="carousel-cell">
                    <div class="review-flex">
                        <img class="review-img" src="${review.cover}">
                        <div class="review-container">
                            <div class="review-title">${review.title}</div>
                            <div class="review-content">${review.content}</div>
                        </div>
                    </div>
                </div>
                `;
            });
        });
}

function loadStories() {
    let isScreenLandscape = screen.orientation.type.includes('landscape');
    let isScreenWidthGreater = screen.availWidth > screen.availHeight;
    if (isScreenLandscape || isScreenWidthGreater) {
        let getFileName = (page) => page == 0 ?
            `${page.toString().padStart(4, '0')}.png` : `${page.toString().padStart(4, '0')}.jpg`

        for (i = 0; i <= 52; i += 2) {
            select('.short-stories-center').innerHTML += `
        <div class="carousel-cell">
            <div class="review-flex">
                <div class="review-container">
                    <img src="assets/stories/MEMORIES%20OF%20KWANGYA_page-${getFileName(i)}">
                    <img src="assets/stories/MEMORIES%20OF%20KWANGYA_page-${getFileName(i + 1)}">
                </div>
            </div>
        </div>
        `;
        }
    } else {
        for (i = 1; i <= 52; i++) {
            select('.short-stories-center').innerHTML += `
            <div class="carousel-cell">
                <div class="review-flex">
                    <div class="review-container">
                        <img src="assets/stories/MEMORIES%20OF%20KWANGYA_page-${i.toString().padStart(4, '0')}.jpg">
                    </div>
                </div>
            </div>
            `;
        }
    }
}

var flkty = null;

function initCarousel() {
    // element argument can be a selector string
    //   for an individual element
    flkty = new Flickity(carousel, {
        // options
        wrapAround: true,
        initialIndex: reviews.length - 1
    });

    carousel.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
}

function initShortStories() {
    var stories = new Flickity(select('.short-stories-center'), {
        wrapAround: true,
        initialIndex: reviews.length - 1
    });
}

function addGuest() {
    db.collection('library')
        .doc('guestbook')
        .update({
            entries: firebase.firestore.FieldValue.arrayUnion({
                firstName: guestFirstName.value,
                lastName: guestLastName.value,
                cabin: guestCabin.value,
                date: guestDate.value
            })
        })
        .then(() => {
            scrollToIndex(4);

            $('.overlay').fadeIn();
            $('.guest-card-overlay').fadeIn();
            let guestCard = select("#card");
            let context = guestCard.getContext("2d");

            const image = new Image();
            image.src = "assets/boarding-pass.jpg";
            image.onload = () => {
                guestCard.width = image.width;
                guestCard.height = image.height;
                context.drawImage(image, 0, 0, guestCard.width, guestCard.height);
                context.textAlign = "left";
                let fontSize = 24;
                let fontStyle = "Arial";
                context.font = `bold ${fontSize}px ${fontStyle}`;
                context.fillText(`${guestLastName.value} ${guestFirstName.value}`, 100, 138);
                context.fillText(`${guestDate.value}`, 100, 175);

                let download = select("#library-card");
                download.onclick = () => {
                    var url = guestCard.toDataURL("image/png");
                    download.href = url;
                }
            }

            snackbar.innerHTML = `Welcome, ${guestLastName.value} ${guestFirstName.value}`;
            snackbar.className = "show";
            setTimeout(() => snackbar.className = snackbar.className.replace("show", ""), 3000);
        });
}