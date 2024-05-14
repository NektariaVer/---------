document.addEventListener("DOMContentLoaded", function() {
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const carousel = document.querySelector(".announcement-carousel");

    let currentIndex = 0;
    const announcementWidth = document.querySelector(".announcement").clientWidth;

    // Function to move carousel to the left
    function moveToPrev() {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarouselPosition();
    }

    // Function to move carousel to the right
    function moveToNext() {
        const numAnnouncements = document.querySelectorAll(".announcement").length;
        currentIndex = Math.min(currentIndex + 1, numAnnouncements - 1);
        updateCarouselPosition();
    }

    // Function to update carousel position
    function updateCarouselPosition() {
        const newPosition = -currentIndex * announcementWidth;
        carousel.style.transform = `translateX(${newPosition}px)`;
    }

    // Add event listeners to the buttons
    prevBtn.addEventListener("click", moveToPrev);
    nextBtn.addEventListener("click", moveToNext);
});
