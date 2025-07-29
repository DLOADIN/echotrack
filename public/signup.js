document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Use environment-based API URL
    const apiUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api/users/signup'
      : 'https://echotrack-backend-0ty9.onrender.com/api/users/signup';
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    });

    if (response.ok) {
      alert(`Account created successfully for ${name}! Please login.`);
      window.location.href = "login.html";
    } else {
      const error = await response.json();
      alert(error.message || "Failed to create account");
    }
  } catch (error) {
    console.error("Error creating account:", error);
    alert("Failed to create account. Please try again.");
  }
});

// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const passwordToggle = document.getElementById('passwordToggle');
  const passwordInput = document.getElementById('password');
  
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Toggle eye icon
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  }
});
