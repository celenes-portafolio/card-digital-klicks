// ==========================================================
// CONFIGURACION: cambia estos datos si algo se actualiza
// ==========================================================
const WHATSAPP_NUMERO = "447521934523"; // sin + ni espacios
const WHATSAPP_MENSAJE = "Hola, quiero hablar con un especialista de Klicks Creative";
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJVeItlV29cEgRly-T_X1wchw";
const FORMULARIO_URL = "https://form.jotform.com/260974369548070";
const SITIO_WEB_URL = "https://klickscreatives.co.uk";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Klicks Creatives UK, 60 Frederick St, Birmingham B1 3HS, United Kingdom");

// Datos para la tarjeta de contacto (vCard)
const VCARD = `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:Katerin Guerrero
N;CHARSET=UTF-8:Guerrero;Katerin;;;
ORG;CHARSET=UTF-8:Klicks Creative UK
TITLE;CHARSET=UTF-8:Creative Director
TEL;TYPE=CELL:+447521934523
EMAIL;CHARSET=UTF-8;TYPE=WORK,INTERNET:hello@klickscreatives.co.uk
ADR;CHARSET=UTF-8;TYPE=WORK:;;60 Frederick St;Birmingham;;B1 3HS;United Kingdom
URL;TYPE=WORK;CHARSET=UTF-8:https://klickscreatives.co.uk
END:VCARD`;

// ==========================================================
// DETECCION DE MOVIL
// ==========================================================
function esMovil() {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

// ==========================================================
// ENLACES SIMPLES (whatsapp, review, web, maps)
// ==========================================================
document.addEventListener("DOMContentLoaded", function () {

    const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(WHATSAPP_MENSAJE);

    // Primer boton (naranja): formulario de la auditoria gratuita
    document.getElementById("btn-formulario").addEventListener("click", function () {
        window.open(FORMULARIO_URL, "_blank");
    });

    // Speak with a Specialist: WhatsApp
    document.getElementById("btn-whatsapp").addEventListener("click", function () {
        window.open(whatsappUrl, "_blank");
    });

    document.getElementById("btn-review").addEventListener("click", function () {
        window.open(GOOGLE_REVIEW_URL, "_blank");
    });

    document.getElementById("btn-web").addEventListener("click", function () {
        window.open(SITIO_WEB_URL, "_blank");
    });

    document.getElementById("btn-maps").addEventListener("click", function () {
        window.open(GOOGLE_MAPS_URL, "_blank");
    });

    // ==========================================================
    // AGREGAR A CONTACTOS
    // ==========================================================
    document.getElementById("btn-contacto").addEventListener("click", function () {
        if (esMovil()) {
            descargarVCard();
        } else {
            mostrarModalQR();
        }
    });

    document.getElementById("cerrar-modal").addEventListener("click", function () {
        document.getElementById("modal-qr").classList.add("oculto");
    });
});

function descargarVCard() {
    const blob = new Blob([VCARD], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "Katerin_Guerrero_Klicks.vcf";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
}

function mostrarModalQR() {
    // Genera el QR apuntando a la URL actual de la tarjeta
    const urlActual = window.location.href;
    const qrSrc = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(urlActual);
    document.getElementById("qr-img").src = qrSrc;
    document.getElementById("modal-qr").classList.remove("oculto");
}


// ==========================================================
// AJUSTE A LA PANTALLA: la tarjeta se escala para verse
// completa sin hacer scroll (celular o computadora baja)
// ==========================================================
function ajustarTarjeta() {
    const tarjeta = document.querySelector(".tarjeta");
    if (!tarjeta) return;

    const movil = window.innerWidth <= 480;
    const margenVertical = movil ? 0 : 48;

    tarjeta.style.zoom = 1;                      // medir tamaño real
    const anchoReal = tarjeta.offsetWidth;
    const altoReal = tarjeta.offsetHeight;

    const escalaAlto = (window.innerHeight - margenVertical) / altoReal;
    const escalaAncho = window.innerWidth / anchoReal;
    const escalaMax = movil ? escalaAncho : 1;   // en PC nunca agrandar

    const escala = Math.min(escalaMax, escalaAlto, escalaAncho);
    tarjeta.style.zoom = escala;

    // En celular se bloquea el scroll para que no se mueva la tarjeta
    document.documentElement.style.overflow = movil ? "hidden" : "";
    document.body.style.overflow = movil ? "hidden" : "";
}

window.addEventListener("load", ajustarTarjeta);
window.addEventListener("resize", ajustarTarjeta);
window.addEventListener("orientationchange", ajustarTarjeta);
document.addEventListener("DOMContentLoaded", ajustarTarjeta);
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(ajustarTarjeta);
}
