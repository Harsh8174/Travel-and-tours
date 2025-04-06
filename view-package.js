document.addEventListener('DOMContentLoaded', function() {
    const bookingsGrid = document.querySelector('.bookings-grid');
    const bookingTemplate = document.getElementById('booking-template');
    const modal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    const searchInput = document.getElementById('searchBooking');
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');

    // Sample bookings data (replace with actual data from backend)
    const bookings = [
        {
            id: 'BK001',
            packageTitle: 'Ralamandal Wildlife Sanctuary',
            image: '/imagesminor/Ralamandal.jpg',
            status: 'upcoming',
            travelDate: '2025-05-15',
            travelers: '2 Adults, 1 Child',
            totalPrice: 5999,
            paymentStatus: 'Paid',
            leadTraveler: 'John Doe',
            contact: '+91 9876543210',
            duration: '3 Days / 2 Nights',
            paymentDate: '2025-01-20',
            specialRequests: 'Vegetarian meals preferred'
        },
        // Add more booking data here
    ];

    function displayBookings(bookingsToShow) {
        bookingsGrid.innerHTML = '';
        bookingsToShow.forEach(booking => {
            const bookingCard = bookingTemplate.content.cloneNode(true);
            
            bookingCard.querySelector('.booking-image img').src = booking.image;
            bookingCard.querySelector('.package-title').textContent = booking.packageTitle;
            bookingCard.querySelector('.travel-date').textContent = formatDate(booking.travelDate);
            bookingCard.querySelector('.travelers').textContent = booking.travelers;
            bookingCard.querySelector('.booking-id').textContent = `Booking ID: ${booking.id}`;
            bookingCard.querySelector('.total-price').textContent = `₹${booking.totalPrice.toLocaleString()}`;
            
            const statusElement = bookingCard.querySelector('.booking-status');
            statusElement.textContent = capitalizeFirstLetter(booking.status);
            statusElement.className = `booking-status status-${booking.status}`;

            const paymentStatus = bookingCard.querySelector('.payment-status');
            paymentStatus.textContent = booking.paymentStatus;
            paymentStatus.className = `payment-status status-${booking.paymentStatus.toLowerCase()}`;

            const viewDetailsBtn = bookingCard.querySelector('.btn-view-details');
            viewDetailsBtn.addEventListener('click', () => showBookingDetails(booking));

            bookingsGrid.appendChild(bookingCard);
        });
    }

    function showBookingDetails(booking) {
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.querySelector('.modal-package-title').textContent = booking.packageTitle;
        modalContent.querySelector('.modal-booking-id').textContent = booking.id;
        modalContent.querySelector('.modal-travel-date').textContent = formatDate(booking.travelDate);
        modalContent.querySelector('.modal-duration').textContent = booking.duration;
        modalContent.querySelector('.modal-lead-traveler').textContent = booking.leadTraveler;
        modalContent.querySelector('.modal-contact').textContent = booking.contact;
        modalContent.querySelector('.modal-travelers').textContent = booking.travelers;
        modalContent.querySelector('.modal-total-amount').textContent = `₹${booking.totalPrice.toLocaleString()}`;
        modalContent.querySelector('.modal-payment-status').textContent = booking.paymentStatus;
        modalContent.querySelector('.modal-payment-date').textContent = formatDate(booking.paymentDate);
        modalContent.querySelector('.modal-special-requests').textContent = booking.specialRequests || 'None';
        modalContent.querySelector('.overview-image img').src = booking.image;

        const statusBadge = modalContent.querySelector('.booking-status-badge');
        statusBadge.textContent = capitalizeFirstLetter(booking.status);
        statusBadge.className = `booking-status-badge status-${booking.status}`;

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
    function filterBookings() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedStatus = statusFilter.value;
        const selectedDate = dateFilter.value;

        const filteredBookings = bookings.filter(booking => {
            const matchesSearch = booking.packageTitle.toLowerCase().includes(searchTerm) ||
                                booking.id.toLowerCase().includes(searchTerm);
            const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
            const matchesDate = checkDateFilter(booking.travelDate, selectedDate);

            return matchesSearch && matchesStatus && matchesDate;
        });

        displayBookings(filteredBookings);
    }

    searchInput.addEventListener('input', filterBookings);
    statusFilter.addEventListener('change', filterBookings);
    dateFilter.addEventListener('change', filterBookings);

    // Helper functions
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function checkDateFilter(bookingDate, filter) {
        if (filter === 'all') return true;
        
        const date = new Date(bookingDate);
        const now = new Date();
        
        switch(filter) {
            case 'month':
                return date.getMonth() === now.getMonth() &&
                       date.getFullYear() === now.getFullYear();
            case 'year':
                return date.getFullYear() === now.getFullYear();
            default:
                return true;
        }
    }

    // Initialize page
    displayBookings(bookings);
});