document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.getElementById("scrollTopBtn");

    scrollBtn.style.display = "none";

    window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY > 200) {
        scrollBtn.style.display = "flex"; //flexbox block
    } else {
        scrollBtn.style.display = "none";
    }
    });

    scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    });
});
