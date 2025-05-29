document.addEventListener('DOMContentLoaded', () => {
    const learningModulesData = {
        "Week 1: Foundations": [
            { title: "HTML Basics", type: "video", url: "https://www.youtube.com/embed/ok-plXXHlWw" },
            { title: "Intro to CSS", type: "article", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS" },
            { title: "JavaScript Fundamentals", type: "video", url: "https://www.youtube.com/embed/W6NZfCO5SIk" },
            { title: "Malformed Video Link", type: "video", url: "htps://www.youtbe.com/embed/broken" }, // Invalid video URL
            { title: "Missing URL Article", type: "article", url: "" } // Missing article URL
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
            { title: "State Management", type: "article", url: "https://kentcdodds.com/blog/application-state-management-with-react" },
            { title: "Invalid Protocol Article", type: "article", url: "ftp://example.com/doc.pdf"} // Example of a non-http/https URL
        ]
    };

    const modulesContainer = document.getElementById('modules-container');
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('video-iframe');
    const closeButton = document.querySelector('.close-button');

    function isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false; // Malformed URL
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    function isValidYouTubeEmbedUrl(string) {
        if (!isValidHttpUrl(string)) return false;
        try {
            const url = new URL(string);
            return url.hostname === "www.youtube.com" && url.pathname.startsWith("/embed/");
        } catch (_) {
            return false;
        }
    }

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
                    
                    // Ensure essential data exists, otherwise skip rendering this card or show placeholder
                    if (!resource.title || !resource.type) {
                        console.warn("Skipping resource due to missing title or type:", resource);
                        return; // Skip this iteration
                    }

                    card.dataset.type = resource.type;
                    card.dataset.url = resource.url || ""; // Ensure dataset.url exists, even if empty

                    const icon = document.createElement('span');
                    icon.classList.add('type-icon');
                    icon.textContent = resource.type === 'video' ? '▶️' : '📄';

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
        const card = event.currentTarget;
        const type = card.dataset.type;
        const url = card.dataset.url;

        if (!url) {
            alert(`Error: The URL for "${card.querySelector('span:last-child').textContent}" is missing.`);
            console.error("Missing URL for resource:", card.querySelector('span:last-child').textContent);
            return;
        }

        if (type === 'video') {
            if (!isValidYouTubeEmbedUrl(url)) {
                alert(`Error: The video URL for "${card.querySelector('span:last-child').textContent}" is invalid or not a YouTube embed link. It should start with 'https://www.youtube.com/embed/'.`);
                console.error("Invalid YouTube embed URL:", url);
                return;
            }
            modalIframe.src = url;
            modal.style.display = 'flex';
        } else if (type === 'article') {
            if (!isValidHttpUrl(url)) {
                 alert(`Error: The article URL for "${card.querySelector('span:last-child').textContent}" is invalid. It should start with 'http://' or 'https://'.`);
                console.error("Invalid article URL:", url);
                return;
            }
            window.open(url, '_blank');
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        modalIframe.src = '';
    }

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    renderModules();
});
