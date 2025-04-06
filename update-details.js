document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchUsername = document.getElementById('searchUsername');
    const updateForm = document.getElementById('updateDetailsForm');
    const cancelBtn = document.querySelector('.btn-cancel');

    // Search button click handler
    searchBtn.addEventListener('click', function() {
        const username = searchUsername.value.trim();
        if (username) {
            // Simulate API call to fetch user details
            fetchUserDetails(username);
        } else {
            showMessage('Please enter a username', 'error');
        }
    });

    // Form submission handler
    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = updateForm.querySelector('.btn-submit');
        
        if (validateForm()) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
            
            // Simulate update API call
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-save"></i> Update';
                showMessage('Details updated successfully!', 'success');
                updateForm.style.display = 'none';
                searchUsername.value = '';
            }, 2000);
        }
    });

    // Cancel button handler
    cancelBtn.addEventListener('click', function() {
        updateForm.style.display = 'none';
        searchUsername.value = '';
    });

    function fetchUserDetails(username) {
        // Simulate API call delay
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        
        setTimeout(() => {
            // Simulate found user (replace with actual API call)
            const mockUser = {
                username: username,
                name: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                dob: '1990-01-01',
                gender: 'male',
                address: '123 Main St, City',
                idProof: 'passport',
                idNumber: 'AB123456'
            };

            populateForm(mockUser);
            searchBtn.disabled = false;
            searchBtn.innerHTML = '<i class="fas fa-search"></i> Search';
        }, 1500);
    }

    function populateForm(user) {
        updateForm.style.display = 'block';
        updateForm.username.value = user.username;
        updateForm.name.value = user.name;
        updateForm.email.value = user.email;
        updateForm.phone.value = user.phone;
        updateForm.dob.value = user.dob;
        updateForm.gender.value = user.gender;
        updateForm.address.value = user.address;
        updateForm['id-proof'].value = user.idProof;
        updateForm['id-number'].value = user.idNumber;
    }

    function validateForm() {
        const inputs = updateForm.querySelectorAll('input:not([readonly]), select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                showInputError(input);
            } else {
                clearInputError(input);
            }
        });

        return isValid;
    }

    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    function showInputError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
    }

    function clearInputError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
    }
});