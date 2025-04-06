document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const roomTypeInputs = document.querySelectorAll('input[name="roomType"]');

    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkInInput.min = tomorrow.toISOString().split('T')[0];

    // Sample hotel data (replace with actual data from previous page)
    const hotelData = {
        name: 'Luxury Hotel & Spa',
        location: 'Indore, Madhya Pradesh',
        rating: 5,
        image: '/imagesminor/Radisson.jpg'
    };

    // Initialize hotel details
    function initializeHotelDetails() {
        document.getElementById('hotelName').textContent = hotelData.name;
        document.getElementById('hotelLocation').textContent = hotelData.location;
        document.getElementById('hotelImage').src = hotelData.image;
        updatePriceSummary();
    }

    // Update check-out minimum date when check-in date changes
    checkInInput.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        const minCheckOutDate = new Date(checkInDate);
        minCheckOutDate.setDate(checkInDate.getDate() + 1);
        checkOutInput.min = minCheckOutDate.toISOString().split('T')[0];
        
        if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
            checkOutInput.value = minCheckOutDate.toISOString().split('T')[0];
        }
        
        updatePriceSummary();
    });

    // Update price when check-out date changes
    checkOutInput.addEventListener('change', updatePriceSummary);

    // Update price when room type changes
    roomTypeInputs.forEach(input => {
        input.addEventListener('change', updatePriceSummary);
    });

    // Calculate number of nights
    function calculateNights() {
        if (!checkInInput.value || !checkOutInput.value) return 0;
        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);
        return Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    }

    // Get selected room price
    function getSelectedRoomPrice() {
        const selectedRoom = document.querySelector('input[name="roomType"]:checked');
        if (!selectedRoom) return 0;
        return selectedRoom.value === 'deluxe' ? 5999 : 8999;
    }

    // Update price summary
    function updatePriceSummary() {
        const nights = calculateNights();
        const roomPrice = getSelectedRoomPrice();
        const roomCharges = nights * roomPrice;
        const taxRate = 0.18; // 18% tax
        const taxes = roomCharges * taxRate;
        const totalAmount = roomCharges + taxes;

        document.getElementById('roomCharges').textContent = `₹${roomCharges.toLocaleString()}`;
        document.getElementById('taxes').textContent = `₹${taxes.toLocaleString()}`;
        document.getElementById('totalAmount').textContent = `₹${totalAmount.toLocaleString()}`;
    }

    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Collect form data
        const formData = {
            hotelName: hotelData.name,
            roomType: document.querySelector('input[name="roomType"]:checked').value,
            checkIn: checkInInput.value,
            checkOut: checkOutInput.value,
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            specialRequests: document.getElementById('specialRequests').value,
            totalAmount: document.getElementById('totalAmount').textContent
        };

        // Proceed to payment (replace with actual payment integration)
        console.log('Booking details:', formData);
        window.location.href = 'payment.html';
    });

    // Form validation
    function validateForm() {
        if (!document.querySelector('input[name="roomType"]:checked')) {
            alert('Please select a room type');
            return false;
        }

        if (!checkInInput.value || !checkOutInput.value) {
            alert('Please select check-in and check-out dates');
            return false;
        }

        const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
        for (const field of requiredFields) {
            const input = document.getElementById(field);
            if (!input.value) {
                alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                input.focus();
                return false;
            }
        }

        if (!validateEmail(document.getElementById('email').value)) {
            alert('Please enter a valid email address');
            return false;
        }

        if (!validatePhone(document.getElementById('phone').value)) {
            alert('Please enter a valid phone number');
            return false;
        }

        return true;
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    // Initialize page
    initializeHotelDetails();
});