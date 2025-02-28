const totalPanels = 3;


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

// Pagination variables
let currentPage = 1;
const projectsPerPage = 4;

// Update pagination display
function updatePagination() {
    // Get all visible project cards (not filtered out)
    const projectCards = Array.from(document.querySelectorAll('.project-card')).filter(card => 
        getComputedStyle(card).display !== 'none'
    );

    console.log('Visible project cards:', projectCards.length);
    
    const totalPages = Math.ceil(projectCards.length / projectsPerPage);
    
    // Ensure current page stays within bounds
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }
    
    document.querySelector('.current-page').textContent = currentPage;
    document.querySelector('.total-pages').textContent = totalPages;
    
    // Enable/disable pagination buttons
    document.getElementById('prev-page').disabled = currentPage <= 1;
    document.getElementById('next-page').disabled = currentPage >= totalPages;
    
    // Show/hide projects based on current page
    projectCards.forEach((card, index) => {
        const shouldShow = index >= (currentPage - 1) * projectsPerPage && index < currentPage * projectsPerPage;
        card.style.display = shouldShow ? 'block' : 'none';
    });
    
    console.log(`Current page: ${currentPage}, Total pages: ${totalPages}, Visible cards: ${projectCards.length}`);
}

// Get visible cards for pagination
function getVisibleCards() {
    return Array.from(document.querySelectorAll('.project-card')).filter(card => 
        !card.hasAttribute('data-filtered-out')
    );
}

// Update pagination display
function updatePagination() {
    const availableCards = getVisibleCards();
    const totalPages = Math.ceil(availableCards.length / projectsPerPage);
    
    // Ensure current page stays within bounds
    currentPage = Math.min(Math.max(1, currentPage), totalPages);
    
    document.querySelector('.current-page').textContent = currentPage;
    document.querySelector('.total-pages').textContent = totalPages;
    
    // Enable/disable pagination buttons
    document.getElementById('prev-page').disabled = currentPage <= 1;
    document.getElementById('next-page').disabled = currentPage >= totalPages;
    
    // Show/hide projects based on current page
    availableCards.forEach((card, index) => {
        const shouldShow = index >= (currentPage - 1) * projectsPerPage && index < currentPage * projectsPerPage;
        card.style.display = shouldShow ? 'block' : 'none';
    });
    
    console.log(`Page ${currentPage}/${totalPages} - Showing cards ${(currentPage-1)*projectsPerPage + 1} to ${Math.min(currentPage*projectsPerPage, availableCards.length)} of ${availableCards.length}`);
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

    // Reset to first page when filtering
    currentPage = 1;
    
    // Mark cards as filtered or not
    projectCards.forEach(card => {
        if(category === 'all' || card.dataset.category === category) {
            card.removeAttribute('data-filtered-out');
        } else {
            card.setAttribute('data-filtered-out', '');
            card.style.display = 'none';
        }
    });
    
    // Reset to page 1 and update pagination
    currentPage = 1;
    updatePagination();
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
// Initialize pagination
document.addEventListener('DOMContentLoaded', function() {
    updatePagination();
    
    // Add pagination button event listeners
    document.getElementById('prev-page').addEventListener('click', () => {
        console.log('Previous clicked');
        currentPage--;
        updatePagination();
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        console.log('Next clicked');
        currentPage++;
        updatePagination();
    });
});

document.addEventListener('keydown',function(e) {
    // Navigate based on key pressed
    if(e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        showPanel(Math.min(2,currentPanelIndex + 1));
    } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        showPanel(Math.max(0,currentPanelIndex - 1));
    }
});