document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('categoryFilter');
    const tableRows = document.querySelectorAll('#documentTable tr');

    function filterTable() {
        const search = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        tableRows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const rowCategory = row.getAttribute('data-category');
            const matchesSearch = name.includes(search);
            const matchesCategory = !category || rowCategory === category;
            row.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterTable);
    categoryFilter.addEventListener('change', filterTable);

    // Botones para filtrar por categoría
    document.querySelectorAll('.filter-category-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var category = btn.getAttribute('data-category');
            categoryFilter.value = category;
            categoryFilter.dispatchEvent(new Event('change'));
            // Scroll suave al filtro
            var filterSection = document.getElementById('filter-section');
            if (filterSection) {
                filterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});