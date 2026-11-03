(function () {
    const boton = document.createElement("button");
    boton.textContent = "🧹 Borrar actividades de prueba de hoy";
    boton.type = "button";

    boton.style.cssText =
        "display:block;margin:20px auto;padding:14px;" +
        "border:0;border-radius:14px;background:#FFE4D6;" +
        "color:#65412F;font-weight:bold;cursor:pointer;";

    boton.addEventListener("click", function () {
        const hoy = new Date();
        const fecha = hoy.getFullYear() + "-" +
            String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
            String(hoy.getDate()).padStart(2, "0");

        if (!confirm("¿Borrar las actividades de prueba de hoy?")) {
            return;
        }

        ["agua", "reciclaje", "energia"].forEach(function (tipo) {
            localStorage.removeItem("brota_" + fecha + "_" + tipo);
        });

        location.reload();
    });

    document.addEventListener("DOMContentLoaded", function () {
        const inicio = document.querySelector(
            "#pantallaInicio .inicio-contenido"
        );

        if (inicio) {
            inicio.appendChild(boton);
        }
    });
})();
