// soothing fish slider 

(function () {
    const smoth_fish = document.querySelector(".smoth_fish");
    const smoth_fish_slider = document.querySelector(".smoth_fish_slider");
    const smothFishFirstCardWidth =
        smoth_fish_slider.querySelector(".smoth_fish_card").offsetWidth;
    const smothFishArrowBtns = document.querySelectorAll(".smoth_fish i");
    const smothFishrChildren = smoth_fish_slider.children;

    let isDraggingsmothFish = false,
        isAutosmothFish = true,
        smothFishStartX,
        smothFishStartScrollLeft,
        smothFishTimeoutId;

    // Get the number of cards that can fit in the recent at once

    // Insert copies of the last few cards to beginning of recent for infinite scrolling
    Array.from(smothFishrChildren)
        .reverse()
        .forEach((card) => {
            smoth_fish_slider.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

    // Insert copies of the first few cards to end of recent for infinite scrolling
    Array.from(smothFishrChildren).forEach((card) => {
        smoth_fish_slider.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the recent at appropriate postition to hide first few duplicate cards on Firefox
    smoth_fish_slider.classList.add("no-transition");
    smoth_fish_slider.scrollLeft = smoth_fish_slider.offsetWidth;
    smoth_fish_slider.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the recent left and right
    smothFishArrowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            smoth_fish_slider.scrollLeft +=
                btn.id == "left" ? -smothFishFirstCardWidth : smothFishFirstCardWidth;
        });
    });

    const smothFishStartDrag = (e) => {
        isDraggingsmothFish = true;
        smoth_fish_slider.classList.add("dragging");
        // Records the initial cursor and scroll position of the recent
        smothFishStartX = e.pageX;
        smothFishStartScrollLeft = smoth_fish_slider.scrollLeft;
    };

    const smothFishDragMove = (e) => {
        if (!isDraggingsmothFish) return; // if isDraggingsmothFish is false return from here
        // Updates the scroll position of the recent based on the cursor movement
        smoth_fish_slider.scrollLeft =
            smothFishStartScrollLeft - (e.pageX - smothFishStartX);
    };

    const smothFishStopDrag = () => {
        isDraggingsmothFish = false;
        smoth_fish_slider.classList.remove("dragging");
    };

    const smothFishHandleInfiniteScroll = () => {
        // If the recent is at the beginning, scroll to the end
        if (smoth_fish_slider.scrollLeft === 0) {
            smoth_fish_slider.classList.add("no-transition");
            smoth_fish_slider.scrollLeft =
                smoth_fish_slider.scrollWidth - 2 * smoth_fish_slider.offsetWidth;
            smoth_fish_slider.classList.remove("no-transition");
        }
        // If the recent is at the end, scroll to the beginning
        else if (
            Math.ceil(smoth_fish_slider.scrollLeft) ===
            smoth_fish_slider.scrollWidth - smoth_fish_slider.offsetWidth
        ) {
            smoth_fish_slider.classList.add("no-transition");
            smoth_fish_slider.scrollLeft = smoth_fish_slider.offsetWidth;
            smoth_fish_slider.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over recent
        clearTimeout(smothFishTimeoutId);
        if (!smoth_fish.matches(":hover")) smothFishStartAutoPlay();
    };

    const smothFishStartAutoPlay = () => {
        if (window.innerWidth < 800 || !isAutosmothFish) return; // Return if window is smaller than 800 or isAutosmothFish is false
        // Autoplay the recent after every 2500 ms
        smothFishTimeoutId = setTimeout(
            () => (smoth_fish_slider.scrollLeft += smothFishFirstCardWidth),
            2500
        );
    };
    smothFishStartAutoPlay();

    smoth_fish_slider.addEventListener("mousedown", smothFishStartDrag);
    smoth_fish_slider.addEventListener("mousemove", smothFishDragMove);
    document.addEventListener("mouseup", smothFishStopDrag);
    smoth_fish_slider.addEventListener("scroll", smothFishHandleInfiniteScroll);
    smoth_fish.addEventListener("mouseenter", () =>
        clearTimeout(smothFishTimeoutId)
    );
    smoth_fish.addEventListener("mouseleave", smothFishStartAutoPlay);
})();