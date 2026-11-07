document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ==========================================
  // PANTALLAS
  // ==========================================

  const pantallas = [
    "pantallaBienvenida",
    "pantallaInicio",
    "pantallaActividad",
    "pantallaDia",
    "pantallaAcceso",
    "pantallaRegistro",
    "pantallaLogin"
  ];

  const firebase = window.BrotaFirebase;

  // ==========================================
  // NAVEGACIÓN
  // ==========================================

  function abrirPantalla(id) {
    pantallas.forEach(function (pantallaId) {
      const pantalla = document.getElementById(pantallaId);

      if (pantalla) {
        pantalla.hidden = pantallaId !== id;
      }
    });

    window.scrollTo(0, 0);
  }

  function conectarBoton(id, destino) {
    const boton = document.getElementById(id);

    if (boton) {
      boton.addEventListener("click", function () {
        abrirPantalla(destino);
      });
    }
  }

  // BIENVENIDA
  conectarBoton("btnComenzar", "pantallaRegistro");
  conectarBoton("btnBienvenidaLogin", "pantallaLogin");

  // ACCESO
  conectarBoton("btnCrearCuenta", "pantallaRegistro");
  conectarBoton("btnIrLogin", "pantallaLogin");

  // VOLVER
  conectarBoton(
    "btnVolverAccesoRegistro",
    "pantallaBienvenida"
  );

  conectarBoton(
    "btnVolverAccesoLogin",
    "pantallaBienvenida"
  );

  // ==========================================
  // MENSAJES
  // ==========================================

  function mostrarMensaje(id, mensaje) {
    const elemento = document.getElementById(id);

    if (elemento) {
      elemento.textContent = mensaje;
    }
  }

  function traducirError(error) {
    const mensajes = {
      "auth/email-already-in-use":
        "Este correo ya está registrado.",

      "auth/invalid-email":
        "Ingresa un correo válido.",

      "auth/weak-password":
        "La contraseña es demasiado débil.",

      "auth/invalid-credential":
        "Correo o contraseña incorrectos.",

      "auth/network-request-failed":
        "Revisa tu conexión a internet.",

      "auth/too-many-requests":
        "Demasiados intentos. Inténtalo más tarde.",

      "auth/operation-not-allowed":
        "El acceso con correo no está habilitado."
    };

    return mensajes[error?.code] ||
      "Ocurrió un problema. Inténtalo nuevamente.";
  }

  // ==========================================
  // REGISTRO
  // ==========================================

  const formRegistro =
    document.getElementById("formRegistro");

  if (formRegistro) {
    formRegistro.addEventListener(
      "submit",
      async function (evento) {
        evento.preventDefault();

        if (!firebase ||
            typeof firebase.registrarUsuario !== "function") {
          mostrarMensaje(
            "mensajeRegistro",
            "Firebase no está disponible."
          );
          return;
        }

        const nombre = document
          .getElementById("registroNombre")
          .value.trim();

        const correo = document
          .getElementById("registroCorreo")
          .value.trim();

        const clave = document
          .getElementById("registroClave")
          .value;

        if (!nombre || !correo || clave.length < 8) {
          mostrarMensaje(
            "mensajeRegistro",
            "Completa los campos y utiliza una contraseña de al menos 8 caracteres."
          );
          return;
        }

        const boton = formRegistro.querySelector(
          'button[type="submit"]'
        );

        if (boton) boton.disabled = true;

        mostrarMensaje(
          "mensajeRegistro",
          "Creando tu cuenta..."
        );

        try {
          await firebase.registrarUsuario(
            nombre,
            correo,
            clave
          );

          formRegistro.reset();
          mostrarMensaje("mensajeRegistro", "");
          abrirPantalla("pantallaInicio");

        } catch (error) {
          console.error("Error de registro:", error);

          mostrarMensaje(
            "mensajeRegistro",
            traducirError(error)
          );

        } finally {
          if (boton) boton.disabled = false;
        }
      }
    );
  }

  // ==========================================
  // INICIAR SESIÓN
  // ==========================================

  const formLogin =
    document.getElementById("formLogin");

  if (formLogin) {
    formLogin.addEventListener(
      "submit",
      async function (evento) {
        evento.preventDefault();

        if (!firebase ||
            typeof firebase.iniciarSesion !== "function") {
          mostrarMensaje(
            "mensajeLogin",
            "Firebase no está disponible."
          );
          return;
        }

        const correo = document
          .getElementById("loginCorreo")
          .value.trim();

        const clave = document
          .getElementById("loginClave")
          .value;

        const boton = formLogin.querySelector(
          'button[type="submit"]'
        );

        if (boton) boton.disabled = true;

        mostrarMensaje(
          "mensajeLogin",
          "Iniciando sesión..."
        );

        try {
          await firebase.iniciarSesion(correo, clave);

          formLogin.reset();
          mostrarMensaje("mensajeLogin", "");
          abrirPantalla("pantallaInicio");

        } catch (error) {
          console.error("Error de inicio de sesión:", error);

          mostrarMensaje(
            "mensajeLogin",
            traducirError(error)
          );

        } finally {
          if (boton) boton.disabled = false;
        }
      }
    );
  }

  // ==========================================
  // CERRAR SESIÓN
  // ==========================================

  const btnCerrarSesion =
    document.getElementById("btnCerrarSesion");

  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener(
      "click",
      async function () {
        if (!firebase ||
            typeof firebase.cerrarSesion !== "function") {
          alert("No se pudo conectar con Firebase.");
          return;
        }

        btnCerrarSesion.disabled = true;

        try {
          await firebase.cerrarSesion();

          abrirPantalla("pantallaBienvenida");

        } catch (error) {
          console.error("Error al cerrar sesión:", error);
          alert("No pudimos cerrar tu sesión. Inténtalo nuevamente.");

        } finally {
          btnCerrarSesion.disabled = false;
        }
      }
    );
  }

  // ==========================================
  // COMPROBAR SESIÓN
  // ==========================================

  if (
    firebase &&
    typeof firebase.observarSesion === "function"
  ) {
    firebase.observarSesion(function (usuario) {
      if (usuario) {
        abrirPantalla("pantallaInicio");
      } else {
        abrirPantalla("pantallaBienvenida");
      }
    });

  } else {
    abrirPantalla("pantallaBienvenida");
  }

});