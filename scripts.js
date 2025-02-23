// Show the login modal when the "Login" button is clicked
document.getElementById("login-btn").addEventListener("click", () => {
  document.getElementById("login-modal").classList.remove("hidden");
});

// Hide the login modal when the "Close" button is clicked
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("login-modal").classList.add("hidden");
});

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    alert(`Login successful! Welcome, ${username}.`);
    document.getElementById("login-modal").classList.add("hidden");
  } else {
    alert("Please enter valid credentials.");
  }
});
