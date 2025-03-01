// Project data
export const projects = {
    'peloton-year-review': {
        title: 'Peloton Year In Review',
        tagline: 'Spotify wrapped style end of year review',
        description: 'Using my own database of songs (from the node utils) for the song data, and Pelotons unofficial API for the rest, I built this to give a Spotify wrapped style end of year review of my Peloton rides.',
        type: 'web-apps',
        wip: false,
        image: 'placeholder.svg',
        tech: ['React','JavaScript','TypeScript','APIs','Supabase','PostgreSQL'],
        links: {
            'Live Site': 'https://pelo-year-review.vercel.app/',
            'GitHub': 'https://github.com/tascott/pelo-year-review'
        }
    },
    'peloton-music-search': {
        title: 'Peloton Music Search',
        tagline: 'Actually find rides with your favourite music',
        description: 'You cannot filter workouts and select songs in the Peloton app, so I built this for myself to find rides with my niche music tastes, save them to lists, and then open them in the app.',
        type: 'web-apps',
        wip: false,
        image: 'placeholder.svg',
        tech: ['React','JavaScript','TypeScript','APIs','Next.js','NodeJS','Supabase','PostgreSQL'],
        links: {
            'Live Site': 'https://peloton-music-search.vercel.app/',
            'GitHub': 'https://github.com/tascott/Peloton-Music-Search'
        }
    },
    'calendar': {
        title: 'Calendar',
        tagline: 'A personal project to help keep on track every day',
        description: 'I built this to be constantly on display in front of me on an old tablet to help me stay on track with my goals and prevent procrastination. I timeblock my day with it and the screen blanks out for focus time and pomodoros.',
        type: 'web-apps',
        wip: false,
        image: 'placeholder.svg',
        tech: ['React','JavaScript','NodeJS','PostgreSQL','SQLite'],
        links: {
            'Live Site': 'https://calendar-production-9074.up.railway.app/',
            'GitHub': 'https://github.com/tascott/Calendar'
        }
    },
    'digress': {
        title: 'digress.',
        tagline: 'Voice assistant to clear your head and focus',
        description: 'AI assistant orb that floats on top of other windows, and when activated will let you dump thoughts (instead of going down rabbit holes) - later on the full UI will show you how your thoughts have been analysed.',
        type: 'web-apps',
        wip: true,
        // image: 'placeholder.svg',
        tech: ['React','JavaScript','TypeScript','OpenAI','APIs','PostgreSQL'],
        links: {
            // 'Live Site': '#',
            // 'GitHub': '#'
        }
    },
    'peloton-supabase-utils': {
        title: 'Peloton To Supabase Utils',
        tagline: 'Set of node utils to fetch PTon data and upload it to Supabase',
        description: 'Node.js utility files that - fetch all bike workouts, use those to fetch all music, save to postgres and backup, and upload to supabase.',
        type: 'utility',
        wip: false,
        // image: 'placeholder.svg',
        tech: ['JavaScript','TypeScript','OpenAI','APIs'],
        links: {
            'GitHub': 'https://github.com/tascott/peloton-node'
        }
    },
    'driplang': {
        title: 'DripLang',
        tagline: 'Learn snippets of another language while you browse',
        description: 'Chrome extension that allows you to learn Spanish or French while you browse. It uses the Google Translate API to translate the text in place. Currently not active on the Chrome Web Store but can be installed manually.',
        type: 'chrome-extensions',
        wip: false,
        image: 'placeholder.svg',
        tech: ['JavaScript','APIs','HTML','CSS'],
        links: {
            // 'Live Site': '#',
            'GitHub': 'https://github.com/tascott/DripLang'
        }
    },
    'good-tech-news': {
        title: 'GoodTechNews',
        tagline: 'See some good news from tech with each new tab',
        description: 'Work in progress, this is an extension that will scrape the web for positive news regarding the tech job market and display it in a new tab.',
        type: 'chrome-extensions',
        wip: true,
        // image: 'placeholder.svg',
        tech: ['Python','JavaScript','HTML','CSS'],
        links: {
            // 'Live Site': '#',
            // 'GitHub': '#'
        }
    },
    'wild-side': {
        title: 'A Walk On The Wild Side',
        tagline: 'A client website for a doggy day care company',
        description: 'Simple client website for a doggy day care company. I used WordPress to create the site and then added some custom CSS and a full-wide video hero.',
        type: 'client',
        wip: false,
        image: 'placeholder.svg',
        tech: ['WordPress','HTML','CSS'],
        links: {
            'Live Site': 'https://awalkonthewildside.co.uk/'
        }
    },
    'london-doodle': {
        title: 'London Doodle Dogs',
        tagline: 'A client website for a local dog breeder',
        description: 'A client website for a doggy day care company. This one is a bit different, using Decap to allow the client to update the site themselves.',
        type: 'client',
        wip: false,
        image: 'placeholder.svg',
        tech: ['JavaScript','HTML','CSS'],
        links: {
            'Live Site': 'https://londondoodles.netlify.app/',
            'GitHub': 'https://github.com/tascott/london-doodles-decap'
        }
    },
    'beatrice-art': {
        title: 'Beatrice Scaramal Art',
        tagline: 'Portfolio site for an Italian artist',
        description: 'A portfolio site for an Italian artist. I used plain HTML, CSS and JavaScript to create the site with some custom scrolling effects.',
        type: 'client',
        wip: false,
        image: 'placeholder.svg',
        tech: ['JavaScript','HTML','CSS'],
        links: {
            'Live Site': 'https://tascott.co.uk/scaramal-art/',
            'GitHub': 'https://github.com/tascott/scaramal-art'
        }
    },
    'essex-cleaning': {
        title: 'Cleaning With Meaning',
        tagline: 'Cleaning company website',
        description: 'Potential client website for a real cleaning company in Essex. Fully connected to a booking system.',
        type: 'client',
        wip: false,
        image: 'placeholder.svg',
        tech: ['HTML','CSS'],
        links: {
            'Live Site': 'https://essex-cleaning-bclhfg8wb-contact4s-projects.vercel.app'
        }
    },
    'peloton-analysis': {
        title: 'Peloton Data Analysis',
        tagline: 'An analysis of PTon Cycling data',
        description: 'For the General Assembly Data Analysis course, I used the Peloton API to fetch data and Tableau to create a dashboard. I wanted to see if certain music or other metrics affected satisfaction scores.',
        type: 'data',
        wip: false,
        image: 'placeholder.svg',
        tech: ['Tableau'],
        links: {
            // 'Live Site': '#'
        }
    },
};
