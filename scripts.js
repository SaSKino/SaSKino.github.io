// Fetch encrypted login data from file
async function fetchLoginData() {
  const response = await fetch("login_data.txt");
  const encryptedData = await response.text();
  return atob(encryptedData); // Decode Base64
}

// Validate user credentials
async function validateLogin(username, password) {
  const loginData = await fetchLoginData();
  const accounts = loginData.split("\n").filter((line) => line.trim() !== "");

  for (const account of accounts) {
    const [storedUsername, storedPassword] = account.split(";");
    if (username === storedUsername && password === storedPassword) {
      return true;
    }
  }

  return false;
}

// Event listeners for login form
const loginForm = document.getElementById("login-form");
const loginModal = document.getElementById("login-modal");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (await validateLogin(username, password)) {
    alert(`Login successful as ${username}!`);
    loginModal.classList.add("hidden");

    // Make timetable editable for specific roles
    if (username === "Arbeiter" || username === "Admin" || username === "Besitzer") {
      makeTimetableEditable();
    }
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// Function to make timetable editable
function makeTimetableEditable() {
  const table = document.getElementById("showtimes");
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    row.contentEditable = true;
  });

  alert("Timetable is now editable!");
}
