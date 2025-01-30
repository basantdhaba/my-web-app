const demoEmail = "test@demo.com";
const demoPassword = "12345";

loginRegisterButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === demoEmail && password === demoPassword) {
    alert(`Welcome back, ${email}!`);
    authForm.style.display = 'none';
    actionButtons.style.display = 'flex';
  } else {
    alert('Invalid credentials! Use demo: test@demo.com / 12345');
  }
});
