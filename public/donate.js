document.getElementById("donationForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const item = document.getElementById("item").value;
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").value;
  const paymentMethod = document.getElementById("paymentMethod").value;
  // Generate a unique transactionId (timestamp + random)
  const transactionId = `txn_${Date.now()}_${Math.floor(Math.random()*100000)}`;

  const result = document.getElementById("donationResult");

  try {
    // Remove login check and user fetch
    const response = await fetch("/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, item, description, amount, currency, paymentMethod, transactionId })
    });
    if (response.ok) {
      result.textContent = `Thank you, ${name}! Your donation of \"${item}\" has been received.`;
      e.target.reset();
    } else {
      const error = await response.json();
      result.textContent = error.message || "Failed to submit donation.";
    }
  } catch (error) {
    result.textContent = "Failed to submit donation. Please try again.";
  }
});
