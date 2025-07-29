document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {
    // Use environment-based API URL
    const apiUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api/users/login'
      : 'https://echotrack-backend-0ty9.onrender.com/api/users/login';
    
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save JWT token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    
    // Set session flag to indicate successful login
    sessionStorage.setItem("justLoggedIn", "true");
    
    // Show success message
    alert("Login successful!");
    
    // Add a small delay to ensure localStorage is updated
    setTimeout(() => {
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    }, 100);
    
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Something went wrong. Try again later.");
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
