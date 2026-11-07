document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ==========================================
  // BROTA - NAVEGACIÓN Y DIARIO
  // MENÚ RECICLADO PEQUEÑO
  // ==========================================

  const inicio = document.getElementById("pantallaInicio");
  const contenido = inicio?.querySelector(".inicio-contenido");

  if (!inicio || !contenido) {
    console.warn("Brota: no se encontró la pantalla de inicio.");
    return;
  }

  if (document.getElementById("brotaMenuInferior")) return;

  // ==========================================
  // ESTILOS
  // ==========================================

  const estilos = document.createElement("style");
  estilos.id = "brotaEstilosNavegacion";

  estilos.textContent = `
    #pantallaInicio {
      padding-bottom: calc(64px + env(safe-area-inset-bottom));
    }

    #pantallaInicio .brota-pestana[hidden] {
      display: none !important;
    }

    /* MENÚ INFERIOR PEQUEÑO */

    #brotaMenuInferior {
      position: fixed !important;
      bottom: 0 !important;
      left: 50% !important;
      right: auto !important;
      transform: translateX(-50%) !important;
      width: min(100%, 500px) !important;
      box-sizing: border-box !important;

      display: grid !important;
      grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
      gap: 4px !important;

      padding: 4px 5px
        calc(4px + env(safe-area-inset-bottom)) !important;

      background: linear-gradient(
        145deg,
        #7cad46,
        #4e8c32 55%,
        #75a941
      ) !important;

      border: 2px solid #b5d57b !important;
      border-bottom: none !important;
      border-radius: 13px 13px 0 0 !important;
      box-shadow: 0 -3px 10px rgba(32,73,30,.13) !important;
      z-index: 1000 !important;
    }

    #brotaMenuInferior[hidden] {
      display: none !important;
    }

    /* QUITAMOS EL CÍRCULO QUE SOBRESALÍA */

    #brotaMenuInferior::before {
      display: none !important;
    }

    /* BOTONES RECICLADOS COMPACTOS */

    #brotaMenuInferior .brota-nav-boton {
      position: relative;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 1px !important;

      min-width: 0 !important;
      min-height: 44px !important;
      padding: 3px 1px !important;

      border: 1px solid #d5b780 !important;
      border-radius: 11px 5px 11px 5px !important;

      background: linear-gradient(
        145deg,
        #f8eaca,
        #e9d4ab
      ) !important;

      color: #315b30 !important;
      font-family: inherit !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      line-height: 1.15 !important;

      box-shadow: 0 1px 0 #a48251 !important;
      cursor: pointer;
      touch-action: manipulation;
    }

    #brotaMenuInferior .brota-nav-boton::after {
      display: none !important;
    }

    #brotaMenuInferior .brota-nav-boton.activo {
      background: linear-gradient(
        145deg,
        #e6f3c8,
        #c7e4a0
      ) !important;
      border-color: #f4f9e5 !important;
      color: #245b2d !important;
    }

    #brotaMenuInferior .brota-nav-icono {
      font-size: 17px !important;
      line-height: 1.1 !important;
    }

    #brotaMenuInferior .brota-nav-boton:focus-visible {
      outline: 2px solid white !important;
      outline-offset: 2px !important;
    }

    /* DIARIO */

    .brota-diario {
      padding: 18px 4px;
      max-width: 100%;
    }

    .brota-diario h2 {
      color: #286543;
      margin-bottom: 6px;
    }

    .brota-diario-editor {
      padding: 17px;
      border-radius: 22px;
      background: #fff0d5;
      color: #344638;
      margin-top: 16px;
      border: 1px solid #d9cba8;
    }

    .brota-diario-editor input,
    .brota-diario-editor textarea,
    .brota-diario-editor select {
      display: block;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #b8cabb;
      border-radius: 12px;
      padding: 12px;
      margin: 7px 0 13px;
      font-size: 16px;
      background: rgba(255,255,255,.92);
      color: #263b2c;
    }

    .brota-diario-editor textarea {
      min-height: 155px;
      resize: vertical;
      line-height: 1.6;
    }

    .brota-diario-editor label {
      display: block;
      font-weight: 700;
      margin-top: 8px;
    }

    .brota-diario-colores {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 12px 0 18px;
    }

    .brota-diario-color {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 0 1px #a8b8a8;
      cursor: pointer;
    }

    .brota-diario-color.elegido {
      outline: 2px solid #285b3d;
      outline-offset: 3px;
    }

    .brota-diario-acciones {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }

    .brota-diario-acciones button {
      flex: 1;
      min-width: 110px;
      min-height: 46px;
      padding: 12px;
      border: none;
      border-radius: 13px;
      background: #397c54;
      color: white;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }

    .brota-diario-acciones .secundario {
      background: #e5e9e6;
      color: #31553d;
    }

    /* NOTAS GUARDADAS */

    .brota-nota-guardada {
      padding: 15px;
      border-radius: 17px;
      margin: 13px 0;
      overflow-wrap: anywhere;
      color: #344638;
    }

    .brota-diario > div:first-child { text-align: center; padding: 10px 8px; }
    .brota-diario > div:first-child p { color: #55745d; line-height: 1.5; }
    .brota-diario-editor { background: #fff9e8; border: 2px solid #d5e4b8; box-shadow: 0 5px 16px rgba(44,92,48,.08); }
    .brota-diario-editor textarea { min-height: 100px; }
    .brota-diario-meses { display:flex; align-items:center; gap:10px; margin: 10px 0 16px; color:#315b3b; font-weight:700; }
    .brota-diario-meses select { flex:1; min-width:0; padding:11px; border-radius:12px; border:1px solid #b4cda9; background:#fffdf4; color:#315b3b; font:inherit; }
    .brota-diario-ver-mas { display:block; width:100%; margin:14px 0 22px; padding:13px; border-radius:16px; border:2px solid #a9cda3; background:#e9f4df; color:#315b3b; font:inherit; font-weight:700; cursor:pointer; }
    .brota-diario-ver-mas[hidden] { display:none; }
    .brota-diario-filtros { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin: 12px 0; color: #315b3b; font-weight: 700; }
    .brota-diario-filtros select { flex: 1; min-width: 145px; padding: 11px; border-radius: 12px; border: 1px solid #b4cda9; background: #fffdf4; color: #315b3b; font: inherit; }
    .brota-nota-cuaderno { position: relative; border-left: 7px dotted #a1c58b; border-top: 1px solid #d5d8b8; border-right: 1px solid #d5d8b8; border-bottom: 3px solid #c7d1a8; box-shadow: 0 4px 10px rgba(30,74,40,.1); }
    .brota-nota-cuaderno h4 { margin: 0 0 5px; color: #234d31; font-size: 1.1rem; }
    .brota-nota-cuaderno small { color: #5c705f; }
    .brota-nota-impacto { padding: 9px 11px; border-radius: 11px; background: rgba(255,255,255,.6); font-weight: 600; }

    .brota-nota-guardada p {
      white-space: pre-wrap;
      line-height: 1.6;
    }

    .brota-nota-guardada img {
      display: block;
      max-width: 100%;
      max-height: 220px;
      object-fit: contain;
      border-radius: 12px;
      margin: 10px 0;
    }

    .brota-nota-guardada button {
      min-height: 42px;
      margin: 5px 8px 0 0;
      border: 1px solid #9eb8a5;
      border-radius: 10px;
      background: white;
      padding: 9px 12px;
      color: #285b3d;
      font: inherit;
      cursor: pointer;
    }

    /* CONFIRMACIÓN PERSONALIZADA */

    .brota-confirmacion-fondo {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(22, 52, 33, .48);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }

    .brota-confirmacion {
      width: 100%;
      max-width: 330px;
      box-sizing: border-box;
      padding: 24px 20px;
      border-radius: 24px;
      background: #fff5df;
      border: 2px solid #b8d89b;
      box-shadow: 0 12px 35px rgba(0,0,0,.18);
      text-align: center;
      color: #315b3c;
    }

    .brota-confirmacion-icono {
      font-size: 42px;
      margin-bottom: 8px;
    }

    .brota-confirmacion h3 {
      margin: 8px 0;
      color: #286543;
    }

    .brota-confirmacion p {
      margin: 10px 0;
      line-height: 1.5;
    }

    .brota-confirmacion-acciones {
      display: flex;
      gap: 10px;
      margin-top: 22px;
    }

    .brota-confirmacion-acciones button {
      flex: 1;
      min-height: 46px;
      padding: 10px;
      border: none;
      border-radius: 13px;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }

    .brota-cancelar {
      background: #e5ebdf;
      color: #315b3c;
    }

    .brota-eliminar {
      background: #397c54;
      color: white;
    }

    .brota-confirmacion button:focus-visible {
      outline: 3px solid #88b75b;
      outline-offset: 2px;
    }

    @media (max-width: 360px) {
      #brotaMenuInferior {
        gap: 3px !important;
        padding-left: 4px !important;
        padding-right: 4px !important;
      }

      #brotaMenuInferior .brota-nav-boton {
        font-size: 10px !important;
      }

      #brotaMenuInferior .brota-nav-icono {
        font-size: 16px !important;
      }

      .brota-diario-editor {
        padding: 12px;
      }
    }
  `;

  document.head.appendChild(estilos);

  // ==========================================
  // ORGANIZAR PANTALLAS EXISTENTES
  // ==========================================

  const elementos = Array.from(contenido.children);

  const calendarioOriginal =
    contenido.querySelector(".calendario-ecologico");

  const estadisticasOriginal =
    contenido.querySelector(".estadisticas-ecologicas");

  const seccionesExtra = Array.from(
    contenido.querySelectorAll(":scope > .brota-extra")
  );

  const pestanas = {};

  [
    ["inicio", "Inicio"],
    ["calendario", "Calendario"],
    ["diario", "Diario"],
    ["logros", "Logros"]
  ].forEach(function ([id, nombre]) {
    const panel = document.createElement("div");

    panel.id = "brotaPanel_" + id;
    panel.className = "brota-pestana";
    panel.setAttribute("aria-label", nombre);
    panel.hidden = id !== "inicio";

    pestanas[id] = panel;
  });

  elementos.forEach(function (elemento) {
    if (
      elemento === calendarioOriginal ||
      elemento === estadisticasOriginal ||
      seccionesExtra.includes(elemento)
    ) {
      return;
    }

    pestanas.inicio.appendChild(elemento);
  });

  if (calendarioOriginal) {
    pestanas.calendario.appendChild(calendarioOriginal);
  }

  if (estadisticasOriginal) {
    pestanas.logros.appendChild(estadisticasOriginal);
  }

  seccionesExtra.forEach(function (elemento) {
    pestanas.logros.appendChild(elemento);
  });

  contenido.append(
    pestanas.inicio,
    pestanas.calendario,
    pestanas.diario,
    pestanas.logros
  );

  // ==========================================
  // MENÚ INFERIOR
  // ==========================================

  const menu = document.createElement("nav");
  menu.id = "brotaMenuInferior";

  menu.setAttribute(
    "aria-label",
    "Menú principal de Brota"
  );

  const opciones = [
    ["inicio", "🏡", "Inicio"],
    ["calendario", "🗓️", "Calendario"],
    ["diario", "📖", "Diario"],
    ["logros", "♻️", "Logros"]
  ];

  function mostrarPestana(id) {
    Object.keys(pestanas).forEach(function (clave) {
      pestanas[clave].hidden = clave !== id;
    });

    menu.querySelectorAll(".brota-nav-boton")
      .forEach(function (boton) {
        const activo = boton.dataset.pestana === id;

        boton.classList.toggle("activo", activo);

        boton.setAttribute(
          "aria-current",
          activo ? "page" : "false"
        );
      });

    window.scrollTo(0, 0);
  }

  opciones.forEach(function ([id, icono, nombre]) {
    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "brota-nav-boton";
    boton.dataset.pestana = id;

    const figura = document.createElement("span");
    figura.className = "brota-nav-icono";
    figura.textContent = icono;

    const textoBoton = document.createElement("span");
    textoBoton.textContent = nombre;

    boton.append(figura, textoBoton);

    boton.addEventListener("click", function () {
      mostrarPestana(id);
    });

    menu.appendChild(boton);
  });

  document.body.appendChild(menu);
  mostrarPestana("inicio");

  const observador = new MutationObserver(function () {
    menu.hidden = inicio.hidden;
  });

  observador.observe(inicio, {
    attributes: true,
    attributeFilter: ["hidden"]
  });

  menu.hidden = inicio.hidden;

  // ==========================================
  // DIARIO SIN ARCHIVOS ADJUNTOS
  // ==========================================

  const diario = pestanas.diario;
  diario.classList.add("brota-diario");

  const encabezado = document.createElement("div");

  encabezado.innerHTML = `
    <h2>📒 Mi Diario del Planeta</h2>
    <p>
      Con Nubi, recuerda tus pequeñas acciones
      y cómo ayudaste a cuidar el planeta. 💚
    </p>
  `;

  const editor = document.createElement("div");
  editor.className = "brota-diario-editor";

  editor.innerHTML = `
    <label for="brotaNotaCategoria">¿Qué cuidaste hoy?</label>
    <select id="brotaNotaCategoria">
      <option value="agua">💧 Agua</option>
      <option value="reciclaje">♻️ Reciclaje</option>
      <option value="energia">⚡ Energía</option>
      <option value="otro">🌱 Otra acción</option>
    </select>

    <label for="brotaNotaTitulo">Título</label>

    <input
      id="brotaNotaTitulo"
      maxlength="100"
      placeholder="Ej.: Hoy ahorré agua"
    >

    <label for="brotaNotaTexto">¿Qué hiciste hoy?</label>

    <textarea
      id="brotaNotaTexto"
      placeholder="Cuenta tu acción para cuidar el planeta..."
    ></textarea>

    <label for="brotaNotaImpacto">¿Cómo ayudaste al planeta?</label>
    <textarea id="brotaNotaImpacto" placeholder="Ej.: Evité desperdiciar agua."></textarea>

    <label for="brotaNotaFuente">Tipo de letra</label>

    <select id="brotaNotaFuente">
      <option value="normal">Normal</option>
      <option value="cursiva">Cursiva</option>
      <option value="clasica">Clásica</option>
    </select>

    <label>Color de la nota</label>

    <div
      class="brota-diario-colores"
      id="brotaNotaColores"
    ></div>

    <div class="brota-diario-acciones">
      <button type="button" id="brotaGuardarNota">
        💾 Guardar nota
      </button>

      <button
        type="button"
        class="secundario"
        id="brotaNuevaNota"
      >
        Nueva nota
      </button>
    </div>

    <p
      id="brotaDiarioMensaje"
      aria-live="polite"
    ></p>
  `;

  const tituloListado = document.createElement("h3");
  tituloListado.textContent = "🌷 Mis notas guardadas";
  const barraFiltro = document.createElement("div");
  barraFiltro.className = "brota-diario-filtros";
  barraFiltro.innerHTML = `<label for="brotaFiltroNotas">Ver notas de:</label>
    <select id="brotaFiltroNotas">
      <option value="todas">🌿 Todas las notas</option>
      <option value="agua">💧 Agua</option>
      <option value="reciclaje">♻️ Reciclaje</option>
      <option value="energia">⚡ Energía</option>
      <option value="otro">🌱 Otras / anteriores</option>
    </select>`;

  const controlesMes = document.createElement("div");
  controlesMes.className = "brota-diario-meses";
  controlesMes.innerHTML = `<label for="brotaMesNotas">📅 Mes:</label><select id="brotaMesNotas" aria-label="Filtrar notas por mes"></select>`;
  const listado = document.createElement("div");
  const botonMas = document.createElement("button");
  botonMas.type = "button";
  botonMas.className = "brota-diario-ver-mas";
  botonMas.textContent = "🌿 Ver más notas";
  botonMas.hidden = true;

  diario.append(
    encabezado,
    editor,
    tituloListado,
    barraFiltro,
    controlesMes,
    listado,
    botonMas
  );

  const titulo = document.getElementById("brotaNotaTitulo");
  const texto = document.getElementById("brotaNotaTexto");
  const fuente = document.getElementById("brotaNotaFuente");
  const mensaje = document.getElementById("brotaDiarioMensaje");
  const categoria = document.getElementById("brotaNotaCategoria");
  const impacto = document.getElementById("brotaNotaImpacto");
  const filtro = document.getElementById("brotaFiltroNotas");
  const selectorMes = document.getElementById("brotaMesNotas");
  let notasVisibles = 5;
  filtro.addEventListener("change", function () { notasVisibles = 5; mostrarNotas(); });
  selectorMes.addEventListener("change", function () { notasVisibles = 5; mostrarNotas(); });
  botonMas.addEventListener("click", function () { notasVisibles += 5; mostrarNotas(); });

  // ==========================================
  // DATOS DE LAS NOTAS
  // ==========================================

  const colores = [
    "#FFF0D5",
    "#F8DBE7",
    "#D7EFDA",
    "#D9EAFB"
  ];

  let colorElegido = colores[0];
  let notaEditando = null;
  let imagenAnterior = "";

  // Un único diario local estable. Recupera notas de claves antiguas
  // (con y sin sesión Firebase) sin borrar sus copias originales.
  const CLAVE_DIARIO_ESTABLE = "brota_diario_historial_v2";

  function claveDiario() {
    return CLAVE_DIARIO_ESTABLE;
  }

  function obtenerNotas() {
    const reunidas = new Map();
    const claves = [CLAVE_DIARIO_ESTABLE, "brota_diario_dispositivo"];
    const uid = window.BrotaFirebase?.auth?.currentUser?.uid;
    if (uid) claves.push("brota_diario_" + uid);
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        if (clave && clave.startsWith("brota_diario_") && !claves.includes(clave)) {
          claves.push(clave);
        }
      }
      claves.forEach(function (clave) {
        let datos;
        try { datos = JSON.parse(localStorage.getItem(clave) || "[]"); }
        catch (_) { return; }
        if (!Array.isArray(datos)) return;
        datos.forEach(function (nota) {
          if (!nota || typeof nota !== "object") return;
          const id = String(nota.id || JSON.stringify(nota));
          if (!reunidas.has(id)) reunidas.set(id, nota);
        });
      });
      return Array.from(reunidas.values()).sort(function (a, b) {
        return (Date.parse(b.fecha) || 0) - (Date.parse(a.fecha) || 0);
      });
    } catch (error) {
      console.warn("No se pudo leer el diario", error);
      return [];
    }
  }

  function guardarNotas(notas) {
    // Actualiza la clave estable y sincroniza las claves anteriores para
    // que una nota eliminada no reaparezca al recuperar los registros.
    const contenido = JSON.stringify(notas);
    localStorage.setItem(CLAVE_DIARIO_ESTABLE, contenido);
    const uid = window.BrotaFirebase?.auth?.currentUser?.uid;
    const claves = ["brota_diario_dispositivo"];
    if (uid) claves.push("brota_diario_" + uid);
    claves.forEach(function (clave) {
      try { localStorage.setItem(clave, contenido); }
      catch (error) { console.warn("Copia de diario no disponible", error); }
    });
  }

  // ==========================================
  // COLORES
  // ==========================================

  function elegirColor(color) {
    colorElegido = color;
    editor.style.background = color;

    document.querySelectorAll(".brota-diario-color")
      .forEach(function (boton) {
        boton.classList.toggle(
          "elegido",
          boton.dataset.color === color
        );
      });
  }

  colores.forEach(function (color) {
    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "brota-diario-color";
    boton.dataset.color = color;
    boton.style.background = color;

    boton.setAttribute(
      "aria-label",
      "Elegir color " + color
    );

    boton.addEventListener("click", function () {
      elegirColor(color);
    });

    document.getElementById("brotaNotaColores")
      .appendChild(boton);
  });

  elegirColor(colorElegido);

  // ==========================================
  // TIPOS DE LETRA
  // ==========================================

  function aplicarFuente(elemento, tipo) {
    elemento.style.fontFamily =
      tipo === "clasica"
        ? "Georgia, serif"
        : tipo === "cursiva"
          ? "cursive"
          : "inherit";
  }

  fuente.addEventListener("change", function () {
    aplicarFuente(texto, fuente.value);
  });

  // ==========================================
  // LIMPIAR EDITOR
  // ==========================================

  function limpiarEditor() {
    notaEditando = null;
    imagenAnterior = "";

    titulo.value = "";
    texto.value = "";
    impacto.value = "";
    categoria.value = "agua";
    fuente.value = "normal";

    aplicarFuente(texto, "normal");
    elegirColor(colores[0]);

    mensaje.textContent = "";
  }

  // ==========================================
  // CONFIRMACIÓN ECOLÓGICA PARA ELIMINAR
  // ==========================================

  function mostrarConfirmacionEliminar(alConfirmar) {
    const fondo = document.createElement("div");
    fondo.className = "brota-confirmacion-fondo";

    const ventana = document.createElement("div");
    ventana.className = "brota-confirmacion";
    ventana.setAttribute("role", "alertdialog");
    ventana.setAttribute("aria-modal", "true");
    ventana.setAttribute(
      "aria-labelledby",
      "brotaConfirmacionTitulo"
    );

    ventana.innerHTML = `
      <div class="brota-confirmacion-icono">🌿</div>

      <h3 id="brotaConfirmacionTitulo">
        ¿Eliminar esta nota?
      </h3>

      <p>
        Esta nota desaparecerá de tu diario.
        ¿Estás segura?
      </p>

      <div class="brota-confirmacion-acciones">
        <button
          type="button"
          class="brota-cancelar"
        >
          Cancelar
        </button>

        <button
          type="button"
          class="brota-eliminar"
        >
          Sí, eliminar
        </button>
      </div>
    `;

    fondo.appendChild(ventana);
    document.body.appendChild(fondo);

    const cancelar = ventana.querySelector(".brota-cancelar");
    const confirmar = ventana.querySelector(".brota-eliminar");

    const focoAnterior = document.activeElement;

    function cerrar() {
      document.removeEventListener("keydown", manejarTeclado);
      fondo.remove();

      if (focoAnterior?.isConnected) {
        focoAnterior.focus();
      }
    }

    function manejarTeclado(evento) {
      if (evento.key === "Escape") {
        cerrar();
      }

      if (evento.key === "Tab") {
        const botones = [cancelar, confirmar];
        const indice = botones.indexOf(document.activeElement);

        if (evento.shiftKey && indice === 0) {
          evento.preventDefault();
          confirmar.focus();
        } else if (!evento.shiftKey && indice === 1) {
          evento.preventDefault();
          cancelar.focus();
        }
      }
    }

    document.addEventListener("keydown", manejarTeclado);

    cancelar.addEventListener("click", cerrar);

    confirmar.addEventListener("click", function () {
      cerrar();
      alConfirmar();
    });

    fondo.addEventListener("click", function (evento) {
      if (evento.target === fondo) {
        cerrar();
      }
    });

    cancelar.focus();
  }

  // ==========================================
  // MOSTRAR NOTAS GUARDADAS
  // ==========================================

  function mostrarNotas() {
    listado.replaceChildren();

    const todas = obtenerNotas();
    const mesActual = selectorMes.value || "todos";
    const meses = [...new Set(todas.map(nota => {
      const fecha = new Date(nota.fecha);
      return Number.isNaN(fecha.getTime()) ? "sin-fecha" :
        `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
    }))].sort((a, b) => b.localeCompare(a));

    selectorMes.replaceChildren();
    const todosMeses = document.createElement("option");
    todosMeses.value = "todos";
    todosMeses.textContent = "Todos los meses";
    selectorMes.appendChild(todosMeses);
    meses.forEach(function (clave) {
      const opcion = document.createElement("option");
      opcion.value = clave;
      if (clave === "sin-fecha") {
        opcion.textContent = "Sin fecha";
      } else {
        const [anio, mes] = clave.split("-").map(Number);
        opcion.textContent = new Date(anio, mes - 1, 1).toLocaleDateString("es-CL", {month:"long", year:"numeric"});
      }
      selectorMes.appendChild(opcion);
    });
    selectorMes.value = meses.includes(mesActual) ? mesActual : "todos";

    const notas = todas
      .filter(nota => filtro.value === "todas" || (nota.categoria || "otro") === filtro.value)
      .filter(nota => {
        if (selectorMes.value === "todos") return true;
        const fecha = new Date(nota.fecha);
        const clave = Number.isNaN(fecha.getTime()) ? "sin-fecha" :
          `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
        return clave === selectorMes.value;
      })
      .sort((a, b) => (Date.parse(b.fecha) || 0) - (Date.parse(a.fecha) || 0));
    botonMas.hidden = notas.length <= notasVisibles;

    if (!notas.length) {
      const vacio = document.createElement("p");

      vacio.textContent =
        "☁️ Todavía no tienes notas. ¡Escribe la primera!";

      listado.appendChild(vacio);
      botonMas.hidden = true;
      return;
    }

    notas.slice(0, notasVisibles).forEach(function (nota) {
      const tarjeta = document.createElement("article");

      tarjeta.className = "brota-nota-guardada brota-nota-cuaderno";
      tarjeta.style.background = nota.color || colores[0];

      const encabezadoNota = document.createElement("h4");
      const iconos = {agua:"💧", reciclaje:"♻️", energia:"⚡", otro:"🌱"};
      encabezadoNota.textContent = (iconos[nota.categoria || "otro"] || "🌱") + " " + (nota.titulo || "Sin título");

      const fecha = document.createElement("small");

      const fechaNota = new Date(nota.fecha);
      fecha.textContent = Number.isNaN(fechaNota.getTime()) ? "Sin fecha" : fechaNota.toLocaleDateString("es-CL", {day:"numeric", month:"long", year:"numeric"});

      const cuerpo = document.createElement("p");
      cuerpo.textContent = nota.texto || "";

      aplicarFuente(cuerpo, nota.fuente);

      tarjeta.append(encabezadoNota, fecha, cuerpo);
      if (nota.impacto) {
        const aporte = document.createElement("p");
        aporte.className = "brota-nota-impacto";
        aporte.textContent = "🌎 Mi aporte: " + nota.impacto;
        tarjeta.appendChild(aporte);
      }

      // Conservar fotografías antiguas, si existen.

      if (nota.imagen) {
        const foto = document.createElement("img");

        foto.src = nota.imagen;
        foto.alt = "Fotografía guardada anteriormente";

        tarjeta.appendChild(foto);
      }

      // ======================================
      // EDITAR NOTA
      // ======================================

      const editar = document.createElement("button");

      editar.type = "button";
      editar.textContent = "✏️ Editar";

      editar.addEventListener("click", function () {
        notaEditando = nota.id;

        titulo.value = nota.titulo || "";
        texto.value = nota.texto || "";
        impacto.value = nota.impacto || "";
        categoria.value = nota.categoria || "otro";
        fuente.value = nota.fuente || "normal";

        imagenAnterior = nota.imagen || "";

        aplicarFuente(texto, fuente.value);
        elegirColor(nota.color || colores[0]);

        mensaje.textContent = "Editando nota...";

        editor.scrollIntoView({
          behavior: "smooth"
        });
      });

      // ======================================
      // ELIMINAR CON VENTANA PERSONALIZADA
      // ======================================

      const eliminar = document.createElement("button");

      eliminar.type = "button";
      eliminar.textContent = "🗑️ Eliminar";

      eliminar.addEventListener("click", function () {
        mostrarConfirmacionEliminar(function () {
          const nuevas = obtenerNotas().filter(
            elemento => elemento.id !== nota.id
          );

          try {
            guardarNotas(nuevas);

            if (notaEditando === nota.id) {
              limpiarEditor();
            }

            mostrarNotas();

          } catch (error) {
            mensaje.textContent =
              "No se pudo eliminar la nota.";
          }
        });
      });

      tarjeta.append(editar, eliminar);
      listado.appendChild(tarjeta);
    });
  }

  // ==========================================
  // GUARDAR NOTA
  // ==========================================

  document.getElementById("brotaGuardarNota")
    .addEventListener("click", function () {

      const contenidoNota = texto.value.trim();

      if (!contenidoNota) {
        mensaje.textContent =
          "Escribe algo antes de guardar tu nota. 💚";
        return;
      }

      const notas = obtenerNotas();

      const nota = {
        id: notaEditando || (
          Date.now().toString() +
          Math.random().toString(36).slice(2)
        ),

        titulo: titulo.value.trim() || "Sin título",
        texto: contenidoNota,
        impacto: impacto.value.trim(),
        categoria: categoria.value,
        fuente: fuente.value,
        color: colorElegido,
        imagen: imagenAnterior,
        fecha: new Date().toISOString()
      };

      const indice = notas.findIndex(
        elemento => elemento.id === nota.id
      );

      if (indice >= 0) {
        nota.fecha = notas[indice].fecha;
        notas[indice] = nota;
      } else {
        notas.unshift(nota);
      }

      try {
        guardarNotas(notas);

        limpiarEditor();
        mostrarNotas();

        mensaje.textContent = "💚 ¡Nota guardada!";

      } catch (error) {
        mensaje.textContent =
          "No hay espacio suficiente para guardar la nota.";
      }
    });

  // ==========================================
  // NUEVA NOTA
  // ==========================================

  document.getElementById("brotaNuevaNota")
    .addEventListener("click", limpiarEditor);

  mostrarNotas();

  menu.querySelector('[data-pestana="diario"]')
    .addEventListener("click", mostrarNotas);

});