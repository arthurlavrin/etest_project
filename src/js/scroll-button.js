document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('scroll-button');

  if (!btn) {return;} // защита если кнопка не найдена

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
