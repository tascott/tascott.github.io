import ProjectModal from './modal.js';
import { projects } from './projects.js';

// Initialize filter state
const activeFilters = {
    category: [],
    tech: []
};

// Initialize modal and projects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handle tech select dropdown
    const techSelect = document.querySelector('.tech-select');
    if (techSelect) {
        techSelect.addEventListener('change', (e) => {
            // Clear existing tech filters
            activeFilters.tech = [];
            
            // Add selected options to filters
            Array.from(e.target.selectedOptions).forEach(option => {
                activeFilters.tech.push(option.value);
            });
            
            renderProjects();
        });
    }
    const modal = new ProjectModal();
    const projectsContainer = document.getElementById('projects-container');

    // Function to check if a project matches the active filters
    const matchesFilters = (project) => {
        // If no filters are active, show all projects
        if (activeFilters.category.length === 0 && activeFilters.tech.length === 0) {
            return true;
        }

        // Check type filters
        if (activeFilters.category.length > 0 && !activeFilters.category.includes(project.type)) {
            return false;
        }

        // Check tech filters
        if (activeFilters.tech.length > 0 && !project.tech.some(tech => activeFilters.tech.includes(tech))) {
            return false;
        }

        return true;
    };

    // Pagination state
    let currentPage = 1;
    
    // Function to get projects per page based on screen size
    const getProjectsPerPage = () => {
        if (window.innerWidth >= 1920) return 6; // Very large screens
        if (window.innerWidth >= 1440) return 4; // Standard desktop/laptop
        if (window.innerWidth >= 768) return 4;  // Tablet/small laptop
        return 2; // Mobile
    };
    
    let projectsPerPage = getProjectsPerPage();
    
    // Update projects per page when window resizes
    window.addEventListener('resize', () => {
        const newProjectsPerPage = getProjectsPerPage();
        if (newProjectsPerPage !== projectsPerPage) {
            projectsPerPage = newProjectsPerPage;
            renderProjects();
        }
    });

    // Function to render paginated project cards
    const renderProjects = () => {
        projectsContainer.innerHTML = '';
        
        // Filter projects first
        const filteredProjects = Object.entries(projects).filter(([_, project]) => matchesFilters(project));
        
        // Calculate total pages
        const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
        
        // Ensure current page is within bounds
        currentPage = Math.max(1, Math.min(currentPage, totalPages));
        
        // Get current page's projects
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const currentProjects = filteredProjects.slice(startIndex, endIndex);
        
        // Render current page's projects
        currentProjects.forEach(([id, project]) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-category', project.type);
            card.setAttribute('data-project-id', id);

            card.innerHTML = `
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.tagline || project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            `;

            // Add click handler
            card.addEventListener('click', () => {
                if (project) {
                    modal.open(project);
                }
            });
            
            // Add hover effect
            card.style.cursor = 'pointer';

            projectsContainer.appendChild(card);
        });

        // Update pagination UI
        document.querySelector('.current-page').textContent = currentPage;
        document.querySelector('.total-pages').textContent = totalPages;
        document.getElementById('prev-page').disabled = currentPage <= 1;
        document.getElementById('next-page').disabled = currentPage >= totalPages;
    };

    // Add click handlers to pagination buttons
    document.getElementById('prev-page').addEventListener('click', () => {
        currentPage--;
        renderProjects();
    });

    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        renderProjects();
    });

    // Add click handlers to filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            const value = btn.getAttribute('data-value');

            // Toggle active state
            btn.classList.toggle('active');

            // Update filters
            if (btn.classList.contains('active')) {
                activeFilters[type].push(value);
            } else {
                activeFilters[type] = activeFilters[type].filter(v => v !== value);
            }

            // Re-render projects
            renderProjects();
        });
    });

    // Initial render
    renderProjects();
});
