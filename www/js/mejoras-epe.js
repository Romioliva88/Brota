document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ==========================================
  // BROTA - MEJORAS ECOLÓGICAS
  // Metas, recompensas, paisajes y calendario
  // ==========================================

  const $ = (id) => document.getElementById(id);

  const meta = $("brotaMeta");
  const interes = $("brotaInteres");
  const progreso = $("brotaMetaProgreso");
  const barra = $("brotaBarraMeta");
  const consejo = $("brotaConsejoPersonalizado");
  const impacto = $("brotaImpactoResumen");

  const metaMensual = $("brotaMetaMensual");
  const barraMensual = $("brotaBarraMensual");
  const premioIcono = $("brotaPremioIcono");
  const premioNombre = $("brotaPremioNombre");
  const premioEstado = $("brotaPremioEstado");
  const coleccion = $("brotaColeccion");

  const tipos = ["agua", "reciclaje", "energia"];

  const consejos = {
    agua: "Prueba duchas más cortas y cierra la llave mientras te cepillas los dientes.",
    reciclaje: "Separa tus residuos limpios y secos; revisa qué materiales recibe tu comuna.",
    energia: "Aprovecha la luz natural y apaga las luces al salir de una habitación."
  };

  // ==========================================
  // LOS 12 MESES DE NUBI
  // ==========================================

  const meses = [
    {
      nombre: "Jardín de girasoles",
      premio: "Girasol",
      icono: "🌻",
      decoracion: ["🌻", "🌼", "🌱", "🌻", "🦋"],
      fondo: "#FFF5C5",
      suave: "#FFFBEA",
      acento: "#C79B27",
      oscuro: "#665017",
      paisaje: "#D8EBA3",
      mensaje: "¡Hagamos florecer nuestro jardín!"
    },
    {
      nombre: "Jardín de mariposas",
      premio: "Mariposa",
      icono: "🦋",
      decoracion: ["🦋", "🌷", "🌸", "🦋", "🌿"],
      fondo: "#FBE1EE",
      suave: "#FFF3F9",
      acento: "#B96B99",
      oscuro: "#743B60",
      paisaje: "#EBD0F3",
      mensaje: "¡Nuestro jardín se llena de mariposas!"
    },
    {
      nombre: "Bosque encantado",
      premio: "Árbol",
      icono: "🌳",
      decoracion: ["🌳", "🍄", "🌲", "🌿", "🦉"],
      fondo: "#D6EFD8",
      suave: "#F0FAF1",
      acento: "#4B956B",
      oscuro: "#28583D",
      paisaje: "#A9D5B0",
      mensaje: "¡Cada acción hace crecer el bosque!"
    },
    {
      nombre: "Pradera de abejitas",
      premio: "Abejita",
      icono: "🐝",
      decoracion: ["🐝", "🌼", "🌻", "🐝", "🌿"],
      fondo: "#FFE9B2",
      suave: "#FFF8E6",
      acento: "#BD8927",
      oscuro: "#6B4A13",
      paisaje: "#D9E9A5",
      mensaje: "¡Cuidemos a nuestras abejitas!"
    },
    {
      nombre: "Valle del arcoíris",
      premio: "Arcoíris",
      icono: "🌈",
      decoracion: ["🌈", "☁️", "🌸", "⭐", "🦋"],
      fondo: "#E8E0FC",
      suave: "#F8F4FF",
      acento: "#8B76C9",
      oscuro: "#4E4080",
      paisaje: "#F2D9F4",
      mensaje: "¡Llenemos el mundo de colores!"
    },
    {
      nombre: "Laguna de tortugas",
      premio: "Tortuga",
      icono: "🐢",
      decoracion: ["🐢", "💧", "🪷", "🐟", "🌿"],
      fondo: "#D4F2F5",
      suave: "#EFFCFC",
      acento: "#3195A4",
      oscuro: "#1F5963",
      paisaje: "#A5DFE1",
      mensaje: "¡Protejamos nuestras aguas!"
    },
    {
      nombre: "Montañas nevadas",
      premio: "Copo de nieve",
      icono: "❄️",
      decoracion: ["❄️", "⛰️", "☁️", "🌲", "❄️"],
      fondo: "#E2F0FF",
      suave: "#F5FAFF",
      acento: "#648FBF",
      oscuro: "#365779",
      paisaje: "#C7DDF5",
      mensaje: "¡Cuidemos nuestro planeta!"
    },
    {
      nombre: "Jardín de plantas",
      premio: "Planta",
      icono: "🪴",
      decoracion: ["🪴", "🌱", "🌿", "🍀", "🌳"],
      fondo: "#E0F3CE",
      suave: "#F5FCEB",
      acento: "#6C9B45",
      oscuro: "#3C602C",
      paisaje: "#B9DFA2",
      mensaje: "¡Cada pequeña acción cuenta!"
    },
    {
      nombre: "Bosque de pajaritos",
      premio: "Pajarito",
      icono: "🐦",
      decoracion: ["🐦", "🌳", "🌸", "🪺", "🐦"],
      fondo: "#DDEFFA",
      suave: "#F3FAFF",
      acento: "#4F9BB0",
      oscuro: "#2C6170",
      paisaje: "#B9E1C7",
      mensaje: "¡Nuestro bosque se llena de vida!"
    },
    {
      nombre: "Campo de flores",
      premio: "Flores",
      icono: "🌺",
      decoracion: ["🌺", "🌸", "🌷", "🌼", "🦋"],
      fondo: "#FBE1E9",
      suave: "#FFF3F6",
      acento: "#C56F8B",
      oscuro: "#783B53",
      paisaje: "#F1C7D8",
      mensaje: "¡Hagamos florecer nuestro planeta!"
    },
    {
      nombre: "Mi pequeño bosque",
      premio: "Mi pequeño bosque",
      icono: "🌳",
      decoracion: ["🌱", "🌿", "🪴", "🌳", "🌲"],
      fondo: "#D3EEDB",
      suave: "#F0FAF2",
      acento: "#478A62",
      oscuro: "#285A3C",
      paisaje: "#A0D3B0",
      mensaje: "¡Ayúdame a construir nuestro bosque!"
    },
    {
      nombre: "Planeta feliz",
      premio: "Planeta feliz",
      icono: "🌎",
      decoracion: ["🌱", "☁️", "⭐", "🌈", "🌎"],
      fondo: "#D1EAFB",
      suave: "#F0FAFF",
      acento: "#368EAD",
      oscuro: "#235C78",
      paisaje: "#A5E0D7",
      mensaje: "¡Terminemos el año cuidando la Tierra!"
    }
  ];

  // ==========================================
  // FECHAS
  // ==========================================

  function fechaLocal(fecha) {
    return (
      fecha.getFullYear() + "-" +
      String(fecha.getMonth() + 1).padStart(2, "0") + "-" +
      String(fecha.getDate()).padStart(2, "0")
    );
  }

  function mesId(fecha) {
    return (
      fecha.getFullYear() + "-" +
      String(fecha.getMonth() + 1).padStart(2, "0")
    );
  }

  function nombreMes(fecha) {
    return fecha.toLocaleDateString("es-CL", {
      month: "long",
      year: "numeric"
    });
  }

  // ==========================================
  // ALMACENAMIENTO
  // ==========================================

  function usuarioActual() {
    return window.BrotaFirebase?.auth?.currentUser?.uid || null;
  }

  function clavePreferencia(tipo) {
    return (
      "brota_epe_" +
      (usuarioActual() || "dispositivo") +
      "_" + tipo
    );
  }

  function leer(clave) {
    try {
      return localStorage.getItem(clave);
    } catch (error) {
      console.warn("Brota: no se pudo leer", error);
      return null;
    }
  }

  function guardar(clave, valor) {
    try {
      localStorage.setItem(clave, String(valor));
      return true;
    } catch (error) {
      console.warn("Brota: no se pudo guardar", error);
      return false;
    }
  }

  // ==========================================
  // CONTAR ACTIVIDADES
  // ==========================================

  function contar(inicio, fin) {
    let total = 0;

    const dia = new Date(
      inicio.getFullYear(),
      inicio.getMonth(),
      inicio.getDate(),
      12
    );

    const limite = new Date(
      fin.getFullYear(),
      fin.getMonth(),
      fin.getDate(),
      12
    );

    while (dia <= limite) {
      const fecha = fechaLocal(dia);

      for (const tipo of tipos) {
        if (
          leer("brota_" + fecha + "_" + tipo) ===
          "completada"
        ) {
          total++;
        }
      }

      dia.setDate(dia.getDate() + 1);
    }

    return total;
  }

  function totalDelMes(anio, mes) {
    return contar(
      new Date(anio, mes, 1, 12),
      new Date(anio, mes + 1, 0, 12)
    );
  }

  // ==========================================
  // META SEMANAL
  // ==========================================

  function cargarPreferencias() {
    if (meta) {
      const valor =
        leer(clavePreferencia("meta")) || "3";

      if ([...meta.options].some(op => op.value === valor)) {
        meta.value = valor;
      }
    }

    if (interes) {
      const valor =
        leer(clavePreferencia("interes")) || "agua";

      if ([...interes.options].some(op => op.value === valor)) {
        interes.value = valor;
      }
    }
  }

  function actualizarSemanal() {
    const hoy = new Date();

    const fin = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      hoy.getDate(),
      12
    );

    const lunes = new Date(fin);

    lunes.setDate(
      lunes.getDate() -
      ((lunes.getDay() + 6) % 7)
    );

    const total = contar(lunes, fin);
    const objetivo = Number(meta?.value) || 3;

    if (barra) {
      barra.max = objetivo;
      barra.value = Math.min(total, objetivo);
    }

    if (progreso) {
      progreso.textContent =
        total + " de " + objetivo +
        " actividades esta semana. " +
        (total >= objetivo
          ? "🌟 ¡Meta cumplida!"
          : "¡Sigue así!");
    }

    if (consejo && interes) {
      consejo.textContent =
        consejos[interes.value] || consejos.agua;
    }
  }

  // ==========================================
  // META MENSUAL
  // ==========================================

  function claveMes(id) {
    return clavePreferencia("objetivo_" + id);
  }

  function leerMeta(id) {
    return Number(leer(claveMes(id))) || 0;
  }

  function guardarMeta(id, valor) {
    guardar(claveMes(id), valor);
  }

  function obtenerMeta(fecha) {
    const id = mesId(fecha);
    let objetivo = leerMeta(id);

    if (!objetivo) {
      objetivo = 20;
      guardarMeta(id, objetivo);
    }

    return objetivo;
  }

  // ==========================================
  // RECOMPENSAS
  // ==========================================

  function clavePremio(id) {
    return clavePreferencia("premio_" + id);
  }

  function premioGanado(id, total, objetivo) {
    if (leer(clavePremio(id)) === "ganado") {
      return true;
    }

    if (objetivo > 0 && total >= objetivo) {
      guardar(clavePremio(id), "ganado");
      return true;
    }

    return false;
  }

  function actualizarColeccion() {
    if (!coleccion) return;

    coleccion.replaceChildren();

    const hoy = new Date();
    let ganados = 0;

    for (let retro = 12; retro >= 0; retro--) {
      const fecha = new Date(
        hoy.getFullYear(),
        hoy.getMonth() - retro,
        1,
        12
      );

      const id = mesId(fecha);
      const objetivo = leerMeta(id);

      if (!objetivo) continue;

      const total = totalDelMes(
        fecha.getFullYear(),
        fecha.getMonth()
      );

      if (!premioGanado(id, total, objetivo)) {
        continue;
      }

      ganados++;

      const item = document.createElement("div");
      item.className = "nubi-coleccion-item";

      const icono = document.createElement("span");
      icono.textContent = meses[fecha.getMonth()].icono;

      const nombre = document.createElement("strong");
      nombre.textContent = meses[fecha.getMonth()].premio;

      const mes = document.createElement("small");
      mes.textContent = nombreMes(fecha);

      item.append(icono, nombre, mes);
      coleccion.append(item);
    }

    if (!ganados) {
      const vacio = document.createElement("p");

      vacio.textContent =
        "🌱 Tu colección comienza con tu primera meta mensual completada.";

      coleccion.append(vacio);
    }
  }

  // ==========================================
  // ESTILOS VISUALES
  // ==========================================

  const estilo = document.createElement("style");
  estilo.id = "brota-estilos-mensuales";

  estilo.textContent = `
    :root {
      --brota-mes-fondo: #D3EEDB;
      --brota-mes-suave: #F0FAF2;
      --brota-mes-acento: #478A62;
      --brota-mes-oscuro: #285A3C;
      --brota-mes-paisaje: #A0D3B0;
    }

    #brotaPaisajeMensual {
      background: linear-gradient(
        160deg,
        var(--brota-mes-fondo),
        var(--brota-mes-paisaje)
      );
      border-radius: 24px;
      padding: 18px 14px;
      margin: 12px 0;
      text-align: center;
      color: var(--brota-mes-oscuro);
      box-shadow: 0 5px 16px rgba(0,0,0,.07);
    }

    #brotaPaisajeMensual h3 {
      margin: 5px 0;
      color: var(--brota-mes-oscuro);
      font-size: 1.15rem;
    }

    .brota-mes-etiqueta {
      font-size: .82rem;
      font-weight: 700;
      text-transform: capitalize;
    }

    .brota-mes-decoracion {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 9px;
      min-height: 85px;
      margin: 12px 0;
    }

    .brota-mes-elemento {
      display: inline-block;
      font-size: clamp(27px, 7vw, 40px);
      animation: brotaFlotarMes 3s ease-in-out infinite;
    }

    .brota-mes-elemento:nth-child(2n) {
      animation-delay: .5s;
    }

    .brota-mes-elemento:nth-child(3n) {
      animation-delay: 1s;
    }

    .brota-mes-mensaje {
      font-size: .9rem;
      font-weight: 600;
      margin: 6px 0;
    }

    .brota-mes-barra {
      width: 100%;
      height: 10px;
      border-radius: 20px;
      background: rgba(255,255,255,.65);
      overflow: hidden;
      margin-top: 12px;
    }

    .brota-mes-barra-relleno {
      height: 100%;
      background: var(--brota-mes-acento);
      border-radius: 20px;
      transition: width .5s ease;
    }

    .brota-mes-porcentaje {
      display: inline-block;
      background: rgba(255,255,255,.65);
      padding: 5px 12px;
      border-radius: 20px;
      margin-top: 9px;
      font-weight: 700;
      font-size: .85rem;
    }

    #brotaBarraMeta,
    #brotaBarraMensual {
      accent-color: var(--brota-mes-acento);
    }

    /* =====================================
       CALENDARIO CON COLORES POR MES
       ===================================== */

    #pantallaInicio {
      --cal-dia: var(--brota-mes-fondo);
      --cal-borde: var(--brota-mes-acento);
      --cal-texto: var(--brota-mes-oscuro);
    }

    #pantallaInicio .dia-calendario {
      background-color: var(--cal-dia) !important;
      color: var(--cal-texto) !important;
      border: 1px solid var(--cal-borde) !important;
      border-radius: 12px !important;
      transition:
        background-color .25s ease,
        border-color .25s ease,
        transform .2s ease;
    }

    /* Día actual */
    #pantallaInicio .dia-calendario.hoy,
    #pantallaInicio .dia-calendario.dia-hoy {
      background-color: var(--cal-borde) !important;
      color: #fff !important;
      font-weight: 800;
    }

    /* Día seleccionado */
    #pantallaInicio .dia-calendario.seleccionado,
    #pantallaInicio .dia-calendario.dia-seleccionado {
      outline: 3px solid var(--cal-borde);
      outline-offset: 2px;
    }

    /* Días con actividades registradas */
    #pantallaInicio .dia-calendario.con-actividad,
    #pantallaInicio .dia-calendario.dia-completado {
      box-shadow:
        inset 0 -4px 0 var(--cal-borde);
    }

    #pantallaInicio .dia-calendario:active {
      transform: scale(.95);
    }

    /* Flechas del calendario */
    #mesAnterior,
    #mesSiguiente {
      background: var(--brota-mes-fondo) !important;
      color: var(--brota-mes-oscuro) !important;
      border: 1px solid var(--brota-mes-acento) !important;
      border-radius: 12px !important;
    }

    @keyframes brotaFlotarMes {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-6px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .brota-mes-elemento {
        animation: none;
      }
    }
  `;

  document.head.appendChild(estilo);

  // ==========================================
  // APLICAR COLORES DE UN MES
  // ==========================================

  function aplicarColores(mesNumero, cambiarFondo) {
    const mes = meses[mesNumero];
    const raiz = document.documentElement;

    raiz.style.setProperty("--brota-mes-fondo", mes.fondo);
    raiz.style.setProperty("--brota-mes-suave", mes.suave);
    raiz.style.setProperty("--brota-mes-acento", mes.acento);
    raiz.style.setProperty("--brota-mes-oscuro", mes.oscuro);
    raiz.style.setProperty("--brota-mes-paisaje", mes.paisaje);

    const inicio = $("pantallaInicio");

    if (inicio && cambiarFondo) {
      inicio.style.background =
        "linear-gradient(180deg, " +
        mes.suave + " 0%, " +
        mes.fondo + " 100%)";
    }
  }

  // ==========================================
  // DETECTAR MES VISIBLE DEL CALENDARIO
  // ==========================================

  let mesCalendarioVisible = new Date().getMonth();
  let anioCalendarioVisible = new Date().getFullYear();

  function detectarMesVisible() {
    /*
      Intentamos leer el título que ya muestra
      el calendario. Si no podemos identificarlo,
      mantenemos el último mes conocido.
    */

    const posiblesTitulos = [
      $("mesActual"),
      $("tituloMes"),
      $("mesCalendario"),
      $("nombreMes"),
      $("calendarioMes")
    ];

    const nombres = [
      "enero", "febrero", "marzo", "abril",
      "mayo", "junio", "julio", "agosto",
      "septiembre", "octubre", "noviembre",
      "diciembre"
    ];

    for (const elemento of posiblesTitulos) {
      if (!elemento) continue;

      const texto = elemento.textContent
        .toLowerCase()
        .trim();

      const encontrado = nombres.findIndex(
        nombre => texto.includes(nombre)
      );

      if (encontrado !== -1) {
        mesCalendarioVisible = encontrado;

        const anio = texto.match(/\b20\d{2}\b/);

        if (anio) {
          anioCalendarioVisible = Number(anio[0]);
        }

        return mesCalendarioVisible;
      }
    }

    return mesCalendarioVisible;
  }

  function actualizarColoresCalendario() {
    const mesVisible = detectarMesVisible();
    const mes = meses[mesVisible];

    const inicio = $("pantallaInicio");

    if (!inicio) return;

    inicio.style.setProperty("--cal-dia", mes.fondo);
    inicio.style.setProperty("--cal-borde", mes.acento);
    inicio.style.setProperty("--cal-texto", mes.oscuro);

    // Cambia el fondo de la pantalla con el mes visible.
    inicio.style.background =
      "linear-gradient(180deg, " +
      mes.suave + " 0%, " +
      mes.fondo + " 100%)";
  }

  // ==========================================
  // PAISAJE MENSUAL
  // ==========================================

  function obtenerContenedorMundo() {
    const existente = $("brotaPaisajeMensual");

    if (existente) return existente;

    const referencia =
      premioNombre ||
      premioIcono ||
      barraMensual;

    if (!referencia || !referencia.parentNode) {
      return null;
    }

    const contenedor = document.createElement("section");
    contenedor.id = "brotaPaisajeMensual";

    referencia.parentNode.insertBefore(
      contenedor,
      referencia
    );

    return contenedor;
  }

  function crearElemento(clase, texto) {
    const elemento = document.createElement("div");
    elemento.className = clase;

    if (texto !== undefined) {
      elemento.textContent = texto;
    }

    return elemento;
  }

  function actualizarPaisaje(proporcion) {
    const contenedor = obtenerContenedorMundo();

    if (!contenedor) return;

    const hoy = new Date();
    const mes = meses[hoy.getMonth()];
    const porcentaje = Math.round(proporcion * 100);

    contenedor.replaceChildren();

    const etiqueta = crearElemento(
      "brota-mes-etiqueta",
      "☁️ " + nombreMes(hoy)
    );

    const titulo = document.createElement("h3");
    titulo.textContent = mes.nombre;

    const decoracion = crearElemento(
      "brota-mes-decoracion"
    );

    let cantidad = 1;

    if (proporcion >= 0.25) cantidad = 2;
    if (proporcion >= 0.5) cantidad = 3;
    if (proporcion >= 0.75) cantidad = 4;
    if (proporcion >= 1) cantidad = 5;

    for (let i = 0; i < cantidad; i++) {
      const elemento = document.createElement("span");
      elemento.className = "brota-mes-elemento";
      elemento.textContent = mes.decoracion[i];

      decoracion.appendChild(elemento);
    }

    let mensaje = mes.mensaje;

    if (proporcion >= 1) {
      mensaje = "🎉 ¡Completamos nuestro mundo ecológico!";
    } else if (proporcion >= 0.75) {
      mensaje = "🌳 ¡Ya casi llegamos a nuestra meta!";
    } else if (proporcion >= 0.5) {
      mensaje = "🌿 ¡Mira cuánto ha crecido nuestro mundo!";
    } else if (proporcion >= 0.25) {
      mensaje = "🌱 ¡Nuestras acciones están dando frutos!";
    }

    const textoMensaje = crearElemento(
      "brota-mes-mensaje",
      mensaje
    );

    const barraVisual = crearElemento(
      "brota-mes-barra"
    );

    const relleno = crearElemento(
      "brota-mes-barra-relleno"
    );

    relleno.style.width = porcentaje + "%";
    barraVisual.appendChild(relleno);

    const textoPorcentaje = crearElemento(
      "brota-mes-porcentaje",
      porcentaje + "% de nuestro mundo"
    );

    contenedor.append(
      etiqueta,
      titulo,
      decoracion,
      textoMensaje,
      barraVisual,
      textoPorcentaje
    );
  }

  // ==========================================
  // ACTUALIZAR MUNDO ECOLÓGICO
  // ==========================================

  function pintarMundo() {
    const hoy = new Date();
    const id = mesId(hoy);
    const mes = meses[hoy.getMonth()];

    const objetivo = obtenerMeta(hoy);

    if (metaMensual) {
      const opcion = [...metaMensual.options].find(
        op => Number(op.value) === objetivo
      );

      if (opcion) {
        metaMensual.value = opcion.value;
      }
    }

    const total = totalDelMes(
      hoy.getFullYear(),
      hoy.getMonth()
    );

    const proporcion = Math.min(1, total / objetivo);
    const porcentaje = Math.round(proporcion * 100);

    if (premioNombre) {
      premioNombre.textContent =
        mes.premio + " " + mes.icono;
    }

    if (premioIcono) {
      premioIcono.textContent =
        proporcion < 0.25 ? "🌱" :
        proporcion < 0.5 ? "🌿" :
        proporcion < 0.75 ? "🪴" :
        proporcion < 1 ? "🌳" :
        mes.icono;
    }

    if (barraMensual) {
      barraMensual.max = objetivo;
      barraMensual.value = Math.min(total, objetivo);
    }

    if (impacto) {
      impacto.textContent =
        total + " de " + objetivo +
        " actividades este mes (" +
        porcentaje + "%).";
    }

    const ganado = premioGanado(id, total, objetivo);

    if (premioEstado) {
      premioEstado.textContent = ganado
        ? "🏆 ¡Recompensa conseguida y guardada!"
        : "☁️ Nubi dice: ¡Sigue cuidando el planeta!";
    }

    // El paisaje y el premio corresponden al mes real.
    aplicarColores(hoy.getMonth(), false);
    actualizarPaisaje(proporcion);
    actualizarColeccion();

    // El calendario usa el mes que se está viendo.
    actualizarColoresCalendario();
  }

  // ==========================================
  // ACTUALIZACIÓN GENERAL
  // ==========================================

  function actualizarTodo() {
    actualizarSemanal();
    pintarMundo();
  }

  cargarPreferencias();

  // ==========================================
  // EVENTOS DE METAS
  // ==========================================

  if (meta) {
    meta.addEventListener("change", function () {
      guardar(clavePreferencia("meta"), meta.value);
      actualizarSemanal();
    });
  }

  if (interes) {
    interes.addEventListener("change", function () {
      guardar(clavePreferencia("interes"), interes.value);
      actualizarSemanal();
    });
  }

  if (metaMensual) {
    metaMensual.addEventListener("change", function () {
      const hoy = new Date();

      guardarMeta(
        mesId(hoy),
        Number(metaMensual.value)
      );

      pintarMundo();
    });
  }

  // ==========================================
  // ACTIVIDADES COMPLETADAS
  // ==========================================

  document.addEventListener(
    "brota:actividad-completada",
    actualizarTodo
  );

  const btnCompletar = $("btnCompletar");

  if (btnCompletar) {
    btnCompletar.addEventListener("click", function () {
      setTimeout(actualizarTodo, 0);
    });
  }

  // ==========================================
  // NAVEGACIÓN
  // ==========================================

  ["btnVolver", "btnVolverCalendario"].forEach(
    function (id) {
      const boton = $(id);

      if (boton) {
        boton.addEventListener("click", actualizarTodo);
      }
    }
  );

  document.addEventListener(
    "visibilitychange",
    function () {
      if (!document.hidden) {
        actualizarTodo();
      }
    }
  );

  // ==========================================
  // FLECHAS DEL CALENDARIO
  // ==========================================

  const pantallaInicio = $("pantallaInicio");

  if (pantallaInicio) {
    pantallaInicio.addEventListener("click", function (evento) {
      const anterior = evento.target.closest("#mesAnterior");
      const siguiente = evento.target.closest("#mesSiguiente");

      if (anterior || siguiente) {
        /*
          Esperamos a que index.js actualice el calendario
          y luego leemos el mes visible.
        */
        setTimeout(function () {
          const antes = mesCalendarioVisible;

          const detectado = detectarMesVisible();

          /*
            Si no encontramos un título reconocible,
            avanzamos usando las flechas.
          */
          if (detectado === antes) {
            const fecha = new Date(
              anioCalendarioVisible,
              mesCalendarioVisible +
                (siguiente ? 1 : -1),
              1
            );

            mesCalendarioVisible = fecha.getMonth();
            anioCalendarioVisible = fecha.getFullYear();
          }

          actualizarColoresCalendario();
        }, 0);
      }
    });
  }

  // ==========================================
  // CAMBIO DE USUARIO
  // ==========================================

  window.BrotaFirebase?.auth
    ?.onAuthStateChanged?.(function () {
      cargarPreferencias();
      actualizarTodo();
    });

  // ==========================================
  // CAMBIO AUTOMÁTICO DE MES
  // ==========================================

  let ultimoMes = mesId(new Date());

  setInterval(function () {
    const actual = mesId(new Date());

    if (actual !== ultimoMes) {
      ultimoMes = actual;
      mesCalendarioVisible = new Date().getMonth();
      anioCalendarioVisible = new Date().getFullYear();

      actualizarTodo();
    }
  }, 60000);

  // ==========================================
  // INICIAR BROTA
  // ==========================================

  actualizarTodo();

});