document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const bookingForm = document.getElementById('bookingForm');
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');
    const travelDateInput = document.getElementById('travelDate');

    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    travelDateInput.min = tomorrow.toISOString().split('T')[0];

    // Sample package data (replace with actual data from previous page)
    const packageData = {
        title: 'Ralamandal Wildlife Sanctuary',
        duration: '2 Days',
        location: 'Indore, Madhya Pradesh',
        price: 5000,
        image: '/imagesminor/Ralamandal.jpg'
    };

    // Initialize package details
    function initializePackageDetails() {
        document.getElementById('packageTitle').textContent = packageData.title;
        document.getElementById('packageDuration').textContent = packageData.duration;
        document.getElementById('packageLocation').textContent = packageData.location;
        document.getElementById('packagePrice').textContent = `₹${packageData.price.toLocaleString()}`;
        document.getElementById('packageImage').src = packageData.image;
        updatePriceSummary();
    }

    // Update price summary
    function updatePriceSummary() {
        const adults = parseInt(adultsInput.value) || 0;
        const children = parseInt(childrenInput.value) || 0;
        const basePrice = packageData.price;
        const adultPrice = basePrice * adults;
        const childPrice = (basePrice * 0.6) * children; // 60% of adult price
        const taxRate = 0.18; // 18% tax
        const taxAmount = (adultPrice + childPrice) * taxRate;
        const totalPrice = adultPrice + childPrice + taxAmount;

        document.getElementById('basePrice').textContent = `₹${basePrice.toLocaleString()}`;
        document.getElementById('adultCount').textContent = adults;
        document.getElementById('adultPrice').textContent = `₹${adultPrice.toLocaleString()}`;
        document.getElementById('childCount').textContent = children;
        document.getElementById('childPrice').textContent = `₹${childPrice.toLocaleString()}`;
        document.getElementById('taxPrice').textContent = `₹${taxAmount.toLocaleString()}`;
        document.getElementById('totalPrice').textContent = `₹${totalPrice.toLocaleString()}`;
    }

    // Event listeners
    adultsInput.addEventListener('change', updatePriceSummary);
    childrenInput.addEventListener('change', updatePriceSummary);

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Collect form data
        const formData = {
            packageTitle: packageData.title,
            travelDate: travelDateInput.value,
            adults: adultsInput.value,
            children: childrenInput.value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            requests: document.getElementById('requests').value,
            totalPrice: document.getElementById('totalPrice').textContent
        };

        // Proceed to payment (replace with actual payment integration)
        console.log('Booking details:', formData);
        window.location.href = 'payment.html';
    });

    function validateForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const travelDate = travelDateInput.value;

        if (!name || !email || !phone || !travelDate) {
            alert('Please fill in all required fields');
            return false;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return false;
        }

        if (!validatePhone(phone)) {
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
    initializePackageDetails();
});