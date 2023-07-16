const customSlider = document.querySelector(".customSlider");
const slider = document.querySelector(".slider");
const firstCardWidth = slider.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".customSlider i");
const sliderChildrens = [...slider.children];

let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

// Get the number of cards that can fit in the slider at once
let cardPerView = Math.round(slider.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of slider for infinite scrolling
sliderChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
        slider.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

// Insert copies of the first few cards to end of slider for infinite scrolling
sliderChildrens.slice(0, cardPerView).forEach((card) => {
    slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the slider at appropriate postition to hide first few duplicate cards on Firefox
slider.classList.add("no-transition");
slider.scrollLeft = slider.offsetWidth;
slider.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the slider left and right
arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        slider.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    slider.classList.add("dragging");
    // Records the initial cursor and scroll position of the slider
    startX = e.pageX;
    startScrollLeft = slider.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the slider based on the cursor movement
    slider.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    slider.classList.remove("dragging");
};

const infiniteScroll = () => {
    // If the slider is at the beginning, scroll to the end
    if (slider.scrollLeft === 0) {
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.scrollWidth - 2 * slider.offsetWidth;
        slider.classList.remove("no-transition");
    }
    // If the slider is at the end, scroll to the beginning
    else if (
        Math.ceil(slider.scrollLeft) ===
        slider.scrollWidth - slider.offsetWidth
    ) {
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.offsetWidth;
        slider.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over slider
    clearTimeout(timeoutId);
    if (!customSlider.matches(":hover")) autoPlay();
};

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the slider after every 2500 ms
    timeoutId = setTimeout(() => (slider.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
slider.addEventListener("scroll", infiniteScroll);
customSlider.addEventListener("mouseenter", () => clearTimeout(timeoutId));
customSlider.addEventListener("mouseleave", autoPlay);


// Recently played games slider

const recent_play_game = document.querySelector(".recent_play_game");
const recent_play_game_slider = document.querySelector(
    ".recent_play_game_slider"
);
const recentPlayFirstCardWidth =
    recent_play_game_slider.querySelector(".recent_play_card").offsetWidth;
const recentPlayArrowBtns = document.querySelectorAll(".recent_play_game i");
const recentPlayrChildren = [...recent_play_game_slider.children];

let isDraggingRecentPlay = false,
    isAutoRecentPlay = true,
    recentPlayStartX,
    recentPlayStartScrollLeft,
    recentPlayTimeoutId;

// Get the number of cards that can fit in the recent at once
let recentPlaycardPerView = Math.round(
    recent_play_game_slider.offsetWidth / recentPlayFirstCardWidth
);

// Insert copies of the last few cards to beginning of recent for infinite scrolling
recentPlayrChildren
    .slice(-recentPlaycardPerView)
    .reverse()
    .forEach((card) => {
        recent_play_game_slider.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

// Insert copies of the first few cards to end of recent for infinite scrolling
recentPlayrChildren.slice(0, recentPlaycardPerView).forEach((card) => {
    recent_play_game_slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the recent at appropriate postition to hide first few duplicate cards on Firefox
recent_play_game_slider.classList.add("no-transition");
recent_play_game_slider.scrollLeft = recent_play_game_slider.offsetWidth;
recent_play_game_slider.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the recent left and right
recentPlayArrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        recent_play_game_slider.scrollLeft +=
            btn.id == "left" ? -recentPlayFirstCardWidth : recentPlayFirstCardWidth;
    });
});

const recentPlayStartDrag = (e) => {
    isDraggingRecentPlay = true;
    recent_play_game_slider.classList.add("dragging");
    // Records the initial cursor and scroll position of the recent
    recentPlayStartX = e.pageX;
    recentPlayStartScrollLeft = recent_play_game_slider.scrollLeft;
};

const recentPlayDragMove = (e) => {
    if (!isDraggingRecentPlay) return; // if isDraggingRecentPlay is false return from here
    // Updates the scroll position of the recent based on the cursor movement
    recent_play_game_slider.scrollLeft =
        recentPlayStartScrollLeft - (e.pageX - recentPlayStartX);
};

const recentPlayStopDrag = () => {
    isDraggingRecentPlay = false;
    recent_play_game_slider.classList.remove("dragging");
};

const recentPlayHandleInfiniteScroll = () => {
    // If the recent is at the beginning, scroll to the end
    if (recent.scrollLeft === 0) {
        recent_play_game_slider.classList.add("no-transition");
        recent.scrollLeft =
            recent_play_game_slider.scrollWidth -
            2 * recent_play_game_slider.offsetWidth;
        recent_play_game_slider.classList.remove("no-transition");
    }
    // If the recent is at the end, scroll to the beginning
    else if (
        Math.ceil(recent.scrollLeft) ===
        recent_play_game_slider.scrollWidth - recent_play_game_slider.offsetWidth
    ) {
        recent_play_game_slider.classList.add("no-transition");
        recent_play_game_slider.scrollLeft = recent_play_game_slider.offsetWidth;
        recent_play_game_slider.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over recent
    clearTimeout(recentPlayTimeoutId);
    if (!recent_play_game.matches(":hover")) recentPlayStartAutoPlay();
};

const recentPlayStartAutoPlay = () => {
    if (window.innerWidth < 800 || !isAutoRecentPlay) return; // Return if window is smaller than 800 or isAutoRecentPlay is false
    // Autoplay the recent after every 2500 ms
    recentPlayTimeoutId = setTimeout(
        () => (recent_play_game_slider.scrollLeft += recentPlayFirstCardWidth),
        2500
    );
};
recentPlayStartAutoPlay();

recent_play_game_slider.addEventListener("mousedown", recentPlayStartDrag);
recent_play_game_slider.addEventListener("mousemove", recentPlayDragMove);
document.addEventListener("mouseup", recentPlayStopDrag);
recent_play_game_slider.addEventListener(
    "scroll",
    recentPlayHandleInfiniteScroll
);
recent_play_game.addEventListener("mouseenter", () =>
    clearTimeout(recentPlayTimeoutId)
);
recent_play_game.addEventListener("mouseleave", recentPlayStartAutoPlay);




// hit play slider 
const hit_game = document.querySelector(".hit_game");
const hit_game_slider = document.querySelector(".hit_game_slider");
const hitGameFirstCardWidth =
    hit_game_slider.querySelector(".hit_play_card").offsetWidth;
const hitGameArrowBtns = document.querySelectorAll(".hit_game i");
const hitGamerChildren = [...hit_game_slider.children];

let isDragginghitGame = false,
    isAutohitGame = true,
    hitGameStartX,
    hitGameStartScrollLeft,
    hitGameTimeoutId;

// Get the number of cards that can fit in the recent at once
let hitGamecardPerView = Math.round(
    hit_game_slider.offsetWidth / hitGameFirstCardWidth
);

// Insert copies of the last few cards to beginning of recent for infinite scrolling
hitGamerChildren
    .slice(-hitGamecardPerView)
    .reverse()
    .forEach((card) => {
        hit_game_slider.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

// Insert copies of the first few cards to end of recent for infinite scrolling
hitGamerChildren.slice(0, hitGamecardPerView).forEach((card) => {
    hit_game_slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the recent at appropriate postition to hide first few duplicate cards on Firefox
hit_game_slider.classList.add("no-transition");
hit_game_slider.scrollLeft = hit_game_slider.offsetWidth;
hit_game_slider.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the recent left and right
hitGameArrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        hit_game_slider.scrollLeft +=
            btn.id == "left" ? -hitGameFirstCardWidth : hitGameFirstCardWidth;
    });
});

const hitGameStartDrag = (e) => {
    isDragginghitGame = true;
    hit_game_slider.classList.add("dragging");
    // Records the initial cursor and scroll position of the recent
    hitGameStartX = e.pageX;
    hitGameStartScrollLeft = hit_game_slider.scrollLeft;
};

const hitGameDragMove = (e) => {
    if (!isDragginghitGame) return; // if isDragginghitGame is false return from here
    // Updates the scroll position of the recent based on the cursor movement
    hit_game_slider.scrollLeft =
        hitGameStartScrollLeft - (e.pageX - hitGameStartX);
};

const hitGameStopDrag = () => {
    isDragginghitGame = false;
    hit_game_slider.classList.remove("dragging");
};

const hitGameHandleInfiniteScroll = () => {
    // If the recent is at the beginning, scroll to the end
    if (recent.scrollLeft === 0) {
        hit_game_slider.classList.add("no-transition");
        recent.scrollLeft =
            hit_game_slider.scrollWidth - 2 * hit_game_slider.offsetWidth;
        hit_game_slider.classList.remove("no-transition");
    }
    // If the recent is at the end, scroll to the beginning
    else if (
        Math.ceil(recent.scrollLeft) ===
        hit_game_slider.scrollWidth - hit_game_slider.offsetWidth
    ) {
        hit_game_slider.classList.add("no-transition");
        hit_game_slider.scrollLeft = hit_game_slider.offsetWidth;
        hit_game_slider.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over recent
    clearTimeout(hitGameTimeoutId);
    if (!hit_game.matches(":hover")) hitGameStartAutoPlay();
};

const hitGameStartAutoPlay = () => {
    if (window.innerWidth < 800 || !isAutohitGame) return; // Return if window is smaller than 800 or isAutohitGame is false
    // Autoplay the recent after every 2500 ms
    hitGameTimeoutId = setTimeout(
        () => (hit_game_slider.scrollLeft += hitGameFirstCardWidth),
        2500
    );
};
hitGameStartAutoPlay();

hit_game_slider.addEventListener("mousedown", hitGameStartDrag);
hit_game_slider.addEventListener("mousemove", hitGameDragMove);
document.addEventListener("mouseup", hitGameStopDrag);
hit_game_slider.addEventListener("scroll", hitGameHandleInfiniteScroll);
hit_game.addEventListener("mouseenter", () => clearTimeout(hitGameTimeoutId));
hit_game.addEventListener("mouseleave", hitGameStartAutoPlay);


// pG games slider 
const pg_game = document.querySelector(".pg_game");
const pg_game_slider = document.querySelector(".pg_game_slider");
const pgGameFirstCardWidth =
    pg_game_slider.querySelector(".pg_play_card").offsetWidth;
const pgGameArrowBtns = document.querySelectorAll(".pg_game i");
const pgGamerChildren = [...pg_game_slider.children];

let isDraggingpgGame = false,
    isAutopgGame = true,
    pgGameStartX,
    pgGameStartScrollLeft,
    pgGameTimeoutId;

// Get the number of cards that can fit in the recent at once
let pgGamecardPerView = Math.round(
    pg_game_slider.offsetWidth / pgGameFirstCardWidth
);

// Insert copies of the last few cards to beginning of recent for infinite scrolling
pgGamerChildren
    .slice(-pgGamecardPerView)
    .reverse()
    .forEach((card) => {
        pg_game_slider.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

// Insert copies of the first few cards to end of recent for infinite scrolling
pgGamerChildren.slice(0, pgGamecardPerView).forEach((card) => {
    pg_game_slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the recent at appropriate postition to hide first few duplicate cards on Firefox
pg_game_slider.classList.add("no-transition");
pg_game_slider.scrollLeft = pg_game_slider.offsetWidth;
pg_game_slider.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the recent left and right
pgGameArrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        pg_game_slider.scrollLeft +=
            btn.id == "left" ? -pgGameFirstCardWidth : pgGameFirstCardWidth;
    });
});

const pgGameStartDrag = (e) => {
    isDraggingpgGame = true;
    pg_game_slider.classList.add("dragging");
    // Records the initial cursor and scroll position of the recent
    pgGameStartX = e.pageX;
    pgGameStartScrollLeft = pg_game_slider.scrollLeft;
};

const pgGameDragMove = (e) => {
    if (!isDraggingpgGame) return; // if isDraggingpgGame is false return from here
    // Updates the scroll position of the recent based on the cursor movement
    pg_game_slider.scrollLeft = pgGameStartScrollLeft - (e.pageX - pgGameStartX);
};

const pgGameStopDrag = () => {
    isDraggingpgGame = false;
    pg_game_slider.classList.remove("dragging");
};

const pgGameHandleInfiniteScroll = () => {
    // If the recent is at the beginning, scroll to the end
    if (recent.scrollLeft === 0) {
        pg_game_slider.classList.add("no-transition");
        recent.scrollLeft =
            pg_game_slider.scrollWidth - 2 * pg_game_slider.offsetWidth;
        pg_game_slider.classList.remove("no-transition");
    }
    // If the recent is at the end, scroll to the beginning
    else if (
        Math.ceil(recent.scrollLeft) ===
        pg_game_slider.scrollWidth - pg_game_slider.offsetWidth
    ) {
        pg_game_slider.classList.add("no-transition");
        pg_game_slider.scrollLeft = pg_game_slider.offsetWidth;
        pg_game_slider.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over recent
    clearTimeout(pgGameTimeoutId);
    if (!pg_game.matches(":hover")) pgGameStartAutoPlay();
};

const pgGameStartAutoPlay = () => {
    if (window.innerWidth < 800 || !isAutopgGame) return; // Return if window is smaller than 800 or isAutopgGame is false
    // Autoplay the recent after every 2500 ms
    pgGameTimeoutId = setTimeout(
        () => (pg_game_slider.scrollLeft += pgGameFirstCardWidth),
        2500
    );
};
pgGameStartAutoPlay();

pg_game_slider.addEventListener("mousedown", pgGameStartDrag);
pg_game_slider.addEventListener("mousemove", pgGameDragMove);
document.addEventListener("mouseup", pgGameStopDrag);
pg_game_slider.addEventListener("scroll", pgGameHandleInfiniteScroll);
pg_game.addEventListener("mouseenter", () => clearTimeout(pgGameTimeoutId));
pg_game.addEventListener("mouseleave", pgGameStartAutoPlay);


// new arrival slot slider 
const new_arrival = document.querySelector(".new_arrival");
const new_arrival_slider = document.querySelector(".new_arrival_slider");
const newArrivalFirstCardWidth =
    new_arrival_slider.querySelector(".new_arrival_card").offsetWidth;
const newArrivalArrowBtns = document.querySelectorAll(".new_arrival i");
const newArrivalrChildren = [new_arrival_slider.children];

let isDraggingnewArrival = false,
    isAutonewArrival = true,
    newArrivalStartX,
    newArrivalStartScrollLeft,
    newArrivalTimeoutId;

// Get the number of cards that can fit in the recent at once
let newArrivalcardPerView = Math.round(
    new_arrival_slider.offsetWidth / newArrivalFirstCardWidth
);

// Insert copies of the last few cards to beginning of recent for infinite scrolling
newArrivalrChildren
    .slice(-newArrivalcardPerView)
    .reverse()
    .forEach((card) => {
        new_arrival_slider.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

// Insert copies of the first few cards to end of recent for infinite scrolling
newArrivalrChildren.slice(0, newArrivalcardPerView).forEach((card) => {
    new_arrival_slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the recent at appropriate postition to hide first few duplicate cards on Firefox
new_arrival_slider.classList.add("no-transition");
new_arrival_slider.scrollLeft = new_arrival_slider.offsetWidth;
new_arrival_slider.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the recent left and right
newArrivalArrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        new_arrival_slider.scrollLeft +=
            btn.id == "left" ? -newArrivalFirstCardWidth : newArrivalFirstCardWidth;
    });
});

const newArrivalStartDrag = (e) => {
    isDraggingnewArrival = true;
    new_arrival_slider.classList.add("dragging");
    // Records the initial cursor and scroll position of the recent
    newArrivalStartX = e.pageX;
    newArrivalStartScrollLeft = new_arrival_slider.scrollLeft;
};

const newArrivalDragMove = (e) => {
    if (!isDraggingnewArrival) return; // if isDraggingnewArrival is false return from here
    // Updates the scroll position of the recent based on the cursor movement
    new_arrival_slider.scrollLeft =
        newArrivalStartScrollLeft - (e.pageX - newArrivalStartX);
};

const newArrivalStopDrag = () => {
    isDraggingnewArrival = false;
    new_arrival_slider.classList.remove("dragging");
};

const newArrivalHandleInfiniteScroll = () => {
    // If the recent is at the beginning, scroll to the end
    if (recent.scrollLeft === 0) {
        new_arrival_slider.classList.add("no-transition");
        recent.scrollLeft =
            new_arrival_slider.scrollWidth - 2 * new_arrival_slider.offsetWidth;
        new_arrival_slider.classList.remove("no-transition");
    }
    // If the recent is at the end, scroll to the beginning
    else if (
        Math.ceil(recent.scrollLeft) ===
        new_arrival_slider.scrollWidth - new_arrival_slider.offsetWidth
    ) {
        new_arrival_slider.classList.add("no-transition");
        new_arrival_slider.scrollLeft = new_arrival_slider.offsetWidth;
        new_arrival_slider.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over recent
    clearTimeout(newArrivalTimeoutId);
    if (!new_arrival.matches(":hover")) newArrivalStartAutoPlay();
};

const newArrivalStartAutoPlay = () => {
    if (window.innerWidth < 800 || !isAutonewArrival) return; // Return if window is smaller than 800 or isAutonewArrival is false
    // Autoplay the recent after every 2500 ms
    newArrivalTimeoutId = setTimeout(
        () => (new_arrival_slider.scrollLeft += newArrivalFirstCardWidth),
        2500
    );
};
newArrivalStartAutoPlay();

new_arrival_slider.addEventListener("mousedown", newArrivalStartDrag);
new_arrival_slider.addEventListener("mousemove", newArrivalDragMove);
document.addEventListener("mouseup", newArrivalStopDrag);
new_arrival_slider.addEventListener("scroll", newArrivalHandleInfiniteScroll);
new_arrival.addEventListener("mouseenter", () =>
    clearTimeout(newArrivalTimeoutId)
);
new_arrival.addEventListener("mouseleave", newArrivalStartAutoPlay);



