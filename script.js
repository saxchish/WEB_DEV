// Fetch configuration data from JSON file
fetch('config.json')
  .then((response) => response.json())
  .then((config) => {
    setupForm(config);
  })
  .catch((error) => console.error('Error loading config:', error));

// Setup form placeholders and actions
function setupForm(config) {
  const placeholders = config.placeholders;

  // Assign placeholders to inputs
  document.querySelector('input[name="name"]').placeholder = placeholders.fullName;
  document.querySelector('input[name="email"]').placeholder = placeholders.email;
  document.querySelector('input[name="number"]').placeholder = placeholders.mobileNumber;
  document.querySelector('input[name="stream"]').placeholder = placeholders.stream;
  document.querySelector('input[name="year"]').placeholder = placeholders.graduationYear;
  document.querySelector('input[name="company"]').placeholder = placeholders.company;

  // Set form action
  document.querySelector('form').action = config.formAction;

  // Redirect on sign-up click
  const signUpButton = document.querySelector('.log-in1');
  signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = config.dashboardRedirect;
  });

  // Redirect on sign-in link click
  document.querySelector('a[href="/signin"]').href = config.signinRedirect;

  // Add focus and blur behavior for placeholders
  document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('focus', function () {
      this.dataset.placeholder = this.placeholder;
      this.placeholder = '';
    });

    input.addEventListener('blur', function () {
      if (this.value === '') {
        this.placeholder = this.dataset.placeholder;
      }
    });
  });
}
