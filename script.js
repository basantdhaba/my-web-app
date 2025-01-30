const playButton = document.getElementById('playButton');
const loginSection = document.getElementById('loginSection');

playButton.addEventListener('click', () => {
  loginSection.style.display = loginSection.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('loginSubmitButton').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (email === 'test@demo.com' && password === '12345') {
    alert('Login successful!');
    loginSection.style.display = 'none';
  } else {
    alert('Invalid credentials. Please use test@demo.com and password 12345.');
  }
});
