import ProjectModal from './modal.js';
import { initializeProjects } from './projects.js';

// Initialize modal and projects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const modal = new ProjectModal();
    initializeProjects(modal);
});
