const totalPanels = 3;

export { showPanel };

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
let projectsPerPage = window.innerWidth <= 768 ? 2 : 4;

// Update projects per page on resize
window.addEventListener('resize', () => {
    const newProjectsPerPage = window.innerWidth <= 768 ? 2 : 4;
    if (newProjectsPerPage !== projectsPerPage) {
        projectsPerPage = newProjectsPerPage;
        updatePagination();
    }
});



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
}

// Track active filters
const activeFilters = {
    category: 'all',
    tech: new Set()
};

// Handle filter button clicks
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;
    
    const type = e.target.getAttribute('data-type');
    const value = e.target.getAttribute('data-value');
    
    if (!type || !value) return;
    
    // Handle category filters
    if (type === 'category') {
        // Remove active class from all category buttons
        document.querySelectorAll('[data-type="category"]').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        activeFilters.category = value;
    }
    
    // Handle tech filters
    if (type === 'tech') {
        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')) {
            activeFilters.tech.add(value);
        } else {
            activeFilters.tech.delete(value);
        }
    }
    
    applyFilters();
});

// Apply all active filters
function applyFilters() {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        const projectTechs = Array.from(project.querySelectorAll('.tech-tag'))
            .map(tag => tag.textContent.trim());
        
        // Check if project matches category filter
        const matchesCategory = activeFilters.category === 'all' || 
            projectCategory === activeFilters.category;
        
        // Check if project matches all selected tech filters
        const matchesTech = activeFilters.tech.size === 0 || 
            Array.from(activeFilters.tech).every(tech => 
                projectTechs.includes(tech)
            );
        
        // Show project only if it matches both filters
        if (matchesCategory && matchesTech) {
            project.removeAttribute('data-filtered-out');
        } else {
            project.setAttribute('data-filtered-out', '');
            project.style.display = 'none';
        }
    });
    
    // Reset to page 1 and update pagination
    currentPage = 1;
    updatePagination();
}

// Initialize background switcher
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to background buttons
    document.querySelectorAll('.bg-btn').forEach(button => {
        button.addEventListener('click', () => {
            const bgIndex = parseInt(button.getAttribute('data-bg-index'));
            
            // Clear all classes from body
            document.body.className = '';

            // Remove active class from all buttons
            document.querySelectorAll('.bg-btn').forEach(btn => btn.classList.remove('active'));

            if(bgIndex === 5) {
                // Handle code background
                document.body.classList.add('bg-code');
                button.classList.add('active');
            } else {
                // Handle numbered backgrounds
                document.body.classList.add('bg-style-' + bgIndex);
                button.classList.add('active');
            }
        });
    });
});

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

// Initialize navigation and pagination
document.addEventListener('DOMContentLoaded', function() {
    // Initialize panel navigation
    document.querySelectorAll('[data-panel]').forEach(element => {
        element.addEventListener('click', () => {
            const panelIndex = parseInt(element.getAttribute('data-panel'));
            showPanel(panelIndex);
        });
    });

    // Initialize pagination
    updatePagination();
    
    // Add pagination button event listeners
    document.getElementById('prev-page').addEventListener('click', () => {
        currentPage--;
        updatePagination();
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
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