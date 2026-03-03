// ================= A =================
window.onload = function () {
    let sitio = document.getElementById("nombre").textContent;
    let cookies = navigator.cookieEnabled ? "tiene" : "no tiene";
    alert("Bienvenido a " + sitio +
        ", le recordamos que el navegador " + cookies +
        " activadas las cookies");
};

// ================= B =================
document.getElementById("pass2").addEventListener("input", function () {
    let p1 = document.getElementById("pass1").value;
    let p2 = document.getElementById("pass2").value;
    let error = "";

    if (p1.length <= 6) error += "Más de 6 caracteres.<br>";
    if (!/[A-Z]/.test(p1)) error += "Falta mayúscula.<br>";
    if (!/[a-z]/.test(p1)) error += "Falta minúscula.<br>";
    if (!/[0-9]/.test(p1)) error += "Falta número.<br>";
    if (p1 !== p2) error += "No coinciden.<br>";

    document.getElementById("passError").innerHTML = error;
});

// ================= C =================
document.getElementById("email").addEventListener("input", function () {
    let email = this.value;
    let ok = email.includes("@") && email.includes(".");

    if (!ok)
        document.getElementById("emailError").textContent = 
            "Email no válido (ej: usuario@gmail.com)";
    else
        document.getElementById("emailError").textContent = "";
});

// ================= D =================
document.getElementById("cp").addEventListener("change", function () {
    let ciudades = {
        "28001": "Madrid",
        "41001": "Sevilla",
        "29001": "Málaga",
        "08001": "Barcelona",
        "46001": "Valencia"
    };

    document.getElementById("provincia").textContent = ciudades[this.value] || "";
});

// ================= E =================
let leido = false;

document.getElementById("linkTerminos").addEventListener("click", function () {
    leido = true;
    document.getElementById("acepto").disabled = false;
});

// ================= F =================
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let errores = [];

    // F.a confirm si no quiere correos
    let correo = document.querySelector('input[name="recibir"]:checked').value;
    if (correo === "no") {
        if (!confirm("¿Seguro que no deseas recibir correos?")) return;
    }

    // F.b obligatorios
    if (!document.getElementById("nombre").value.trim()) errores.push("Falta nombre");
    if (!document.getElementById("usuario").value.trim()) errores.push("Falta usuario");
    if (!document.getElementById("direccion").value.trim()) errores.push("Falta dirección");
    if (!document.getElementById("cp").value) errores.push("Falta código postal");
    if (!document.getElementById("email").value.trim()) errores.push("Falta email");
    if (!document.getElementById("pass1").value) errores.push("Falta contraseña");
    if (!document.getElementById("pass2").value) errores.push("Falta repetir contraseña");

    // F.c 
    if (document.getElementById("passError").textContent.trim() !== "")
        errores.push("Contraseña incorrecta");

    if (document.getElementById("emailError").textContent.trim() !== "")
        errores.push("Email incorrecto");

    // F.d intereses 2-6
    let intereses = document.querySelectorAll('input[name="intereses"]:checked').length;
    if (intereses < 2 || intereses > 6)
        errores.push("Intereses fuera de rango (2-6)");

    if (errores.length === 0)
        document.getElementById("resultado").textContent =
            "Formulario correcto. Enviando datos al servidor.";
    else
        document.getElementById("resultado").textContent =
            "No se puede enviar: " + errores.join(", ");
});