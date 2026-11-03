document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // ELEMENTOS DE LAS PANTALLAS
    // =====================================

    const bienvenida = document.getElementById("pantallaBienvenida");
    const inicio = document.getElementById("pantallaInicio");
    const pantallaActividad = document.getElementById("pantallaActividad");

    const btnComenzar = document.getElementById("btnComenzar");
    const btnVolver = document.getElementById("btnVolver");
    const btnCompletar = document.getElementById("btnCompletar");

    const nombreMes = document.getElementById("nombreMes");
    const diasCalendario = document.getElementById("diasCalendario");
    const fechaSeleccionada = document.getElementById("fechaSeleccionada");
    const actividadesDelDia = document.getElementById("actividadesDelDia");

    // =====================================
    // ACTIVIDADES ECOLÓGICAS
    // =====================================

    const actividades = {
        agua: {
            titulo: "Ahorra agua",
            icono: "💧",
            descripcion: "¡Cada gota cuenta! Aprende a cuidar el agua.",
            consejo: "Cierra la llave mientras te cepillas los dientes."
        },

        reciclaje: {
            titulo: "Recicla",
            icono: "♻️",
            descripcion: "Ayuda al planeta separando tus residuos.",
            consejo: "Separa papel, cartón, vidrio y plástico según las opciones de reciclaje de tu comuna."
        },

        energia: {
            titulo: "Ahorra energía",
            icono: "⚡",
            descripcion: "Usa la energía de manera responsable.",
            consejo: "Apaga las luces y desconecta los aparatos que no estés utilizando."
        }
    };

    let actividadActual = null;

    // Mes que está mostrando el calendario
    let mesVisible = new Date();
    mesVisible.setDate(1);
    mesVisible.setHours(12, 0, 0, 0);

    let fechaElegida = obtenerFechaLocal(new Date());

    // =====================================
    // FECHAS LOCALES
    // =====================================

    function obtenerFechaLocal(fecha) {
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");

        return `${año}-${mes}-${dia}`;
    }

    function crearFechaLocal(claveFecha) {
        const [año, mes, dia] = claveFecha.split("-").map(Number);
        return new Date(año, mes - 1, dia, 12);
    }

    // =====================================
    // NAVEGACIÓN
    // =====================================

    function mostrarPantalla(pantalla) {
        bienvenida.hidden = true;
        inicio.hidden = true;
        pantallaActividad.hidden = true;
        document.getElementById("pantallaDia").hidden = true;

        pantalla.hidden = false;

        if (pantalla === inicio) {
            actualizarInicio();
        }

        window.scrollTo(0, 0);
    }

    

    btnVolver.addEventListener("click", function () {
        mostrarPantalla(inicio);
    });

    // =====================================
    // ABRIR ACTIVIDADES
    // =====================================

    function abrirActividad(tipo) {
        actividadActual = tipo;

        const actividad = actividades[tipo];

        document.getElementById("detalleIcono").textContent =
            actividad.icono;

        document.getElementById("detalleTitulo").textContent =
            actividad.titulo;

        document.getElementById("detalleDescripcion").textContent =
            actividad.descripcion;

        document.getElementById("detalleConsejo").textContent =
            actividad.consejo;

        document.getElementById("mensajeActividad").textContent = "";

        mostrarPantalla(pantallaActividad);
    }

    document.getElementById("btnAgua")
        .addEventListener("click", function () {
            abrirActividad("agua");
        });

    document.getElementById("btnReciclaje")
        .addEventListener("click", function () {
            abrirActividad("reciclaje");
        });

    document.getElementById("btnEnergia")
        .addEventListener("click", function () {
            abrirActividad("energia");
        });

    // =====================================
    // CONSULTAR ACTIVIDADES GUARDADAS
    // =====================================

    function actividadesEnFecha(claveFecha) {
        const completadas = [];

        for (const tipo of Object.keys(actividades)) {
            const clave = `brota_${claveFecha}_${tipo}`;

            if (localStorage.getItem(clave) === "completada") {
                completadas.push(tipo);
            }
        }

        return completadas;
    }

    // =====================================
    // MARCAR ACTIVIDAD COMO COMPLETADA
    // =====================================

    btnCompletar.addEventListener("click", function () {

        if (!actividadActual) return;

        const hoy = new Date();
        const claveFecha = obtenerFechaLocal(hoy);

        const clave = `brota_${claveFecha}_${actividadActual}`;

        const mensaje = document.getElementById("mensajeActividad");

        if (localStorage.getItem(clave) === "completada") {
            mensaje.textContent =
                "💚 ¡Ya completaste esta actividad hoy!";
            return;
        }

        try {
            localStorage.setItem(clave, "completada");

            mensaje.textContent =
                "🌟 ¡Excelente! Nubi está orgulloso de ti. Tu actividad quedó registrada.";

            // Volver a mostrar el mes y día actual
            mesVisible = new Date(
                hoy.getFullYear(),
                hoy.getMonth(),
                1,
                12
            );

            fechaElegida = claveFecha;

            // Actualizar calendario y estadísticas
            actualizarInicio();

        } catch (error) {
            mensaje.textContent =
                "No pudimos guardar tu actividad. Revisa el almacenamiento del dispositivo.";
            console.error("Error al guardar actividad:", error);
        }
    });

    // =====================================
    // CALENDARIO GENERAL
    // =====================================


    // =====================================
    // PANTALLA DE ACTIVIDADES POR FECHA
    // =====================================

    function abrirDetalleDia(claveFecha) {
        const fecha = crearFechaLocal(claveFecha);

        const titulo = document.getElementById("tituloDia");
        const lista = document.getElementById("listaActividadesDia");

        titulo.textContent = fecha.toLocaleDateString("es-CL", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        lista.innerHTML = "";

        const completadas = actividadesEnFecha(claveFecha);

        if (completadas.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent =
                "☁️ Todavía no tienes actividades registradas este día.";
            lista.appendChild(mensaje);
        } else {
            completadas.forEach(function (tipo) {
                const actividad = actividades[tipo];
                const elemento = document.createElement("div");

                elemento.className = "actividad-registrada";
                elemento.textContent =
                    actividad.icono + " " + actividad.titulo + " ✓";

                lista.appendChild(elemento);
            });
        }

        mostrarPantalla(document.getElementById("pantallaDia"));
    }

    document.getElementById("btnVolverCalendario")
        .addEventListener("click", function () {
            mostrarPantalla(inicio);
        });
    function dibujarCalendario() {

        const año = mesVisible.getFullYear();
        const mes = mesVisible.getMonth();

        const titulo = mesVisible.toLocaleDateString("es-CL", {
            month: "long",
            year: "numeric"
        });

        nombreMes.textContent =
            titulo.charAt(0).toUpperCase() + titulo.slice(1);

        diasCalendario.innerHTML = "";

        const primerDia = new Date(año, mes, 1);

        // Semana comenzando en lunes
        const espacios = (primerDia.getDay() + 6) % 7;

        const cantidadDias =
            new Date(año, mes + 1, 0).getDate();

        // Espacios antes del primer día
        for (let i = 0; i < espacios; i++) {

            const espacio = document.createElement("span");
            espacio.className = "dia-vacio";

            diasCalendario.appendChild(espacio);
        }

        // Días del mes
        for (let dia = 1; dia <= cantidadDias; dia++) {

            const fecha = new Date(año, mes, dia, 12);
            const claveFecha = obtenerFechaLocal(fecha);

            const completadas = actividadesEnFecha(claveFecha);

            const casilla = document.createElement("button");

            casilla.type = "button";
            casilla.className = "dia-calendario";
            casilla.textContent = dia;

            casilla.setAttribute(
                "aria-label",
                `${dia} de ${titulo}: ${completadas.length} actividades`
            );

            if (completadas.length > 0) {
                casilla.classList.add("completado");
            }

            if (claveFecha === obtenerFechaLocal(new Date())) {
                casilla.classList.add("dia-hoy");
            }

            if (claveFecha === fechaElegida) {
                casilla.classList.add("dia-seleccionado");
                casilla.setAttribute("aria-pressed", "true");
            } else {
                casilla.setAttribute("aria-pressed", "false");
            }

            casilla.addEventListener("click", function () {

                fechaElegida = claveFecha;

                dibujarCalendario();
                abrirDetalleDia(claveFecha);
            });

            diasCalendario.appendChild(casilla);
        }
    }

    // =====================================
    // CAMBIAR DE MES
    // =====================================

    document.getElementById("mesAnterior")
        .addEventListener("click", function () {

            mesVisible = new Date(
                mesVisible.getFullYear(),
                mesVisible.getMonth() - 1,
                1,
                12
            );

            fechaElegida = obtenerFechaLocal(mesVisible);

            actualizarInicio();
        });

    document.getElementById("mesSiguiente")
        .addEventListener("click", function () {

            mesVisible = new Date(
                mesVisible.getFullYear(),
                mesVisible.getMonth() + 1,
                1,
                12
            );

            fechaElegida = obtenerFechaLocal(mesVisible);

            actualizarInicio();
        });

    // =====================================
    // ACTIVIDADES DEL DÍA SELECCIONADO
    // =====================================

    function mostrarActividadesDelDia(claveFecha) {

        const fecha = crearFechaLocal(claveFecha);

        fechaSeleccionada.textContent =
            fecha.toLocaleDateString("es-CL", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });

        actividadesDelDia.innerHTML = "";

        const completadas = actividadesEnFecha(claveFecha);

        if (completadas.length === 0) {

            const mensaje = document.createElement("p");

            mensaje.textContent =
                "☁️ Nubi dice: todavía no hay actividades registradas este día.";

            actividadesDelDia.appendChild(mensaje);

            return;
        }

        const resumen = document.createElement("p");

        resumen.textContent =
            completadas.length === 1
                ? "¡Completaste 1 actividad! 💚"
                : `¡Completaste ${completadas.length} actividades! 💚`;

        actividadesDelDia.appendChild(resumen);

        completadas.forEach(function (tipo) {

            const actividad = actividades[tipo];

            const elemento = document.createElement("div");

            elemento.className = "actividad-registrada";

            elemento.textContent =
                `${actividad.icono} ${actividad.titulo} ✓`;

            actividadesDelDia.appendChild(elemento);
        });
    }

    // =====================================
    // ESTADÍSTICAS ECOLÓGICAS
    // =====================================

    function contarActividadesEntre(inicioPeriodo, finPeriodo) {

        let total = 0;

        const fecha = new Date(
            inicioPeriodo.getFullYear(),
            inicioPeriodo.getMonth(),
            inicioPeriodo.getDate(),
            12
        );

        const limite = obtenerFechaLocal(finPeriodo);

        while (obtenerFechaLocal(fecha) <= limite) {

            const claveFecha = obtenerFechaLocal(fecha);

            total += actividadesEnFecha(claveFecha).length;

            fecha.setDate(fecha.getDate() + 1);
        }

        return total;
    }

    function actualizarEstadisticas() {

        const hoy = new Date();

        const hoyLocal = new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate(),
            12
        );

        // Hoy
        const totalHoy =
            actividadesEnFecha(obtenerFechaLocal(hoyLocal)).length;

        // Semana actual: lunes a domingo
        const inicioSemana = new Date(hoyLocal);

        const diasDesdeLunes =
            (inicioSemana.getDay() + 6) % 7;

        inicioSemana.setDate(
            inicioSemana.getDate() - diasDesdeLunes
        );

        const totalSemana =
            contarActividadesEntre(inicioSemana, hoyLocal);

        // Mes actual hasta hoy
        const inicioMes = new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            1,
            12
        );

        const totalMes =
            contarActividadesEntre(inicioMes, hoyLocal);

        document.getElementById("totalHoy").textContent =
            totalHoy;

        document.getElementById("totalSemana").textContent =
            totalSemana;

        document.getElementById("totalMes").textContent =
            totalMes;
    }

    // =====================================
    // FECHA Y RELOJ
    // =====================================

    function actualizarFechaHora() {

        const ahora = new Date();

        document.getElementById("fechaActual").textContent =
            ahora.toLocaleDateString("es-CL", {
                weekday: "long",
                day: "numeric",
                month: "long"
            });

        document.getElementById("horaActual").textContent =
            ahora.toLocaleTimeString("es-CL", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });
    }

    // =====================================
    // ACTUALIZAR INICIO
    // =====================================

    function actualizarInicio() {
        dibujarCalendario();
        actualizarEstadisticas();
        actualizarFechaHora();
    }

    // =====================================
    // INICIAR BROTA
    // =====================================

    actualizarInicio();

    // Actualizar el reloj
    setInterval(actualizarFechaHora, 1000);

    // Actualizar calendario y estadísticas
    // al volver a la aplicación
    document.addEventListener("visibilitychange", function () {

        if (!document.hidden) {
            actualizarInicio();
        }
    });

});