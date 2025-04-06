document.addEventListener('DOMContentLoaded', function() {
    const packagesGrid = document.querySelector('.packages-grid');
    const packageTemplate = document.getElementById('package-template');
    const modal = document.getElementById('packageModal');
    const closeModal = document.querySelector('.close-modal');
    const searchInput = document.getElementById('searchPackage');
    const destinationFilter = document.getElementById('destinationType');
    const priceFilter = document.getElementById('priceRange');
    const durationFilter = document.getElementById('duration');

    // Sample package data (replace with API call)
    const packages = [
        {
            id: 1,
            title: 'Ralamandal Wildlife Sanctuary',
            image: '/imagesminor/Ralamandal.jpg',
            duration: '2 Days',
            location: 'Indore, India',
            groupSize: '2-6 people',
            price: 5000,
            type: 'Wildlife Sanctuary',
            features: ['Mountain Tracking', 'Mueseum', 'Wild Animals'],
            description: 'Ralamandal Wildlife Sanctuary is a protected area located in the outskirts of Indore. It is situated on the Ralamandal Hill, which is approximately 15 kilometres from the city centre. The sanctuary is known for its diverse flora and fauna, scenic landscapes, and recreational opportunities.',
            rating: 4.5,
            images: ['/imagesminor/Ralamandal1.jpg', '/imagesminor/Ralamandal2.jpg', '/imagesminor/Ralamandal3.jpg'],
            itinerary: [
                { day: 1, description: 'Arrival and Tracking' },
                { day: 2, description: 'Mueseum and wild life Tracking' },
               
            ],
            inclusions: [
                'Hotel Accommodation',
                'Breakfast'
                
            ]
        },
        {
            id: 2,
            title: 'Jam Ghate',
            image: '/imagesminor/jamgate.jpg',
            duration: '1 Days',
            location: 'Indore, India',
            groupSize: '2-6 people',
            price: 5000,
            type: 'picnic spot',
            features: ['Mountain Tracking', 'Sunset view', 'Sunrise View'],
            description: 'The Jam Gate is a picnic spot in Maheshwar Tehsil of Khargone District in the state of Madhya Pradesh, India. It is on Mhow-Mandleshwar Road. It was built by Rani Ahilyabai Holkar in 1791. It is approximately 30 km from Mhow, 50 km from Indore, 33 km from Maheshwar and 75 km from district headquarter Khargone.',
            rating: 4.5,
            images: ['/imagesminor/jamgate1.jpg', '/imagesminor/jamgate2.jpg', '/imagesminor/jamgate3.jpg'],
            itinerary: [
                { day: 1, description: 'Arrival and Tracking' },
                
               
            ],
            inclusions: [
                'Hotel Accommodation',
                'Breakfast'
                
            ]
        }
        // Add more package data here
    ];

    function displayPackages(packagesToShow) {
        packagesGrid.innerHTML = '';
        packagesToShow.forEach(package => {
            const packageCard = packageTemplate.content.cloneNode(true);
            
            packageCard.querySelector('.package-image img').src = package.image;
            packageCard.querySelector('.package-title').textContent = package.title;
            packageCard.querySelector('.duration').textContent = package.duration;
            packageCard.querySelector('.location').textContent = package.location;
            packageCard.querySelector('.group-size').textContent = package.groupSize;
            packageCard.querySelector('.price').textContent = `₹${package.price.toLocaleString()}`;

            const featuresContainer = packageCard.querySelector('.package-features');
            package.features.forEach(feature => {
                const featureTag = document.createElement('span');
                featureTag.className = 'feature-tag';
                featureTag.textContent = feature;
                featuresContainer.appendChild(featureTag);
            });

            const viewDetailsBtn = packageCard.querySelector('.btn-view-details');
            viewDetailsBtn.addEventListener('click', () => showPackageDetails(package));

            packagesGrid.appendChild(packageCard);
        });
    }

    function showPackageDetails(package) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.querySelector('.modal-title').textContent = package.title;
        modalContent.querySelector('.modal-duration').textContent = package.duration;
        modalContent.querySelector('.modal-location').textContent = package.location;
        modalContent.querySelector('.modal-group-size').textContent = package.groupSize;
        modalContent.querySelector('.modal-rating').textContent = `${package.rating}/5`;
        modalContent.querySelector('.modal-description').textContent = package.description;
        modalContent.querySelector('.modal-price-amount').textContent = `₹${package.price.toLocaleString()}`;

        // Set main image
        modalContent.querySelector('.main-image img').src = package.images[0];

        // Set thumbnails
        const thumbnailsContainer = modalContent.querySelector('.thumbnail-images');
        thumbnailsContainer.innerHTML = '';
        package.images.forEach(image => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `<img src="${image}" alt="Package Image">`;
            thumbnail.addEventListener('click', () => {
                modalContent.querySelector('.main-image img').src = image;
            });
            thumbnailsContainer.appendChild(thumbnail);
        });

        // Set itinerary
        const itineraryList = modalContent.querySelector('.itinerary-list');
        itineraryList.innerHTML = '';
        package.itinerary.forEach(item => {
            const itineraryItem = document.createElement('div');
            itineraryItem.className = 'itinerary-item';
            itineraryItem.innerHTML = `
                <span class="day-number">Day ${item.day}</span>
                <span class="day-description">${item.description}</span>
            `;
            itineraryList.appendChild(itineraryItem);
        });

        // Set inclusions
        const inclusionsList = modalContent.querySelector('.inclusions-list');
        inclusionsList.innerHTML = '';
        package.inclusions.forEach(inclusion => {
            const li = document.createElement('li');
            li.textContent = inclusion;
            inclusionsList.appendChild(li);
        });

        modal.style.display = 'block';
    }

    // Event Listeners
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Filter functionality
    function filterPackages() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDestination = destinationFilter.value;
        const selectedPrice = priceFilter.value;
        const selectedDuration = durationFilter.value;

        const filteredPackages = packages.filter(package => {
            const matchesSearch = package.title.toLowerCase().includes(searchTerm) ||
                                package.location.toLowerCase().includes(searchTerm);
            const matchesDestination = !selectedDestination || package.type === selectedDestination;
            const matchesPrice = !selectedPrice || checkPriceRange(package.price, selectedPrice);
            const matchesDuration = !selectedDuration || checkDuration(package.duration, selectedDuration);

            return matchesSearch && matchesDestination && matchesPrice && matchesDuration;
        });

        displayPackages(filteredPackages);
    }

    searchInput.addEventListener('input', filterPackages);
    destinationFilter.addEventListener('change', filterPackages);
    priceFilter.addEventListener('change', filterPackages);
    durationFilter.addEventListener('change', filterPackages);

    // Helper functions
    function checkPriceRange(price, range) {
        switch(range) {
            case 'budget': return price <= 20000;
            case 'medium': return price > 20000 && price <= 50000;
            case 'luxury': return price > 50000;
            default: return true;
        }
    }

    function checkDuration(duration, range) {
        const days = parseInt(duration);
        switch(range) {
            case 'short': return days <= 3;
            case 'medium': return days > 3 && days <= 7;
            case 'long': return days > 7;
            default: return true;
        }
    }

    // Initial display
    displayPackages(packages);
});