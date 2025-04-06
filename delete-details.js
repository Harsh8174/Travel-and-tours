document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const userPreview = document.querySelector('.user-preview');
    const confirmDelete = document.getElementById('confirmDelete');
    const cancelDelete = document.getElementById('cancelDelete');
    const modal = document.getElementById('confirmationModal');
    const confirmPasswordBtn = document.getElementById('confirmPasswordBtn');
    const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
    const confirmPassword = document.getElementById('confirmPassword');

    searchBtn.addEventListener('click', function() {
        const username = searchInput.value.trim();
        if (username) {
            searchUser(username);
        } else {
            showMessage('Please enter a username', 'error');
        }
    });

    confirmDelete.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    cancelDelete.addEventListener('click', function() {
        userPreview.style.display = 'none';
        searchInput.value = '';
    });

    confirmPasswordBtn.addEventListener('click', function() {
        if (confirmPassword.value.trim()) {
            deleteUser();
        } else {
            showMessage('Please enter your password', 'error');
        }
    });

    cancelPasswordBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        confirmPassword.value = '';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            confirmPassword.value = '';
        }
    });

    function searchUser(username) {
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';

        // Simulate API call
        setTimeout(() => {
            const userData = {
                username: username,
                name: 'Harsh Sharma',
                email: 'Harsh123@gmail.com',
                phone: '7016892914'
            };

            displayUserPreview(userData);
            searchBtn.disabled = false;
            searchBtn.innerHTML = '<i class="fas fa-search"></i> Search';
        }, 1500);
    }

    function displayUserPreview(user) {
        document.getElementById('previewUsername').textContent = user.username;
        document.getElementById('previewName').textContent = user.name;
        document.getElementById('previewEmail').textContent = user.email;
        document.getElementById('previewPhone').textContent = user.phone;

        userPreview.style.display = 'block';
        userPreview.scrollIntoView({ behavior: 'smooth' });
    }

    function deleteUser() {
        confirmPasswordBtn.disabled = true;
        confirmPasswordBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';

        // Simulate delete API call
        setTimeout(() => {
            modal.style.display = 'none';
            userPreview.style.display = 'none';
            searchInput.value = '';
            confirmPassword.value = '';
            confirmPasswordBtn.disabled = false;
            confirmPasswordBtn.innerHTML = 'Confirm';
            
            showMessage('User deleted successfully', 'success');
        }, 2000);
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