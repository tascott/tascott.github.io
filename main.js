import ProjectModal from './modal.js';
import {projects} from './projects.js';

// ===== State Management =====
const activeFilters = {
    category: 'all',
    tech: new Set()
};

let currentPage = 1;
let projectsPerPage = window.innerWidth <= 768 ? 2 : 4;
let currentPanelIndex = 0;
let scrollThrottle = false;
const totalPanels = 3;

// ===== UI Update Functions =====
function updateButtonState(button,isActive) {
    if(isActive) {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
}

function showPanel(index) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => panel.classList.remove('active'));
    document.getElementById('panel-' + index).classList.add('active');

    // Update navigation dots and indicators
    document.querySelectorAll('.nav-dot').forEach((dot,i) => {
        dot.classList.toggle('active',i === index);
    });
    document.querySelectorAll('.panel-indicator').forEach((indicator,i) => {
        indicator.classList.toggle('active',i === index);
    });

    currentPanelIndex = index;
}

function renderProjects() {
    console.log('Rendering projects with filters:',{
        category: activeFilters.category,
        tech: Array.from(activeFilters.tech)
    });

    const projectsContainer = document.getElementById('projects-container');
    if(!projectsContainer) {
        console.error('Projects container not found!');
        return;
    }

    projectsContainer.innerHTML = '';

    // Filter projects
    const filteredProjects = Object.entries(projects).filter(([_,project]) => {
        const categoryMatch = activeFilters.category === 'all' ||
            project.type === activeFilters.category;
        const techMatch = activeFilters.tech.size === 0 ||
            Array.from(activeFilters.tech).every(tech =>
                project.tech.includes(tech)
            );
        return categoryMatch && techMatch;
    });

    console.log('Filtered projects count:',filteredProjects.length);

    // Show no results message if no projects match
    if(filteredProjects.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <p>No projects match the selected filters.</p>
            <p class="filters-used">
                Category: ${activeFilters.category}
                ${activeFilters.tech.size > 0 ?
                `<br>Technologies: ${Array.from(activeFilters.tech).join(', ')}`
                : ''}
            </p>
        `;
        projectsContainer.appendChild(noResults);

        // Hide pagination when no results
        const paginationElement = document.querySelector('.pagination');
        paginationElement.style.display = 'none';
        return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    currentPage = Math.max(1,Math.min(currentPage,totalPages));

    // Get current page's projects
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const currentProjects = filteredProjects.slice(startIndex,endIndex);

    // Render current page's projects
    const modal = new ProjectModal();
    currentProjects.forEach(([_,project]) => {
        const card = document.createElement('div');
        card.className = `project-card${project.wip ? ' wip' : ''}`;
        card.innerHTML = `
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    ${project.wip ? '<span class="wip-badge">Work in Progress</span>' : ''}
                </div>
                <p class="project-desc">${project.tagline || project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        card.addEventListener('click',() => modal.open(project));
        projectsContainer.appendChild(card);
    });

    // Update pagination UI
    const paginationElement = document.querySelector('.pagination');
    if(filteredProjects.length > projectsPerPage) {
        paginationElement.style.display = 'flex';
        document.querySelector('.current-page').textContent = currentPage;
        document.querySelector('.total-pages').textContent = totalPages;
        document.getElementById('prev-page').disabled = currentPage <= 1;
        document.getElementById('next-page').disabled = currentPage >= totalPages;
    } else {
        paginationElement.style.display = 'none';
    }

    // Update filter button states
    document.querySelectorAll('[data-type="tech"]').forEach(btn => {
        const btnValue = btn.getAttribute('data-value');
        updateButtonState(btn,activeFilters.tech.has(btnValue));
    });
}

// ===== Event Handlers =====
function handleFilterClick(e) {
    if(!e.target.classList.contains('filter-btn')) return;

    const type = e.target.getAttribute('data-type');
    const value = e.target.getAttribute('data-value');

    if(!type || !value) return;

    if(type === 'category') {
        document.querySelectorAll('[data-type="category"]').forEach(btn => {
            updateButtonState(btn,false);
        });
        updateButtonState(e.target,true);
        activeFilters.category = value;
    } else if(type === 'tech') {
        const isCurrentlyActive = activeFilters.tech.has(value);
        if(isCurrentlyActive) {
            activeFilters.tech.delete(value);
            updateButtonState(e.target,false);
        } else {
            activeFilters.tech.add(value);
            updateButtonState(e.target,true);
        }
    }

    currentPage = 1;
    renderProjects();
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded',() => {
    // Initialize panel navigation
    document.querySelectorAll('[data-panel]').forEach(element => {
        element.addEventListener('click',() => {
            const panelIndex = parseInt(element.getAttribute('data-panel'));
            showPanel(panelIndex);
        });
    });

    // Initialize pagination handlers
    document.getElementById('prev-page').addEventListener('click',() => {
        if(currentPage > 1) {
            currentPage--;
            renderProjects();
        }
    });

    document.getElementById('next-page').addEventListener('click',() => {
        const totalPages = Math.ceil(
            Object.entries(projects).filter(([_,project]) => {
                const categoryMatch = activeFilters.category === 'all' ||
                    project.type === activeFilters.category;
                const techMatch = activeFilters.tech.size === 0 ||
                    Array.from(activeFilters.tech).every(tech =>
                        project.tech.includes(tech)
                    );
                return categoryMatch && techMatch;
            }).length / projectsPerPage
        );
        if(currentPage < totalPages) {
            currentPage++;
            renderProjects();
        }
    });

    // Initialize background switcher
    document.querySelectorAll('.bg-btn').forEach(button => {
        button.addEventListener('click',() => {
            const bgIndex = parseInt(button.getAttribute('data-bg-index'));
            document.body.className = '';
            document.querySelectorAll('.bg-btn').forEach(btn =>
                btn.classList.remove('active')
            );

            if(bgIndex === 5) {
                document.body.classList.add('bg-code');
            } else {
                document.body.classList.add('bg-style-' + bgIndex);
            }
            button.classList.add('active');
        });
    });

    // Add filter click handler
    document.addEventListener('click',handleFilterClick);

    // Initial render
    renderProjects();
});

// Handle window resize for responsive pagination
window.addEventListener('resize',() => {
    const newProjectsPerPage = window.innerWidth <= 768 ? 2 : 4;
    if(newProjectsPerPage !== projectsPerPage) {
        projectsPerPage = newProjectsPerPage;
        renderProjects();
    }
});

// Handle scroll navigation
window.addEventListener('wheel',(e) => {
    if(scrollThrottle) return;

    scrollThrottle = true;
    setTimeout(() => scrollThrottle = false,800);

    if(e.deltaY > 0) {
        showPanel(Math.min(2,currentPanelIndex + 1));
    } else {
        showPanel(Math.max(0,currentPanelIndex - 1));
    }
},{passive: true});

// Handle keyboard navigation
document.addEventListener('keydown',(e) => {
    if(e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        showPanel(Math.min(2,currentPanelIndex + 1));
    } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        showPanel(Math.max(0,currentPanelIndex - 1));
    }
});

export {showPanel};
