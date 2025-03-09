// Elementos del DOM
const nickModal = document.getElementById("nick-modal");
const nickInput = document.getElementById("nick-input");
const submitNick = document.getElementById("submit-nick");
const userNickDisplay = document.getElementById("user-nick-display");

// Variable global para el nick del usuario
let currentNick = localStorage.getItem("userNick") || "";

// Mostrar modal de nick si no hay un nick guardado
window.onload = () => {
    if (!currentNick) {
        nickModal.style.display = "flex";
    } else {
        userNickDisplay.textContent = `Bienvenido, ${currentNick}!`;
    }
};

// Guardar nick y cerrar modal
submitNick.addEventListener("click", () => {
    const nick = nickInput.value.trim();
    if (nick.length === 0) {
        alert("Por favor, ingresa tu nick de Minecraft.");
        return;
    }
    currentNick = nick;
    localStorage.setItem("userNick", currentNick); // Guardar el nick en localStorage
    userNickDisplay.textContent = `Bienvenido, ${currentNick}!`;
    nickModal.style.display = "none";
});
