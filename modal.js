class ProjectModal {
    constructor() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="modal-overlay" id="projectModal">
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <p class="modal-description"></p>
                    </div>
                    <div class="modal-tech-stack"></div>
                    <div class="modal-links"></div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Store modal elements
        this.modal = document.getElementById('projectModal');
        this.modalTitle = this.modal.querySelector('.modal-title');
        this.modalDescription = this.modal.querySelector('.modal-description');
        this.modalTechStack = this.modal.querySelector('.modal-tech-stack');
        this.modalLinks = this.modal.querySelector('.modal-links');
    }

    bindEvents() {
        // Close modal when clicking overlay or close button
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal || e.target.closest('.modal-close')) {
                this.close();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        // Handle modal content scrolling
        this.modal.addEventListener('wheel', (e) => {
            const modalContent = e.target.closest('.modal-content');
            if (!modalContent) {
                e.stopPropagation();
            }
        }, { passive: true });
    }

    open(projectData) {
        // Update modal content
        this.modalTitle.textContent = projectData.title;
        this.modalDescription.textContent = projectData.description;
        
        // Update tech stack
        this.modalTechStack.innerHTML = projectData.tech
            .map(tech => `<span class="modal-tech">${tech}</span>`)
            .join('');
        
        // Update links
        this.modalLinks.innerHTML = Object.entries(projectData.links)
            .map(([text, url]) => `
                <a href="${url}" class="modal-link" target="_blank" rel="noopener noreferrer">
                    ${text} <i class="fas fa-external-link-alt"></i>
                </a>
            `)
            .join('');

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Export for use in other files
export default ProjectModal;
