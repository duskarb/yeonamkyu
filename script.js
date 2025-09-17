document.addEventListener('DOMContentLoaded', function() {
    const projectLinks = document.querySelectorAll('.project-item');
    const projectContentElement = document.getElementById('project-content');

    // Function to load content
    function loadProjectContent(link) {
        const source = link.getAttribute('href');
        const type = link.getAttribute('data-type');
        
        projectContentElement.innerHTML = ''; // Clear previous content

        if (type === 'html' || type === 'pdf') {
            const iframe = document.createElement('iframe');
            iframe.id = 'project-iframe'; // Use the ID from the style tag
            iframe.src = source;
            projectContentElement.appendChild(iframe);
        } else if (type === 'image') {
            const image = document.createElement('img');
            image.src = source;
            image.className = 'img-fluid';
            image.style.maxHeight = '100%';
            image.style.objectFit = 'contain';
            projectContentElement.appendChild(image);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = source;
            video.controls = true;
            video.autoplay = true;
            video.className = 'img-fluid';
            video.style.maxHeight = '100%';
            projectContentElement.appendChild(video);
        } else if (type === 'video-gallery') {
            const videoSrc = link.getAttribute('data-video');
            const images = JSON.parse(link.getAttribute('data-images'));

            // Add video
            if (videoSrc) {
                const video = document.createElement('video');
                video.src = videoSrc;
                video.controls = true;
                video.autoplay = true;
                video.className = 'img-fluid mb-3'; // Add margin bottom
                video.style.maxHeight = '75vh';
                projectContentElement.appendChild(video);
            }

            // Add images
            if (images && images.length > 0) {
                images.forEach(imageSrc => {
                    const image = document.createElement('img');
                    image.src = imageSrc;
                    image.className = 'img-fluid mb-3';
                    projectContentElement.appendChild(image);
                });
            }
                } else if (type === 'gallery') {
            const media = JSON.parse(link.getAttribute('data-media'));
            if (media && media.length > 0) {
                media.forEach(item => {
                    if (item.type === 'video') {
                        const video = document.createElement('video');
                        video.src = item.src;
                        video.controls = true;
                        video.autoplay = false; // Do not autoplay multiple videos
                        video.className = 'img-fluid mb-3';
                        projectContentElement.appendChild(video);
                        if (item.src.endsWith('.mov')) {
                            const warning = document.createElement('p');
                            warning.className = 'text-warning small';
                            warning.textContent = `Note: .mov files may not play in all browsers.`;
                            projectContentElement.appendChild(warning);
                        }
                    } else if (item.type === 'image') {
                        const image = document.createElement('img');
                        image.src = item.src;
                        image.className = 'img-fluid mb-3';
                        projectContentElement.appendChild(image);
                    }
                });
            }
        } else {
             const text = document.createElement('p');
             text.textContent = `Content type '${type}' loading is not yet implemented.`;
             projectContentElement.appendChild(text);
        }
    }

    projectLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Stop navigation

            // Update selected state
            projectLinks.forEach(p => p.classList.remove('selected'));
            this.classList.add('selected');

            // Load content
            loadProjectContent(this);
        });
    });

    // Optional: Load the first project by default
    if (projectLinks.length > 0) {
        projectLinks[0].classList.add('selected');
        loadProjectContent(projectLinks[0]);
    }
});