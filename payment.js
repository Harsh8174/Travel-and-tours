document.addEventListener('DOMContentLoaded', function() {
    const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
    const paymentForms = document.querySelectorAll('.payment-form');
    const payNowBtn = document.getElementById('payNowBtn');
    const processingModal = document.getElementById('processingModal');
    const successModal = document.getElementById('successModal');
    const viewBookingBtn = document.getElementById('viewBookingBtn');
    const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');

    // Card input formatting
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');

    // Format card number with spaces
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        e.target.value = formattedValue.substring(0, 19);
    });

    // Format expiry date
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        e.target.value = value.substring(0, 5);
    });

    // Allow only numbers in CVV
    cvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });

    // Switch between payment methods
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            paymentForms.forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(`${this.value}Form`).classList.add('active');
        });
    });

    // Handle payment submission
    payNowBtn.addEventListener('click', function() {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        if (validatePaymentForm(selectedMethod)) {
            showProcessingModal();
            
            // Simulate payment processing
            setTimeout(() => {
                hideProcessingModal();
                showSuccessModal();
            }, 3000);
        }
    });

    function validatePaymentForm(method) {
        switch(method) {
            case 'creditCard':
            case 'debitCard':
                return validateCardPayment();
            case 'upi':
                return validateUPIPayment();
            case 'netBanking':
                return validateNetBankingPayment();
        }
        return false;
    }

    function validateCardPayment() {
        const cardNum = cardNumber.value.replace(/\s/g, '');
        const expiry = expiryDate.value;
        const cvvNum = cvv.value;
        const name = document.getElementById('cardName').value.trim();

        if (cardNum.length !== 16) {
            showError('Please enter a valid 16-digit card number');
            return false;
        }

        if (!expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
            showError('Please enter a valid expiry date (MM/YY)');
            return false;
        }

        if (cvvNum.length !== 3) {
            showError('Please enter a valid CVV');
            return false;
        }

        if (name.length < 3) {
            showError('Please enter the name on card');
            return false;
        }

        return true;
    }

    function validateUPIPayment() {
        const upiId = document.getElementById('upiId').value.trim();
        if (!upiId.includes('@')) {
            showError('Please enter a valid UPI ID');
            return false;
        }
        return true;
    }

    function validateNetBankingPayment() {
        const bank = document.getElementById('bank').value;
        if (!bank) {
            showError('Please select a bank');
            return false;
        }
        return true;
    }

    function showError(message) {
        // Create and show error toast
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function showProcessingModal() {
        processingModal.style.display = 'block';
    }

    function hideProcessingModal() {
        processingModal.style.display = 'none';
    }

    function showSuccessModal() {
        // Generate random transaction ID
        document.getElementById('transactionId').textContent = 
            'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        successModal.style.display = 'block';
    }

    // Success modal actions
    viewBookingBtn.addEventListener('click', function() {
        // Redirect to booking details page
        window.location.href = 'view-hotel.html';
    });

    downloadReceiptBtn.addEventListener('click', function() {
        generateReceipt();
    });

    function generateReceipt() {
        const receiptData = {
            transactionId: document.getElementById('transactionId').textContent,
            bookingId: document.getElementById('bookingId').textContent,
            amount: document.getElementById('totalAmount').textContent,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        // Create receipt content
        const receiptContent = `
            Travel & Tourism Management
            Payment Receipt
            ----------------------
            Transaction ID: ${receiptData.transactionId}
            Booking ID: ${receiptData.bookingId}
            Amount: ${receiptData.amount}
            Date: ${receiptData.date}
            Time: ${receiptData.time}
            ----------------------
            Thank you for your payment!
        `;

        // Create blob and download
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt_${receiptData.transactionId}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Cancel payment button
    document.querySelector('.btn-cancel').addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel this payment?')) {
            window.history.back();
        }
    });
});