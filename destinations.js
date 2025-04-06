document.addEventListener('DOMContentLoaded', function() {
    const destinationsGrid = document.querySelector('.destinations-grid');
    const featuredSlider = document.querySelector('.featured-slider');
    const destinationTemplate = document.getElementById('destination-template');
    const modal = document.getElementById('destinationModal');
    const closeModal = document.querySelector('.close-modal');
    const searchInput = document.getElementById('searchDestination');
    const regionFilter = document.getElementById('regionFilter');
    const typeFilter = document.getElementById('typeFilter');
    const budgetFilter = document.getElementById('budgetFilter');

    // Sample destinations data (replace with actual data from backend)
    const destinations = [
        {
            id: 'D001',
            name: 'Ralamandal Wildlife Sanctuary',
            location: 'Indore',
            region: 'asia',
            type: 'Wildlife Sanctuary',
            budget: 'moderate',
            duration: '5-7 days',
            priceRange: '₹5000 - ₹10,000',
            rating: 4.8,
            description: 'Experience the perfect blend of  cultural heritage in Indore.',
            images: [
                '/imagesminor/Ralamandal3.jpg',
                '/imagesminor/Ralamandal1.jpg',
                '/imagesminor/Ralamandal2.jpg'
            ],
            attractions: [
                'Mountains',
                'Mueseum',
                'Wild Animals',
                
            ],
           
            weather: {
                temp: '25-32°C',
                season: 'Dry Season',
                bestTime: 'April to October'
            },
            coordinates: {
                lat: -8.4095,
                lng: 115.1889
            }
        }
        // Add more destination data here
    ];

    // Featured destinations data
    const featuredDestinations = destinations.filter(dest => dest.rating >= 4.5);

    function initializeFeaturedSlider() {
        featuredDestinations.forEach((dest, index) => {
            const slide = document.createElement('div');
            slide.className = `featured-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <img src="${dest.images[0]}" alt="${dest.name}">
                <div class="featured-content">
                    <h2>${dest.name}</h2>
                    <p>${dest.description}</p>
                    <button class="btn-view-details" data-id="${dest.id}">
                        Explore Now
                    </button>
                </div>
            `;
            featuredSlider.appendChild(slide);
        });

        // Auto-rotate featured slides
        let currentSlide = 0;
        setInterval(() => {
            const slides = document.querySelectorAll('.featured-slide');
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    function displayDestinations(destinationsToShow) {
        destinationsGrid.innerHTML = '';
        destinationsToShow.forEach(dest => {
            const destinationCard = destinationTemplate.content.cloneNode(true);
            
            destinationCard.querySelector('.destination-image img').src = dest.images[0];
            destinationCard.querySelector('.destination-type').textContent = 
                capitalizeFirstLetter(dest.type);
            destinationCard.querySelector('.destination-name').textContent = dest.name;
            destinationCard.querySelector('.destination-location span').textContent = dest.location;
            destinationCard.querySelector('.duration').textContent = dest.duration;
            destinationCard.querySelector('.price-range').textContent = dest.priceRange;
            destinationCard.querySelector('.rating').textContent = dest.rating;
            destinationCard.querySelector('.destination-description').textContent = 
                dest.description;

            const viewDetailsBtn = destinationCard.querySelector('.btn-view-details');
            viewDetailsBtn.addEventListener('click', () => showDestinationDetails(dest));

            const checkPackagesBtn = destinationCard.querySelector('.btn-check-packages');
            checkPackagesBtn.addEventListener('click', () => {
                window.location.href = `check-package.html?destination=${dest.id}`;
            });

            destinationsGrid.appendChild(destinationCard);
        });
    }

    function showDestinationDetails(destination) {
        const modalContent = modal.querySelector('.modal-content');
        
        // Update main image and thumbnails
        const mainImage = modalContent.querySelector('.main-image img');
        mainImage.src = destination.images[0];
        
        const thumbnailsContainer = modalContent.querySelector('.thumbnail-images');
        thumbnailsContainer.innerHTML = '';
        destination.images.forEach((img, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `<img src="${img}" alt="${destination.name} ${index + 1}">`;
            thumbnail.addEventListener('click', () => {
                mainImage.src = img;
            });
            thumbnailsContainer.appendChild(thumbnail);
        });

        // Update destination information
        modalContent.querySelector('.modal-destination-name').textContent = destination.name;
        modalContent.querySelector('.modal-location').innerHTML = 
            `<i class="fas fa-map-marker-alt"></i> ${destination.location}`;
        modalContent.querySelector('.modal-duration').textContent = destination.duration;
        modalContent.querySelector('.modal-price-range').textContent = destination.priceRange;
        modalContent.querySelector('.modal-rating').textContent = destination.rating;
        modalContent.querySelector('.modal-description').textContent = destination.description;

        // Update attractions
        const attractionsList = modalContent.querySelector('.attractions-list');
        attractionsList.innerHTML = destination.attractions
            .map(attraction => `<li><i class="fas fa-check"></i> ${attraction}</li>`)
            .join('');

        // Update activities
        const activitiesGrid = modalContent.querySelector('.activities-grid');
        activitiesGrid.innerHTML = destination.activities
            .map(activity => `
                <div class="activity-item">
                    <i class="${activity.icon}"></i>
                    <p>${activity.name}</p>
                </div>
            `).join('');

        // Update weather information
        const weatherInfo = modalContent.querySelector('.weather-info');
        weatherInfo.innerHTML = `
            <div class="weather-item">
                <h4>Temperature</h4>
                <p>${destination.weather.temp}</p>
            </div>
            <div class="weather-item">
                <h4>Season</h4>
                <p>${destination.weather.season}</p>
            </div>
            <div class="weather-item">
                <h4>Best Time to Visit</h4>
                <p>${destination.weather.bestTime}</p>
            </div>
        `;

        // Initialize map (replace with actual map implementation)
        initializeMap(destination.coordinates);

        modal.style.display = 'block';
    }

    function initializeMap(coordinates) {
        // Implement map initialization using your preferred mapping service
        console.log('Initializing map for coordinates:', coordinates);
    }

    // Filter functionality
    function filterDestinations() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedRegion = regionFilter.value;
        const selectedType = typeFilter.value;
        const selectedBudget = budgetFilter.value;

        const filteredDestinations = destinations.filter(dest => {
            const matchesSearch = dest.name.toLowerCase().includes(searchTerm) ||
                                dest.location.toLowerCase().includes(searchTerm);
            const matchesRegion = selectedRegion === 'all' || dest.region === selectedRegion;
            const matchesType = selectedType === 'all' || dest.type === selectedType;
            const matchesBudget = selectedBudget === 'all' || dest.budget === selectedBudget;

            return matchesSearch && matchesRegion && matchesType && matchesBudget;
        });

        displayDestinations(filteredDestinations);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterDestinations);
    regionFilter.addEventListener('change', filterDestinations);
    typeFilter.addEventListener('change', filterDestinations);
    budgetFilter.addEventListener('change', filterDestinations);

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Wishlist functionality
    document.querySelector('.btn-save-wishlist').addEventListener('click', function() {
        // Implement wishlist save functionality
        console.log('Saving to wishlist...');
        this.innerHTML = '<i class="fas fa-heart"></i> Saved to Wishlist';
        this.style.background = '#e74c3c';
        this.style.color = 'white';
    });

    // Helper functions
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Initialize page
    initializeFeaturedSlider();
    displayDestinations(destinations);
});