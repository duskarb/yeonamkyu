document.addEventListener('mousemove', function(e) {
    const flashlightOverlay = document.querySelector('.flashlight-overlay');

    if (flashlightOverlay) {
        const rect = flashlightOverlay.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        flashlightOverlay.style.setProperty('--mouse-x', `${x}px`);
        flashlightOverlay.style.setProperty('--mouse-y', `${y}px`);
    }
});