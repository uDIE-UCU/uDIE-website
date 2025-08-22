document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();

    document.querySelectorAll('.pub-year').forEach(yearBlock => {
      const yearText = yearBlock.querySelector('h4') ? yearBlock.querySelector('h4').textContent.toLowerCase() : '';
      let hasVisibleEntry = false;

      yearBlock.querySelectorAll('.pub-entry').forEach(entry => {
        const entryText = entry.textContent.toLowerCase();
        // Busca en el texto de la entrada y en el año
        const match = entryText.includes(query) || yearText.includes(query);
        entry.style.display = match ? '' : 'none';
        if (match) hasVisibleEntry = true;
      });

      yearBlock.style.display = hasVisibleEntry ? '' : 'none';
    });

    document.querySelectorAll('.pub-category').forEach(categoryBlock => {
      const years = categoryBlock.querySelectorAll('.pub-year');
      const hasVisibleYear = Array.from(years).some(year => year.style.display !== 'none');
      categoryBlock.style.display = hasVisibleYear ? '' : 'none';
    });
  });
});