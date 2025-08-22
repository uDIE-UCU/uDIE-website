document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const publicationList = document.getElementById('publicationList');

  searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();

    document.querySelectorAll('.pub-entry').forEach(entry => {
      // Busca en el texto de la entrada, el año (h4), la categoría principal (h3) y la subcategoría (h4 de pub-theses)
      const entryText = entry.textContent.toLowerCase();

      // Busca el año/subcategoría (h4) más cercano
      let yearOrSubcatText = '';
      let parentWithH4 = entry.closest('.pub-year, .pub-theses');
      if (parentWithH4 && parentWithH4.querySelector('h4')) {
        yearOrSubcatText = parentWithH4.querySelector('h4').textContent.toLowerCase();
      }

      // Busca la categoría principal (h3)
      let categoryBlock = entry.closest('.pub-category');
      let catText = categoryBlock && categoryBlock.querySelector('h3') ? categoryBlock.querySelector('h3').textContent.toLowerCase() : '';

      // Coincidencia por texto, año, categoría principal o subcategoría
      const match = entryText.includes(query) || yearOrSubcatText.includes(query) || catText.includes(query);
      entry.style.display = match ? '' : 'none';
    });

    // Mostrar/ocultar pub-year y pub-theses si tienen al menos una pub-entry visible
    document.querySelectorAll('.pub-year, .pub-theses').forEach(block => {
      const hasVisibleEntry = Array.from(block.querySelectorAll('.pub-entry')).some(e => e.style.display !== 'none');
      block.style.display = hasVisibleEntry ? '' : 'none';
    });

    // Mostrar/ocultar pub-category si tiene al menos un pub-year o pub-theses visible
    document.querySelectorAll('.pub-category').forEach(categoryBlock => {
      const hasVisibleChild = Array.from(categoryBlock.querySelectorAll('.pub-year, .pub-theses')).some(b => b.style.display !== 'none');
      categoryBlock.style.display = hasVisibleChild ? '' : 'none';
    });
  });
});