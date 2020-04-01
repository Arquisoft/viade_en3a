import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
        "carouselWelcome": "Welcome to Viade",
        "carouselText1": "Your routes app",
        "carouselText2": "Store your routes, create new ones",
        "carouselText3": "High versatility",
        "navBarLanguageEn": "English",
        "navBarLanguageEs": "Spanish",
        "navBarLanguage": "Language",
        "navBarSignUp": "Sign up",
        "navBarSignIn": "Sign in",
        "navBarSignOut": "Sign out",
        "navBarProfile": "Profile",
        "navBarMyProfile": "My profile",
        "navBarFriends": "Friends",
        "navBarSettings": "Settings",
        "navBarRoutes": "Route management",
        "navBarMyRoutes": "My routes",
        "navBarCreateRoute": "Create a new route",
        "navBarRouteHelp": "How do routes work?",
        "routeListText": "Route List",
        "friendCardDelete": "Delete",
        "pageNotFoundHeader": "Oops! The page you are trying to access does not exist.",
        "pageNotFoundText1": "You can return to homepage ",
        "pageNotFoundText2": "here.",
        "registerFormTitle": "Get your own SOLID pod",
        "registerFormText": "Get your SOLID pod from one of these identity providers",
        "editProfileTitle": "Edit profile info",
        "editProfileChangeName": "Change name",
        "editProfileNewName": "New name",
        "editProfileMinChar": "Min of 8 characters",
        "editProfileChangePass": "Change password",
        "editProfileNewPass": "New password",
        "editProfileSave": "Save",
        "homeWelcome": "Hi,",
        "homeWelcome2": "welcome to"
    }
  },
  es: {
    translation: {
        "carouselWelcome": "Bienvenido a Viade",
        "carouselText1": "Tu aplicación de rutas",
        "carouselText2": "Guarda tus rutas, crea nuevas",
        "carouselText3": "Alta versatilidad",
        "navBarLanguageEn": "Inglés",
        "navBarLanguageEs": "Español",
        "navBarLanguage": "Idioma",
        "navBarSignUp": "Registrarse",
        "navBarSignIn": "Identificarse",
        "navBarSignOut": "Cerrar sesión",
        "navBarProfile": "Perfil",
        "navBarMyProfile": "Mi perfil",
        "navBarFriends": "Amigos",
        "navBarSettings": "Ajustes",
        "navBarRoutes": "Gestión de rutas",
        "navBarMyRoutes": "Mis rutas",
        "navBarCreateRoute": "Crear una nueva ruta",
        "navBarRouteHelp": "¿Cómo funcionan las rutas?",
        "routeListText": "Lista de rutas",
        "friendCardDelete": "Borrar",
        "pageNotFoundHeader": "Vaya! La página a la que estás intentando acceder no existe.",
        "pageNotFoundText1": "Puedes volver a la página principal ",
        "pageNotFoundText2": "aquí.",
        "registerFormTitle": "Obtén tu pod SOLID",
        "registerFormText": "Obtén tu identidad solid de uno de los siguientes proveedores",
        "editProfileTitle": "Editar información de perfil",
        "editProfileChangeName": "Cambiar nombre",
        "editProfileNewName": "Nuevo nombre",
        "editProfileMinChar": "Mínimo de 8 caracteres",
        "editProfileChangePass": "Cambiar contraseña",
        "editProfileNewPass": "Nueva contraseña",
        "editProfileSave": "Guardar",
        "homeWelcome": "Hola,",
        "homeWelcome2": "bienvenido a"

    }
  }
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;