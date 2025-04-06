document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const detailsContainer = document.querySelector('.details-container');

    searchBtn.addEventListener('click', function() {
        const username = searchInput.value.trim();
        if (username) {
            searchUser(username);
        } else {
            showMessage('Please enter a username', 'error');
        }
    });

    function searchUser(username) {
        // Show loading state
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';

        // Simulate API call
        setTimeout(() => {
            // Mock user data (replace with actual API call)
            const userData = {
                username: username,
                name: 'Harsh Sharma',
                email: 'Harsh123@gmail.com.com',
                phone: '7016892914',
                dob: '1990-01-01',
                gender: 'Male',
                address: '123 Main Street, Indore, India',
                idType: 'Passport',
                idNumber: 'AB123456'
            };

            displayUserDetails(userData);
            searchBtn.disabled = false;
            searchBtn.innerHTML = '<i class="fas fa-search"></i> Search';
        }, 1500);
    }

    function displayUserDetails(user) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userUsername').textContent = user.username;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userPhone').textContent = user.phone;
        document.getElementById('userDob').textContent = formatDate(user.dob);
        document.getElementById('userGender').textContent = user.gender;
        document.getElementById('userAddress').textContent = user.address;
        document.getElementById('userId').textContent = user.idType;
        document.getElementById('userIdNumber').textContent = user.idNumber;

        detailsContainer.style.display = 'block';
        detailsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
});