document.querySelectorAll('.modal-trigger').forEach(img => {
  img.addEventListener('click', function () {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = this.src;

    // Buscar el pie de foto que acompaña a la imagen
    const captionNode = this.closest('.photo-thumb').querySelector('.photo-caption');
    if (captionNode) {
      captionText.innerHTML = captionNode.innerHTML;
    } else {
      captionText.innerHTML = ''; // o algún mensaje por defecto
    }
  });
});

document.querySelector('.close').onclick = function () {
  document.getElementById('imageModal').style.display = 'none';
};
