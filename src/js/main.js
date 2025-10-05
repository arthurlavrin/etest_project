document.querySelectorAll('.btn.view-all').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.href = '/src/pages/catalog.html';
  });
});
