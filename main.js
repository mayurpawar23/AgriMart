form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    // Collect data
    const email = emailInput.value;
    const password = passwordInput.value;
  
    // Send data to backend using fetch API
    fetch('/your-backend-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from your backend (e.g., redirect to dashboard)
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });