document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // ELEMENTOS DE LAS PANTALLAS
    // =====================================

    const bienvenida = document.getElementById("pantallaBienvenida");
    const inicio = document.getElementById("pantallaInicio");
    const pantallaActividad = document.getElementById("pantallaActividad");

    const btnVolver = document.getElementById("btnVolver");
    const btnCompletar = document.getElementById("btnCompletar");

    const nombreMes = document.getElementById("nombreMes");
    const diasCalendario = document.getElementById("diasCalendario");

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
    let mesVisible = new Date();

    mesVisible.setDate(1);
    mesVisible.setHours(12, 0, 0, 0);

    let fechaElegida = obtenerFechaLocal(new Date());

    // =====================================
    // FECHAS LOCALES
    // =====================================

    function obtenerFechaLocal(fecha) {
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");

        return `${anio}-${mes}-${dia}`;
    }

    function crearFechaLocal(claveFecha) {
        const [anio, mes, dia] = claveFecha.split("-").map(Number);
        return new Date(anio, mes - 1, dia, 12);
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

    document.getElementById("btnAgua").addEventListener("click", function () {
        abrirActividad("agua");
    });

    document.getElementById("btnReciclaje").addEventListener("click", function () {
        abrirActividad("reciclaje");
    });

    document.getElementById("btnEnergia").addEventListener("click", function () {
        abrirActividad("energia");
    });

    // Historial persistente adicional. Conservamos también las claves
    // antiguas brota_YYYY-MM-DD_tipo para compatibilidad.
    const CLAVE_HISTORIAL = "brota_actividades_historial_v2";
    function leerHistorial() {
        try {
            const datos = JSON.parse(localStorage.getItem(CLAVE_HISTORIAL) || "{}");
            return datos && typeof datos === "object" && !Array.isArray(datos) ? datos : {};
        } catch (_) { return {}; }
    }
    function actividadGuardada(fecha, tipo) {
        if (localStorage.getItem(`brota_${fecha}_${tipo}`) === "completada") return true;
        return (leerHistorial()[fecha] || []).includes(tipo);
    }
    function guardarActividad(fecha, tipo) {
        const historial = leerHistorial();
        const lista = Array.isArray(historial[fecha]) ? historial[fecha] : [];
        if (!lista.includes(tipo)) lista.push(tipo);
        historial[fecha] = lista;
        // Primero el formato antiguo, luego el historial acumulado.
        localStorage.setItem(`brota_${fecha}_${tipo}`, "completada");
        localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));
    }
    // =====================================
    // ACTIVIDADES GUARDADAS
    // =====================================

    function actividadesEnFecha(claveFecha) {
        const completadas = [];

        for (const tipo of Object.keys(actividades)) {
            const clave = `brota_${claveFecha}_${tipo}`;

            if (actividadGuardada(claveFecha, tipo)) {
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

        if (actividadGuardada(claveFecha, actividadActual)) {
            mensaje.textContent =
                "💚 ¡Ya completaste esta actividad hoy!";
            return;
        }

        try {
            // Guardar solamente la actividad seleccionada
            guardarActividad(claveFecha, actividadActual);

            mensaje.textContent =
                "🌟 ¡Excelente! Nubi está orgulloso de ti. Tu actividad quedó registrada.";

            // Avisar a la animación que Nubi puede celebrar
            document.dispatchEvent(
                new CustomEvent("brota:actividad-completada", {
                    detail: {
                        tipo: actividadActual,
                        fecha: claveFecha
                    }
                })
            );

            // Regresar el calendario al mes actual
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
    // DETALLE DEL DÍA
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

        lista.replaceChildren();

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

    // =====================================
    // PALETA DE COLORES PARA CADA MES
    // =====================================

    const coloresCalendario = [
        ["#FFF5C5", "#C79B27", "#665017", "#FFFBEA"], // Enero
        ["#FBE1EE", "#B96B99", "#743B60", "#FFF3F9"], // Febrero
        ["#D6EFD8", "#4B956B", "#28583D", "#F0FAF1"], // Marzo
        ["#FFE9B2", "#BD8927", "#6B4A13", "#FFF8E6"], // Abril
        ["#E8E0FC", "#8B76C9", "#4E4080", "#F8F4FF"], // Mayo
        ["#D4F2F5", "#3195A4", "#1F5963", "#EFFCFC"], // Junio
        ["#E2F0FF", "#648FBF", "#365779", "#F5FAFF"], // Julio
        ["#E0F3CE", "#6C9B45", "#3C602C", "#F5FCEB"], // Agosto
        ["#DDEFFA", "#4F9BB0", "#2C6170", "#F3FAFF"], // Septiembre
        ["#FBE1E9", "#C56F8B", "#783B53", "#FFF3F6"], // Octubre
        ["#D3EEDB", "#478A62", "#285A3C", "#F0FAF2"], // Noviembre
        ["#D1EAFB", "#368EAD", "#235C78", "#F0FAFF"]  // Diciembre
    ];

    // =====================================
    // APLICAR COLORES AL CALENDARIO
    // =====================================

    function aplicarColoresCalendario() {
        const [claro, fuerte, texto, fondo] =
            coloresCalendario[mesVisible.getMonth()];

        // Los colores dependen del mes visible,
        // no necesariamente del mes actual.
        diasCalendario.style.setProperty("--cal-dia", claro);
        diasCalendario.style.setProperty("--cal-borde", fuerte);
        diasCalendario.style.setProperty("--cal-texto", texto);

        // Buscar la tarjeta que contiene el título
        // y los días del calendario.
        let tarjeta = diasCalendario.parentElement;

        while (
            tarjeta &&
            tarjeta !== inicio &&
            !tarjeta.contains(nombreMes)
        ) {
            tarjeta = tarjeta.parentElement;
        }

        if (tarjeta && tarjeta !== inicio) {
            tarjeta.style.setProperty(
                "background",
                fondo,
                "important"
            );
        }

        // Cambiar el color del título.
        nombreMes.style.setProperty(
            "color",
            texto,
            "important"
        );

        // Cambiar los colores de las flechas.
        ["mesAnterior", "mesSiguiente"].forEach(function (id) {
            const flecha = document.getElementById(id);

            if (!flecha) return;

            flecha.style.setProperty(
                "background",
                claro,
                "important"
            );

            flecha.style.setProperty(
                "color",
                texto,
                "important"
            );

            flecha.style.setProperty(
                "border-color",
                fuerte,
                "important"
            );
        });

        // Cambiar los cuadritos de los días.
        diasCalendario.querySelectorAll(".dia-calendario")
            .forEach(function (casilla) {

                const completado =
                    casilla.classList.contains("completado");

                const esHoy =
                    casilla.classList.contains("dia-hoy");

                const seleccionado =
                    casilla.classList.contains("dia-seleccionado");

                // Actividad completada: color fuerte.
                // Día normal: color suave.
                casilla.style.setProperty(
                    "background-color",
                    completado ? fuerte : claro,
                    "important"
                );

                casilla.style.setProperty(
                    "color",
                    completado ? "#ffffff" : texto,
                    "important"
                );

                casilla.style.setProperty(
                    "border-color",
                    fuerte,
                    "important"
                );

                casilla.style.setProperty(
                    "border-radius",
                    "12px",
                    "important"
                );

                // Mantener el anillo del día actual
                // o del día seleccionado.
                if (esHoy || seleccionado) {
                    casilla.style.setProperty(
                        "outline",
                        "3px solid " + fuerte,
                        "important"
                    );

                    casilla.style.setProperty(
                        "outline-offset",
                        "2px",
                        "important"
                    );
                } else {
                    casilla.style.removeProperty("outline");
                    casilla.style.removeProperty("outline-offset");
                }
            });
    }

    // =====================================
    // DIBUJAR CALENDARIO
    // =====================================

    function dibujarCalendario() {
        const anio = mesVisible.getFullYear();
        const mes = mesVisible.getMonth();

        const titulo = mesVisible.toLocaleDateString("es-CL", {
            month: "long",
            year: "numeric"
        });

        nombreMes.textContent =
            titulo.charAt(0).toUpperCase() + titulo.slice(1);

        diasCalendario.replaceChildren();

        const primerDia = new Date(anio, mes, 1);
        const espacios = (primerDia.getDay() + 6) % 7;

        const cantidadDias =
            new Date(anio, mes + 1, 0).getDate();

        // Espacios antes del primer día del mes.
        for (let i = 0; i < espacios; i++) {
            const espacio = document.createElement("span");
            espacio.className = "dia-vacio";
            diasCalendario.appendChild(espacio);
        }

        // Crear cada día del mes.
        for (let dia = 1; dia <= cantidadDias; dia++) {
            const fecha = new Date(anio, mes, dia, 12);
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

            // Mantener los días con actividades.
            if (completadas.length > 0) {
                casilla.classList.add("completado");
            }

            // Mantener el día de hoy.
            if (claveFecha === obtenerFechaLocal(new Date())) {
                casilla.classList.add("dia-hoy");
            }

            // Mantener el día seleccionado.
            if (claveFecha === fechaElegida) {
                casilla.classList.add("dia-seleccionado");
                casilla.setAttribute("aria-pressed", "true");
            } else {
                casilla.setAttribute("aria-pressed", "false");
            }

            // Abrir el detalle del día.
            casilla.addEventListener("click", function () {
                fechaElegida = claveFecha;
                dibujarCalendario();
                abrirDetalleDia(claveFecha);
            });

            diasCalendario.appendChild(casilla);
        }

        // Aplicar la paleta del mes después
        // de crear todos los días.
        aplicarColoresCalendario();
    }

    // =====================================
    // CAMBIAR DE MES CON LAS FLECHAS
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
    // ESTADÍSTICAS
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

        const totalHoy =
            actividadesEnFecha(obtenerFechaLocal(hoyLocal)).length;

        const inicioSemana = new Date(hoyLocal);

        inicioSemana.setDate(
            inicioSemana.getDate() -
            ((inicioSemana.getDay() + 6) % 7)
        );

        const totalSemana =
            contarActividadesEntre(inicioSemana, hoyLocal);

        const inicioMes = new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            1,
            12
        );

        const totalMes =
            contarActividadesEntre(inicioMes, hoyLocal);

        document.getElementById("totalHoy").textContent = totalHoy;
        document.getElementById("totalSemana").textContent = totalSemana;
        document.getElementById("totalMes").textContent = totalMes;
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
    // ACTUALIZAR BROTA
    // =====================================

    function actualizarInicio() {
        dibujarCalendario();
        actualizarEstadisticas();
        actualizarFechaHora();
    }

    actualizarInicio();

    setInterval(actualizarFechaHora, 1000);

    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            actualizarInicio();
        }
    });

});