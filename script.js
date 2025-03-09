// Ejemplo: Cambiar el color del header al hacer scroll
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.backgroundColor = "#0a192f"; // Azul oscuro
    } else {
        header.style.backgroundColor = "#112240"; // Azul oscuro más claro
    }
});
