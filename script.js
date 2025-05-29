document.addEventListener('DOMContentLoaded', () => {
    const learningModulesData = {
        "Week 1: Foundations": [
            { title: "HTML Basics", type: "video", url: "https://www.youtube.com/embed/ok-plXXHlWw" }, // Use embed URL
            { title: "Intro to CSS", type: "article", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS" },
            { title: "JavaScript Fundamentals", type: "video", url: "https://www.youtube.com/embed/W6NZfCO5SIk" }
        ],
        "Week 2: Intermediate Concepts": [
            { title: "CSS Flexbox Explained", type: "article", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
            { title: "DOM Manipulation", type: "video", url: "https://www.youtube.com/embed/y17qYJDimZc" },
            { title: "Event Handling in JS", type: "article", url: "https://javascript.info/introduction-browser-events" },
            { title: "Responsive Design Principles", type: "video", url: "https://www.youtube.com/embed/srvUrAS2_6c" }
        ],
        "Week 3: Advanced & Frameworks": [
            { title: "Understanding APIs", type: "article", url: "https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/"},
            { title: "Introduction to React", type: "video", url: "https://www.youtube.com/embed/bMknfKXIFA8" },
            { title: "State Management", type: "article", url: "https://kentcdodds.com/blog/application-state-management-with-react" }
        ]
    };

    const modulesContainer = document.getElementById('modules-container');
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('video-iframe');
    const closeButton = document.querySelector('.close-button');

    function renderModules() {
        modulesContainer.innerHTML = ''; // Clear existing content

        for (const categoryTitle in learningModulesData) {
            if (learningModulesData.hasOwnProperty(categoryTitle)) {
                const resources = learningModulesData[categoryTitle];

                const moduleSection = document.createElement('section');
                moduleSection.classList.add('module');

                const titleElement = document.createElement('h2');
                titleElement.textContent = categoryTitle;
                moduleSection.appendChild(titleElement);

                const resourcesGrid = document.createElement('div');
                resourcesGrid.classList.add('resources-grid');

                resources.forEach(resource => {
                    const card = document.createElement('div');
                    card.classList.add('resource-card');
                    card.dataset.type = resource.type;
                    card.dataset.url = resource.url;

                    const icon = document.createElement('span');
                    icon.classList.add('type-icon');
                    icon.textContent = resource.type === 'video' ? '▶️' : '📄'; // Simple emoji icons

                    const cardTitle = document.createElement('span');
                    cardTitle.textContent = resource.title;
                    
                    card.appendChild(icon);
                    card.appendChild(cardTitle);

                    card.addEventListener('click', handleResourceClick);
                    resourcesGrid.appendChild(card);
                });

                moduleSection.appendChild(resourcesGrid);
                modulesContainer.appendChild(moduleSection);
            }
        }
    }

    function handleResourceClick(event) {
        const card = event.currentTarget; // The div.resource-card
        const type = card.dataset.type;
        const url = card.dataset.url;

        if (type === 'video') {
            modalIframe.src = url;
            modal.style.display = 'flex'; // Use flex for centering defined in CSS
        } else if (type === 'article') {
            window.open(url, '_blank'); // Open article in a new tab
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        modalIframe.src = ''; // Stop video from playing in background
    }

    // Event listeners for modal
    closeButton.addEventListener('click', closeModal);

    // Close modal if user clicks outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Initial render
    renderModules();
});