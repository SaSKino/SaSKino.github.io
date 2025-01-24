// Mock encrypted login credentials
const encryptedLoginData = "776f726b65723a6b696e6f313233"; // Encoded: "worker:kino123"

// Function to decrypt login data
function decryptLoginData(encryptedData) {
  const decoded = atob(encryptedData);
  const [username, password] = decoded.split(":");
  return { username, password };
}

// Decrypt the login data
const { username: storedUsername, password: storedPassword } = decryptLoginData(encryptedLoginData);

// Login functionality
const loginModal = document.getElementById("login-modal");
const workerLoginButton = document.getElementById("worker-login");
const closeModalButton = document.getElementById("close-modal");
const loginForm = document.getElementById("login-form");

// Show login modal
workerLoginButton.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});

// Close login modal
closeModalButton.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const enteredUsername = document.getElementById("username").value;
  const enteredPassword = document.getElementById("password").value;

  if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
    alert("Login successful! Timetable is now editable.");
    loginModal.classList.add("hidden");
    makeTimetableEditable();
  } else {
    alert("Invalid credentials!");
  }
});

// Make timetable editable
function makeTimetableEditable() {
  const table = document.getElementById("showtimes");
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    row.contentEditable = true;
  });

  alert("You can now edit the timetable!");
}
