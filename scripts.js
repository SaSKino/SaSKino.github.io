// Fetch and decode login data
async function fetchLoginData() {
  const response = await fetch("login_data.txt");
  const encryptedData = await response.text();
  return atob(encryptedData); // Base64 decode
}

// Validate user credentials
async function validateLogin(username, password) {
  const loginData = await fetchLoginData();
  const accounts = loginData.split("\n").filter(Boolean);

  for (const account of accounts) {
    const [storedUsername, storedPassword] = account.split(";");
    if (username === storedUsername && password === storedPassword) {
      return true;
    }
  }
  return false;
}

// Event listeners for login modal
document.getElementById("login-btn").addEventListener("click", () => {
  document.getElementById("login-modal").classList.remove("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("login-modal").classList.add("hidden");
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (await validateLogin(username, password)) {
    alert(`Welcome, ${username}!`);
    document.getElementById("login-modal").classList.add("hidden");

    if (username === "Besitzer") {
      showAccountManagement();
    }
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// Placeholder function for account management
function showAccountManagement() {
  document.getElementById("account-modal").classList.remove("hidden");
}
