document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();

    document.querySelectorAll('.pub-year').forEach(yearBlock => {
      const yearText = yearBlock.querySelector('h4')?.textContent.toLowerCase() || '';
      let hasMatch = false;

      // Si la búsqueda es un año exacto (4 dígitos), mostrar todo el bloque de ese año
      if (/^\d{4}$/.test(query) && yearText.includes(query)) {
        yearBlock.style.display = 'block';
        yearBlock.querySelectorAll('.pub-entry').forEach(entry => {
          entry.style.display = 'block';
        });
        hasMatch = true;
      } else {
        // Si es palabra clave, buscar dentro de cada publicación
        yearBlock.querySelectorAll('.pub-entry').forEach(entry => {
          const text = entry.textContent.toLowerCase();
          const match = text.includes(query);
          entry.style.display = match ? 'block' : 'none';
          if (match) hasMatch = true;
        });

        // Mostrar u ocultar el bloque según si hubo coincidencias
        yearBlock.style.display = hasMatch ? 'block' : 'none';
      }
    });
  });
});
