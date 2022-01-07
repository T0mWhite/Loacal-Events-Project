const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  console.log("SIGNUP FORM HANDLER");
  event.preventDefault();

  const firstName = document.querySelector('#first-name-signup').value.trim();
  const lastName = document.querySelector('#last-name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (firstName && lastName && email && password) {
    console.log("FIELDS ARE TRUE => FETCH");
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
console.log("FETCH WORKED");
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log("SIGNUP DIDNT WORK");
      alert(response.statusText);
    }
  }
};

const test = (event) => {
  event.preventDefault();
  console.log("DUMMYFUNC");
}

// test();
// document.querySelector('#submitBtn').onclick(test);

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
