document.addEventListener("DOMContentLoaded", function () {

    const calendario = document.getElementById("diasCalendario");
    const nombreMes = document.getElementById("nombreMes");
    const actividadesDelDia = document.getElementById("actividadesDelDia");
    const fechaSeleccionada = document.getElementById("fechaSeleccionada");

    const actividades = {
        agua: "💧 Ahorra agua",
        reciclaje: "♻️ Recicla",
        energia: "⚡ Ahorra energía"
    };

    let mesVisible = new Date();
    mesVisible.setDate(1);

    function claveFecha(fecha) {
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");
        return `${año}-${mes}-${dia}`;
    }

    function consultarActividades(fecha) {
        return Object.keys(actividades).filter(tipo => {
            return localStorage.getItem(
                `brota_${fecha}_${tipo}`
            ) === "completada";
        });
    }

    function mostrarDia(fecha) {
        const registros = consultarActividades(fecha);

        const [año, mes, dia] = fecha.split("-").map(Number);
        const fechaReal = new Date(año, mes - 1, dia);

        fechaSeleccionada.textContent =
            fechaReal.toLocaleDateString("es-CL", {
                weekday: "long",
                day: "numeric",
                month: "long"
            });

        actividadesDelDia.innerHTML = "";

        if (registros.length === 0) {
            actividadesDelDia.textContent =
                "☁️ Aún no tienes actividades registradas este día.";
            return;
        }

        registros.forEach(tipo => {
            const elemento = document.createElement("div");
            elemento.className = "actividad-registrada";
            elemento.textContent = actividades[tipo] + " ✓";
            actividadesDelDia.appendChild(elemento);
        });
    }

    function actualizarCalendario() {
        const año = mesVisible.getFullYear();
        const mes = mesVisible.getMonth();

        nombreMes.textContent =
            mesVisible.toLocaleDateString("es-CL", {
                month: "long",
                year: "numeric"
            });

        calendario.innerHTML = "";

        const espacios =
            (new Date(año, mes, 1).getDay() + 6) % 7;

        const dias =
            new Date(año, mes + 1, 0).getDate();

        for (let i = 0; i < espacios; i++) {
            const vacio = document.createElement("span");
            vacio.className = "dia-vacio";
            calendario.appendChild(vacio);
        }

        for (let dia = 1; dia <= dias; dia++) {
            const fecha = claveFecha(new Date(año, mes, dia));
            const registros = consultarActividades(fecha);

            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "dia-calendario";
            boton.textContent = dia;

            if (registros.length > 0) {
                boton.classList.add("completado");
            }

            boton.addEventListener("click", function () {
                mostrarDia(fecha);
            });

            calendario.appendChild(boton);
        }
    }

    document.getElementById("mesAnterior")
        .addEventListener("click", function () {
            mesVisible.setMonth(mesVisible.getMonth() - 1);
            actualizarCalendario();
        });

    document.getElementById("mesSiguiente")
        .addEventListener("click", function () {
            mesVisible.setMonth(mesVisible.getMonth() + 1);
            actualizarCalendario();
        });

    function actualizarEstadisticas() {
        const hoy = new Date();
        const inicioSemana = new Date(hoy);
        inicioSemana.setDate(
            hoy.getDate() - ((hoy.getDay() + 6) % 7)
        );

        const inicioMes = new Date(
            hoy.getFullYear(), hoy.getMonth(), 1
        );

        function contarDesde(inicio) {
            let total = 0;
            const fecha = new Date(inicio);

            while (fecha <= hoy) {
                total += consultarActividades(claveFecha(fecha)).length;
                fecha.setDate(fecha.getDate() + 1);
            }

            return total;
        }

        document.getElementById("totalHoy").textContent =
            consultarActividades(claveFecha(hoy)).length;

        document.getElementById("totalSemana").textContent =
            contarDesde(inicioSemana);

        document.getElementById("totalMes").textContent =
            contarDesde(inicioMes);
    }

    // Permite actualizar el calendario desde el código principal
    window.actualizarBrota = function () {
        mesVisible = new Date();
        mesVisible.setDate(1);
        actualizarCalendario();
        mostrarDia(claveFecha(new Date()));
        actualizarEstadisticas();
    };

    window.actualizarBrota();
});
