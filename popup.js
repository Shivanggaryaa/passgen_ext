function generate() {
  let dictionary = '';
  if (document.getElementById('lowercaseCb').checked) {
    dictionary += 'qwertyuiopasdfghjklzxcvbnm';
  }
  if (document.getElementById('uppercaseCb').checked) {
    dictionary += 'QWERTYUIOPASDFGHJKLZXCVBNM';
  }
  if (document.getElementById('digitsCb').checked) {
    dictionary += '1234567890';
  }
  if (document.getElementById('specialsCb').checked) {
    dictionary += '!@#$%^&*()_+-={}[];<>:';
  }

  const length = document.querySelector('input[type="range"]').value;

  if (length < 1 || dictionary.length === 0) {
    document.querySelector('input[type="text"]').value = '';
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const pos = Math.floor(Math.random() * dictionary.length);
    password += dictionary[pos];
  }

  document.querySelector('input[type="text"]').value = password;
}

document.addEventListener('DOMContentLoaded', () => {
  // Bind generate events
  [...document.querySelectorAll('input[type="checkbox"], button.generate')].forEach(elem => {
    elem.addEventListener('click', generate);
  });

  document.querySelector('input[type="range"]').addEventListener('input', e => {
    document.querySelector('div.range span').innerHTML = e.target.value;
    generate();
  });

  document.querySelector('div.password button').addEventListener('click', () => {
    const pass = document.querySelector('input[type="text"]').value;
    navigator.clipboard.writeText(pass).then(() => {
      const copyBtn = document.querySelector('div.password button');
      copyBtn.innerHTML = 'copied!';
      setTimeout(() => {
        copyBtn.innerHTML = 'copy';
      }, 1000);
    });
  });

  // 🌓 Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.checked = true;
  }

  themeToggle.addEventListener('change', () => {
    const isLight = themeToggle.checked;
    document.body.classList.toggle('light-mode', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  generate();
});
