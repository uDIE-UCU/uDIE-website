document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();

    // Filtrar cada pub-entry según si contiene el texto buscado
    document.querySelectorAll('.pub-entry').forEach(entry => {
      const text = entry.textContent.toLowerCase();
      const match = text.includes(query);
      entry.style.display = match ? 'block' : 'none';
    });

    // Ocultar cada pub-year si no tiene ningún pub-entry visible
    document.querySelectorAll('.pub-year').forEach(yearBlock => {
      const entries = yearBlock.querySelectorAll('.pub-entry');
      const hasVisibleEntry = Array.from(entries).some(e => e.style.display !== 'none');
      yearBlock.style.display = hasVisibleEntry ? 'block' : 'none';
    });

    // Ocultar cada pub-category si no tiene ningún pub-year visible
    document.querySelectorAll('.pub-category').forEach(categoryBlock => {
      const yearBlocks = categoryBlock.querySelectorAll('.pub-year');
      const hasVisibleYear = Array.from(yearBlocks).some(y => y.style.display !== 'none');
      categoryBlock.style.display = hasVisibleYear ? 'block' : 'none';
    });
  });
});
