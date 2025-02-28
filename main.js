import ProjectModal from './modal.js';
import { projects } from './projects.js';

// Initialize modal and projects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const modal = new ProjectModal();

    // Add click handlers to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            if (projectId && projects[projectId]) {
                modal.open(projects[projectId]);
            }
        });
        
        // Add hover effect
        card.style.cursor = 'pointer';
    });
});
