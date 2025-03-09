// Variables globales
let currentNick = "";

// Elementos del DOM
const nickModal = document.getElementById("nick-modal");
const nickInput = document.getElementById("nick-input");
const submitNick = document.getElementById("submit-nick");

const ratingModal = document.getElementById("rating-modal");
const openRatingModal = document.getElementById("open-rating-modal");
const closeRatingModal = document.querySelector(".close");
const stars = document.querySelectorAll(".stars span");
const commentInput = document.getElementById("comment");
const submitRating = document.getElementById("submit-rating");

const voteStats = document.getElementById("vote-stats");
const seeMoreBtn = document.getElementById("see-more-btn");
const allRatings = document.getElementById("all-ratings");

// Mostrar modal de nick al cargar la página
window.onload = () => {
    nickModal.style.display = "flex";
};

// Guardar nick y cerrar modal
submitNick.addEventListener("click", () => {
    const nick = nickInput.value.trim();
    if (nick.length === 0) {
        alert("Por favor, ingresa tu nick de Minecraft.");
        return;
    }
    currentNick = nick;
    nickModal.style.display = "none";
});

// Abrir modal de calificación
openRatingModal.addEventListener("click", () => {
    if (!currentNick) {
        alert("Por favor, ingresa tu nick de Minecraft primero.");
        return;
    }
    ratingModal.style.display = "flex"; // Mostrar el modal
});

// Cerrar modal de calificación
closeRatingModal.addEventListener("click", () => {
    ratingModal.style.display = "none"; // Ocultar el modal
    resetRating(); // Reiniciar la selección de estrellas y el comentario
});

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener("click", (event) => {
    if (event.target === ratingModal) {
        ratingModal.style.display = "none";
        resetRating();
    }
});

// Seleccionar estrellas
let selectedRating = 0;
stars.forEach((star) => {
    star.addEventListener("click", () => {
        selectedRating = star.getAttribute("data-value");
        stars.forEach((s, index) => {
            if (index < selectedRating) {
                s.classList.add("active");
            } else {
                s.classList.remove("active");
            }
        });
    });
});

// Enviar valoración
submitRating.addEventListener("click", () => {
    if (selectedRating === 0) {
        alert("Por favor, selecciona una calificación.");
        return;
    }

    const comment = commentInput.value.trim();
    if (comment.length > 200) {
        alert("El comentario no puede exceder los 200 caracteres.");
        return;
    }

    const rating = {
        nick: currentNick,
        stars: selectedRating,
        comment: comment,
        date: new Date().toLocaleDateString(),
    };

    saveRating(rating); // Guardar en localStorage
    updateVoteStats(); // Actualizar estadísticas
    updateAllRatings(); // Actualizar lista de valoraciones
    ratingModal.style.display = "none";
    resetRating();
});

// Guardar valoración en localStorage
function saveRating(rating) {
    let ratings = JSON.parse(localStorage.getItem("ratings")) || [];
    ratings.push(rating);
    localStorage.setItem("ratings", JSON.stringify(ratings));
}

// Obtener todas las valoraciones de localStorage
function getRatings() {
    return JSON.parse(localStorage.getItem("ratings")) || [];
}

// Actualizar estadísticas de votos
function updateVoteStats() {
    const ratings = getRatings();
    const totalRatings = ratings.length;
    const starCounts = [0, 0, 0, 0, 0];

    ratings.forEach((rating) => {
        starCounts[rating.stars - 1]++;
    });

    let statsHTML = "<h3>Estadísticas de Votos</h3>";
    starCounts.forEach((count, index) => {
        const percentage = totalRatings > 0 ? ((count / totalRatings) * 100).toFixed(2) : 0;
        statsHTML += `<p>${index + 1} estrella(s): ${percentage}%</p>`;
    });

    voteStats.innerHTML = statsHTML;
}

// Actualizar todas las valoraciones
function updateAllRatings() {
    const ratings = getRatings();
    let ratingsHTML = "<h3>Valoraciones</h3>";

    ratings.forEach((rating) => {
        ratingsHTML += `
            <div class="rating-item">
                <p><strong>${rating.nick}</strong> - ${rating.date}</p>
                <p>${rating.stars} estrellas</p>
                <p>${rating.comment}</p>
            </div>
        `;
    });

    allRatings.innerHTML = ratingsHTML;
}

// Mostrar/ocultar valoraciones
seeMoreBtn.addEventListener("click", () => {
    allRatings.classList.toggle("hidden");
    seeMoreBtn.textContent = allRatings.classList.contains("hidden") ? "Ver Valoraciones" : "Ocultar Valoraciones";
});

// Reiniciar la selección de estrellas y el comentario
function resetRating() {
    selectedRating = 0;
    stars.forEach((star) => star.classList.remove("active"));
    commentInput.value = "";
}

// Inicializar la página
updateVoteStats();
updateAllRatings();