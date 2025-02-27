
// Show panel function
function showPanel(index) {
    // Get all panels
    const panels = document.querySelectorAll('.panel');

    // Hide all panels
    panels.forEach(panel => {
        panel.classList.remove('active');
    });

    // Show selected panel
    document.getElementById('panel-' + index).classList.add('active');

    // Update navigation dots
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot,i) => {
        dot.classList.toggle('active',i === index);
    });

    // Update panel indicators
    const indicators = document.querySelectorAll('.panel-indicator');
    indicators.forEach((indicator,i) => {
        indicator.classList.toggle('active',i === index);
    });

    // Update current panel index
    currentPanelIndex = index;
}

// Project filtering function
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Update active button
    filterButtons.forEach(button => {
        button.classList.remove('active');
        if(
            (category === 'all' && button.textContent.trim() === 'All') ||
            (category === 'web-apps' && button.textContent.trim() === 'Web Applications') ||
            (category === 'client' && button.textContent.trim() === 'Client Websites') ||
            (category === 'data' && button.textContent.trim() === 'Data Projects')
        ) {
            button.classList.add('active');
        }
    });

    // Filter projects
    projectCards.forEach(card => {
        if(category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Background Switcher Function
function changeBackground(bgIndex) {
    // Clear all classes from body
    document.body.className = '';

    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.bg-btn');
    allButtons.forEach(button => button.classList.remove('active'));

    if(bgIndex === 5) {
        // Handle code background
        document.body.classList.add('bg-code');
        document.getElementById('bg-code').classList.add('active');
    } else {
        // Handle numbered backgrounds
        document.body.classList.add('bg-style-' + bgIndex);
        document.getElementById('bg' + bgIndex).classList.add('active');
    }
}

// Declare current panel index
let currentPanelIndex = 0;
let scrollThrottle = false;

// Wheel scroll navigation
window.addEventListener('wheel',function(e) {
    // Throttle scroll events
    if(scrollThrottle) return;

    scrollThrottle = true;
    setTimeout(() => {
        scrollThrottle = false;
    },800);

    // Determine scroll direction
    if(e.deltaY > 0) {
        // Scroll down - go to next panel
        showPanel(Math.min(2,currentPanelIndex + 1));
    } else {
        // Scroll up - go to previous panel
        showPanel(Math.max(0,currentPanelIndex - 1));
    }
},{passive: true});

// Keyboard navigation
document.addEventListener('keydown',function(e) {
    // Navigate based on key pressed
    if(e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        showPanel(Math.min(2,currentPanelIndex + 1));
    } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        showPanel(Math.max(0,currentPanelIndex - 1));
    }
});