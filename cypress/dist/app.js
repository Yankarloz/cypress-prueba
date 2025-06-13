document.getElementById("cambiarTexto").addEventListener("click", () => {
  document.getElementById("mensaje").textContent = "Texto cambiado con éxito.";
});

document.getElementById("formulario").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  document.getElementById("resultado").textContent = `¡Hola, ${nombre}!`;
});
