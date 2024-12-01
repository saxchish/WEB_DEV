// JavaScript for zoom effect on hover for 2 seconds
document.addEventListener("DOMContentLoaded", function() {
    let calendarImg = document.getElementById("calendarImg");
    let timeout;

    // Event listener for hover in (mouseenter)
    calendarImg.addEventListener("mouseenter", function () {
        timeout = setTimeout(() => {
            calendarImg.classList.add("zoomed");
        }, 400);  // Wait for 2 seconds before zooming
    });

    // Event listener for hover out (mouseleave)
    calendarImg.addEventListener("mouseleave", function () {
        clearTimeout(timeout); // Clear the timer if mouse leaves before 2 seconds
        calendarImg.classList.remove("zoomed"); // Remove zoom when the mouse leaves
    });
});