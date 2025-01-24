// Base64 Encode/Decode Functions
function base64Encode(input) {
  return btoa(input);
}

function base64Decode(input) {
  return atob(input);
}

// Fetch encrypted login data
async function fetchLoginData() {
  const response = await fetch("login_data.txt");
  const encryptedData = await response.text();
  return base64Decode(encryptedData);
}

// Fetch timetable data
async function fetchTimetableData() {
  const response = await fetch("timetable_data.txt");
  const timetableData = await response.text();
  return timetableData.trim();
}

// Save timetable data
async function saveTimetableData(data) {
  const blob = new Blob([data], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "timetable_data.txt";
  a.click();
}

// Validate login credentials
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

// Load timetable into the table
async function loadTimetable() {
  const timetable = await fetchTimetableData();
  const rows = timetable
    .split("\n")
    .map((line) => {
      const [time, movie] = line.split(";");
      return `<tr><td>${time}</td><td>${movie}</td></tr>`;
    })
    .join("");
  document.getElementById("timetable-body").innerHTML = rows;
}

// Enable timetable editing
function enableTimetableEditing() {
  const rows = document.querySelectorAll("#timetable-body tr");
  rows.forEach((row) => {
    row.contentEditable = "true";
    row.style.border = "1px solid blue";
  });
  document.getElementById("save-timetable").classList.remove("hidden");
}

// Save the timetable
async function saveTimetable() {
  const rows = document.querySelectorAll("#timetable-body tr");
  const timetableData = Array.from(rows)
    .map((row) => {
      const cells = row.querySelectorAll("td");
      return `${cells[0].innerText};${cells[1].innerText}`;
    })
    .join("\n");

  saveTimetableData(timetableData);
  alert("Timetable saved successfully!");
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

    if (username === "Arbeiter") {
      document.getElementById("edit-timetable").classList.remove("hidden");
      document
        .getElementById("edit-timetable")
        .addEventListener("click", enableTimetableEditing);
      document
        .getElementById("save-timetable")
        .addEventListener("click", saveTimetable);
    }
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// Load the timetable on page load
loadTimetable();
