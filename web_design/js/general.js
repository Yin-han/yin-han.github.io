// General JavaScript file for the entire website
export function logConsoleMessage() {
    console.log("JavaScript file has been loaded successfully!");
}

// Get the necessary DOM elements
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.workout-card');

    // Check if the carousel container and cards are found
    if (!carousel || cards.length === 0) {
        console.error("Carousel container or card elements not found");
        return; // Stop execution
    }

    // Index of the current card
    let currentIndex = 0;

    // On hover, slightly enlarge and show text content
    cards.forEach((card, index) => {
        card.addEventListener('mouseover', () => {
            // Slightly enlarge and show text content on hover
            card.style.transform = 'scale(1.05)';
            card.querySelector('p').style.display = 'block';
        });

        card.addEventListener('mouseout', () => {
            // Revert to original state and hide text content on mouse out
            card.style.transform = 'scale(1)';
            card.querySelector('p').style.display = 'none';
        });
    });
});






