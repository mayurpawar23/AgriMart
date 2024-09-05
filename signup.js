// Get references to the form elements
const form = document.querySelector('.auth-form');
const usernameInput = form.querySelector('input[placeholder="Username"]');
const nameInput = form.querySelector('input[placeholder="Name"]');
const emailInput = form.querySelector('input[placeholder="Email"]');
const mobileInput = form.querySelector('input[placeholder="Mobile"]');
const ageInput = form.querySelector('input[placeholder="Age"]');
const passwordInput = form.querySelector('input[placeholder="Password"]');
const confirmPasswordInput = form.querySelector('input[placeholder="Confirm Password"]');
const locationInput = form.querySelector('input[placeholder="Location"]');
const roleInput = form.querySelector('input[name="role"]:checked');

// Add event listener to the form submit button
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Collect data from the form fields
  const username = usernameInput.value;
  const name = nameInput.value;
  const email = emailInput.value;
  const mobile = mobileInput.value;
  const age = ageInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const location = locationInput.value;
  const role = roleInput.value;

  // Validate password match
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Display the collected data in the console (or send it to your server)
  console.log('Collected data:', {
    username,
    name,
    email,
    mobile,
    age,
    password,
    location,
    role
  });
});