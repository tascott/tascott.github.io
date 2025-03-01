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
                    <div class="modal-image"></div>
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <p class="modal-description"></p>
                    </div>
                    <div class="modal-tech-stack"></div>
                    <div class="modal-links"></div>
                </div>
            </div>

            <dialog id="imageDialog" class="image-dialog">
                <button class="dialog-close" aria-label="Close dialog">
                    <i class="fas fa-times"></i>
                </button>
                <img src="" alt="" />
            </dialog>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend',modalHTML);

        // Store modal elements
        this.modal = document.getElementById('projectModal');
        this.modalImage = this.modal.querySelector('.modal-image');
        this.modalTitle = this.modal.querySelector('.modal-title');
        this.modalDescription = this.modal.querySelector('.modal-description');
        this.modalTechStack = this.modal.querySelector('.modal-tech-stack');
        this.modalLinks = this.modal.querySelector('.modal-links');
    }

    bindEvents() {
        // Close modal when clicking overlay or close button
        this.modal.addEventListener('click',(e) => {
            if(e.target === this.modal || e.target.closest('.modal-close')) {
                this.close();
            }

            // Handle thumbnail clicks using event delegation
            const thumbnail = e.target.closest('.thumbnail');
            if (thumbnail) {
                const image = thumbnail.dataset.image;
                const title = thumbnail.dataset.title;
                this.showFullImage(image, title);
            }
        });

        // Close on escape key
        document.addEventListener('keydown',(e) => {
            if(e.key === 'Escape') {
                if (this.modal.classList.contains('active')) {
                    this.close();
                }
                if (this.imageDialog && this.imageDialog.open) {
                    this.clearDialog();
                }
            }
        });

        // Handle modal content scrolling
        this.modal.addEventListener('wheel',(e) => {
            const modalContent = e.target.closest('.modal-content');
            if(!modalContent) {
                e.stopPropagation();
            }
        },{passive: true});

        // Setup image dialog
        this.imageDialog = document.getElementById('imageDialog');
        this.imageDialog.querySelector('.dialog-close').addEventListener('click', () => {
            this.clearDialog();
        });
    }

    open(projectData) {
        if(projectData.images && projectData.images.length > 0) {
            const thumbnailGridHTML = `
                <p style="color: #888; font-size: 0.9rem; margin-bottom: 1rem;">
                    <i class="fas fa-search-plus"></i> Click images to enlarge
                </p>
                <div class="thumbnail-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem;">
                    ${projectData.images.map((image, index) => `
                        <div class="thumbnail" data-image="images/${image}" data-title="${projectData.title} - Image ${index + 1}"
                             style="position: relative; padding-bottom: 100%; border-radius: 4px; overflow: hidden; cursor: zoom-in;">
                            <img src="images/${image}" 
                                alt="${projectData.title} - Image ${index + 1}" 
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" />
                        </div>
                    `).join('')}
                </div>
            `;
            
            this.modalImage.innerHTML = thumbnailGridHTML;
            this.modalImage.style.display = 'block';
        } else {
            this.modalImage.innerHTML = '';
            this.modalImage.style.display = 'none';
        }

        // Update modal content with WIP badge if needed
        this.modalTitle.innerHTML = `
            ${projectData.title}
            ${projectData.wip ? '<span class="wip-badge">Work in Progress</span>' : ''}
        `;
        this.modalDescription.textContent = projectData.description;

        // Update tech stack
        this.modalTechStack.innerHTML = projectData.tech
            .map(tech => `<span class="modal-tech">${tech}</span>`)
            .join('');

        // Update links
        this.modalLinks.innerHTML = Object.entries(projectData.links)
            .map(([text,url]) => `
                <a href="${url}" class="modal-link" target="_blank" rel="noopener noreferrer">
                    ${text} <i class="fas fa-external-link-alt"></i>
                </a>
            `)
            .join('');

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    showFullImage(src, alt) {
        const dialogImg = this.imageDialog.querySelector('img');
        dialogImg.src = src;
        dialogImg.alt = alt;
        this.imageDialog.showModal();
    }

    clearDialog() {
        const dialogImg = this.imageDialog.querySelector('img');
        dialogImg.src = '';
        dialogImg.alt = '';
        this.imageDialog.close();
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        if (this.imageDialog && this.imageDialog.open) {
            this.clearDialog();
        }
    }
}

// Export for use in other files
export default ProjectModal;
