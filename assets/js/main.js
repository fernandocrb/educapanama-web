// EducaPanamá — interacciones básicas
document.addEventListener("DOMContentLoaded", function () {
  // Menú móvil
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("abierto");
      var abierto = nav.classList.contains("abierto");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
  }

  // Año actual en el pie de página
  var anio = document.getElementById("anio-actual");
  if (anio) anio.textContent = new Date().getFullYear();

  // ---- Formulario de contacto / demo ----
  var form = document.getElementById("form-contacto");
  if (form) {
    form.addEventListener("submit", function (e) {
      // Lee un campo por su id (independiente del nombre que use Mautic)
      function val(id) {
        var el = document.getElementById(id);
        return el && el.value ? el.value.trim() : "";
      }

      var producto = val("producto");
      var mensajeUsuario = val("mensaje");

      // Mensaje de WhatsApp
      var mensajeWa =
        "Hola, soy " + val("nombre") +
        ", " + val("cargo") +
        " de " + val("colegio") +
        ". Me interesa: " + producto + ".";
      if (mensajeUsuario) mensajeWa += " " + mensajeUsuario;
      var urlWa = "https://wa.me/50763304392?text=" + encodeURIComponent(mensajeWa);

      // ¿Conectado a Mautic? (tiene action + target al iframe oculto)
      var conectadoAMautic = form.getAttribute("action") && form.getAttribute("target");

      if (conectadoAMautic) {
        // Cada dato (nombre, producto, mensaje, etc.) tiene su propio campo en
        // Mautic. Abrimos WhatsApp y mostramos gracias. NO hacemos preventDefault:
        // el envío nativo va a Mautic dentro del iframe oculto.
        avisarConversion(form);
        window.open(urlWa, "_blank");
        mostrarGracias(form);
      } else {
        // Solo WhatsApp (sin Mautic)
        e.preventDefault();
        window.open(urlWa, "_blank");
      }
    });
  }

  // Avisa a Google Tag Manager de que se envió un lead. A diferencia de otros
  // sitios nuestros, aquí el visitante NO se va a una página de gracias (el
  // envío viaja a Mautic en un iframe oculto y se abre WhatsApp), así que no
  // hay una URL que Analytics pueda usar para detectar la conversión: hay que
  // empujar el evento a mano. En GTM esto se recoge con un activador de
  // "evento personalizado" llamado lead_enviado.
  //
  // dataLayer solo existe si el visitante aceptó las cookies (ver cookies.js).
  // Si no aceptó, este push no hace nada y no se rastrea — que es lo correcto.
  function avisarConversion(form) {
    if (!window.dataLayer) return;
    window.dataLayer.push({
      event: "lead_enviado",
      origen: form.getAttribute("data-origen") || "contacto"
    });
  }

  function mostrarGracias(form) {
    if (!form.querySelector(".mensaje-gracias")) {
      var g = document.createElement("p");
      g.className = "nota-form mensaje-gracias";
      g.setAttribute("role", "status");
      g.style.color = "var(--verde)";
      g.style.fontWeight = "700";
      g.textContent =
        "¡Gracias! Recibimos tus datos. Si no se abrió WhatsApp, escríbenos al +507 6330-4392.";
      form.appendChild(g);
    }
    // Limpiamos el formulario DESPUÉS de que el envío a Mautic ya salió.
    setTimeout(function () { form.reset(); }, 1500);
  }
});
