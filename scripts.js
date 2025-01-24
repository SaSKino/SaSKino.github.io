// C++-style Base64 encoding and decoding functions
function base64Encode(input) {
  const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let encoded = "";
  let val = 0;
  let bits = -6;
  const b63 = 0x3F;

  for (const c of input) {
    val = (val << 8) + c.charCodeAt(0);
    bits += 8;

    while (bits >= 0) {
      encoded += base64Chars[(val >> bits) & b63];
      bits -= 6;
    }
  }

  if (bits > -6) {
    encoded += base64Chars[((val << 8) >> (bits + 8)) & b63];
  }

  while (encoded.length % 4) {
    encoded += "=";
  }

  return encoded;
}

function base64Decode(input) {
  const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let decoded = "";
  let val = 0;
  let bits = -8;

  for (const c of input) {
    if (c === "=") break;
    val = (val << 6) + base64Chars.indexOf(c);
    bits += 6;

    if (bits >= 0) {
      decoded += String.fromCharCode((val >> bits) & 0xFF);
      bits -= 8;
    }
  }

  return decoded;
}

// Fetch encrypted login data
async function fetchLoginData() {
  const response = await fetch("login_data.txt");
  const encryptedData = await response.text();
  return base64Decode(encryptedData);
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
      document.getElementById("account-modal").classList.remove("hidden");
    }
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// Placeholder for account management
document.getElementById("close-account-modal").addEventListener("click", () => {
  document.getElementById("account-modal").classList.add("hidden");
});
