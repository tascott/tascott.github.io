// Project data
export const projects = {
    'peloton-wrapped': {
        title: 'Peloton Wrapped',
        description: 'A web application that provides Spotify Wrapped-style insights for Peloton users, analyzing their workout data and presenting personalized statistics and achievements.',
        tech: ['React', 'JavaScript', 'Supabase', 'SASS'],
        links: {
            'View Project': '#',
            'GitHub': '#'
        }
    },
    'calendar': {
        title: 'Calendar',
        description: 'A personal project to keep my days on track with a focus on simplicity and efficiency. Features include task management, event scheduling, and integration with various APIs.',
        tech: ['JavaScript', 'API', 'CSS3', 'HTML5'],
        links: {
            'View Project': '#',
            'GitHub': '#'
        }
    },
    'wildside': {
        title: 'A Walk On The Wildside',
        description: 'Custom WordPress site for a local dog care business featuring booking system integration, gallery showcase, and responsive design.',
        tech: ['WordPress', 'PHP', 'jQuery', 'SASS'],
        links: {
            'View Project': '#'
        }
    },
    'peloton-analytics': {
        title: 'Peloton Rides Analytics',
        description: 'Data visualization project analyzing Peloton workout data, created as part of General Assembly Data Analytics course. Features interactive charts and insights.',
        tech: ['D3.js', 'JavaScript', 'SQL', 'CSS Grid'],
        links: {
            'View Project': '#',
            'GitHub': '#'
        }
    }
};

// Initialize project interactions
export function initializeProjects(modal) {
    // Add click handlers to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.projectId;
            if (projectId && projects[projectId]) {
                modal.open(projects[projectId]);
            }
        });
        
        // Add hover effect
        card.style.cursor = 'pointer';
    });
}
