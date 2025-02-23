// Get elements
const loginBtn = document.getElementById('login-btn');
const closeModal = document.getElementById('close-modal');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');

// Show login modal
loginBtn.addEventListener('click', () => {
  loginModal.classList.add('show');
});

// Hide login modal
closeModal.addEventListener('click', () => {
  loginModal.classList.remove('show');
});

// Handle login submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username && password) {
    alert(`Login successful! Welcome, ${username}.`);
    loginModal.classList.remove('show');
  } else {
    alert('Please enter both username and password.');
  }
});
