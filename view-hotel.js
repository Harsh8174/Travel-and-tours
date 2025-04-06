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
            id: 'HB001',
            hotelName: 'Luxury Hotel & Spa',
            image: '/imagesminor/Radisson1.jpg',
            status: 'upcoming',
            checkIn: '2025-04-15',
            checkOut: '2025-04-19',
            guests: '2 Adults, 1 Child',
            roomType: 'Deluxe Suite',
            totalPrice: 35999,
            paymentStatus: 'Paid',
            guestName: 'Harsh Sharma',
            contact: '+91 9876543210',
            roomCharges: 29999,
            taxes: 6000,
            specialRequests: 'Early check-in requested'
        },
        // Add more booking data here
    ];

    function displayBookings(bookingsToShow) {
        bookingsGrid.innerHTML = '';
        bookingsToShow.forEach(booking => {
            const bookingCard = bookingTemplate.content.cloneNode(true);
            
            bookingCard.querySelector('.booking-image img').src = booking.image;
            bookingCard.querySelector('.hotel-name').textContent = booking.hotelName;
            bookingCard.querySelector('.stay-dates').textContent = 
                `${formatDate(booking.checkIn)} - ${formatDate(booking.checkOut)}`;
            bookingCard.querySelector('.guests').textContent = booking.guests;
            bookingCard.querySelector('.room-type').textContent = booking.roomType;
            bookingCard.querySelector('.booking-id').textContent = `Booking ID: ${booking.id}`;
            bookingCard.querySelector('.total-price').textContent = 
                `₹${booking.totalPrice.toLocaleString()}`;
            
            const statusElement = bookingCard.querySelector('.booking-status');
            statusElement.textContent = capitalizeFirstLetter(booking.status);
            statusElement.className = `booking-status status-${booking.status}`;

            const paymentStatus = bookingCard.querySelector('.payment-status');
            paymentStatus.textContent = booking.paymentStatus;
            paymentStatus.className = `payment-status status-${booking.paymentStatus.toLowerCase()}`;

            const viewDetailsBtn = bookingCard.querySelector('.btn-view-details');
            viewDetailsBtn.addEventListener('click', () => showBookingDetails(booking));

            const modifyBtn = bookingCard.querySelector('.btn-modify');
            const cancelBtn = bookingCard.querySelector('.btn-cancel-booking');

            if (booking.status === 'completed' || booking.status === 'cancelled') {
                modifyBtn.style.display = 'none';
                cancelBtn.style.display = 'none';
            }

            modifyBtn.addEventListener('click', () => modifyBooking(booking));
            cancelBtn.addEventListener('click', () => cancelBooking(booking));

            bookingsGrid.appendChild(bookingCard);
        });
    }

    function showBookingDetails(booking) {
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.querySelector('.modal-hotel-name').textContent = booking.hotelName;
        modalContent.querySelector('.modal-booking-id').textContent = booking.id;
        modalContent.querySelector('.modal-check-in').textContent = formatDate(booking.checkIn);
        modalContent.querySelector('.modal-check-out').textContent = formatDate(booking.checkOut);
        modalContent.querySelector('.modal-room-type').textContent = booking.roomType;
        modalContent.querySelector('.modal-guest-name').textContent = booking.guestName;
        modalContent.querySelector('.modal-contact').textContent = booking.contact;
        modalContent.querySelector('.modal-guests').textContent = booking.guests;
        modalContent.querySelector('.modal-room-charges').textContent = 
            `₹${booking.roomCharges.toLocaleString()}`;
        modalContent.querySelector('.modal-taxes').textContent = 
            `₹${booking.taxes.toLocaleString()}`;
        modalContent.querySelector('.modal-total-amount').textContent = 
            `₹${booking.totalPrice.toLocaleString()}`;
        modalContent.querySelector('.modal-payment-status').textContent = booking.paymentStatus;
        modalContent.querySelector('.modal-special-requests').textContent = 
            booking.specialRequests || 'None';
        modalContent.querySelector('.overview-image img').src = booking.image;

        const statusBadge = modalContent.querySelector('.booking-status-badge');
        statusBadge.textContent = capitalizeFirstLetter(booking.status);
        statusBadge.className = `booking-status-badge status-${booking.status}`;

        modal.style.display = 'block';
    }

    function modifyBooking(booking) {
        // Implement modify booking functionality
        console.log('Modifying booking:', booking.id);
    }

    function cancelBooking(booking) {
        if (confirm('Are you sure you want to cancel this booking?')) {
            // Implement cancel booking functionality
            console.log('Cancelling booking:', booking.id);
        }
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
            const matchesSearch = booking.hotelName.toLowerCase().includes(searchTerm) ||
                                booking.id.toLowerCase().includes(searchTerm);
            const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
            const matchesDate = checkDateFilter(booking.checkIn, selectedDate);

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