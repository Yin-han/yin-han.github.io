import { logConsoleMessage } from './general.js';

logConsoleMessage();

// Add mouse hover effect to all cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)'; // Magnifying card
        card.style.filter = 'brightness(1.2)'; // Increase brightness
        card.style.zIndex = '1'; // Make sure the enlarged card is at the tops
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)'; // Restore to original size
        card.style.filter = 'brightness(1)'; // Restore to original brightness
        card.style.zIndex = '0'; // Restore to original layer
    });
});

// Use the DOMContentLoaded event to ensure execution after the DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('content loaded');
    const privacyPopup = document.getElementById('privacyPopup');
    const privacyOverlay = document.getElementById('privacyOverlay');
    const acknowledgeBtn = document.getElementById('acknowledgeBtn');

    // Check whether the corresponding element is found
    if (privacyPopup && privacyOverlay && acknowledgeBtn) {
        // Turn off pop-ups and background masks when the user clicks the "I know" button
        acknowledgeBtn.addEventListener('click', function() {
            privacyPopup.classList.add('hidden');
            privacyOverlay.classList.add('hidden');
        });
    } else {
        console.error("Privacy popup element not found");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon img');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    menuIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show'); // Toggle the display status of the menu
    });
});

