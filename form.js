document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.personal-details-form');
    const submitBtn = document.querySelector('.btn-submit');

    // Add loading state to submit button
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            showSuccessMessage();
        }, 2000);
    });

    // Add floating labels
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Success message function
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <p>Details submitted successfully!</p>
            </div>
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    }
});