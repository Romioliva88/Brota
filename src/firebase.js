import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

// ==========================================
// CONFIGURACIÓN DE FIREBASE
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyAoN85kFWF7uUaajnC-KATpzoeOu6DnniM",
  authDomain: "brota-59edd.firebaseapp.com",
  projectId: "brota-59edd",
  storageBucket: "brota-59edd.firebasestorage.app",
  messagingSenderId: "911698428317",
  appId: "1:911698428317:web:aeae7a7f8f3b5a878eef74"
};

// ==========================================
// INICIAR FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// ==========================================
// CREAR CUENTA
// ==========================================

export async function registrarUsuario(nombre, correo, clave) {
  const resultado = await createUserWithEmailAndPassword(
    auth,
    correo,
    clave
  );

  await updateProfile(resultado.user, {
    displayName: nombre
  });

  return resultado.user;
}

// ==========================================
// INICIAR SESIÓN
// ==========================================

export async function iniciarSesion(correo, clave) {
  const resultado = await signInWithEmailAndPassword(
    auth,
    correo,
    clave
  );

  return resultado.user;
}

// ==========================================
// CERRAR SESIÓN
// ==========================================

export async function cerrarSesion() {
  await signOut(auth);
}

// ==========================================
// OBSERVAR SESIÓN
// ==========================================

export function observarSesion(callback) {
  return onAuthStateChanged(auth, callback);
}