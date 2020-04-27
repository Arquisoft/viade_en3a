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
      "navBarGroups": "My groups",
      "navBarSettings": "Settings",
      "navBarRoutes": "Route management",
      "navBarMyRoutes": "My routes",
      "navBarCreateRoute": "Create a new route",
      "navBarSharedRoutes": "Shared to Me",
      "navBarRouteHelp": "How do routes work?",
      "routeListText": "Route List",
      "friendCardProfile": "Profile",
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
      "homeWelcome": "Hi ",
      "homeWelcome2": "welcome to",
      "profileTitle": "Profile",
      "profileUsername": "Username:",
      "profileAddress": "Address:",
      "profileEmail": "Email:",
      "profilePhone": "Phone:",
      "profileEditButton": "Edit profile",
      "profileLastRoutes": "Last routes done",
      "infoViewTitle": "Route Info",
      "infoViewExportJSON": "Export route in json format",
      "infoViewTh1": "Info",
      "infoViewTh2": "Data",
      "infoViewTd1": "Name:",
      "infoViewTd2": "Author:",
      "infoViewTd3": "Description:",
      "infoViewTd4": "Distance:",
      "infoViewComments": "Comment section",
      "infoViewWriteComments": "Write your comment here",
      "infoViewSubmit": "Submit",
      "infoViewMap": "Map view",
      "infoViewElevation": "Elevation chart",
      "infoViewImg": "Image gallery",
      "mapCreationTitle": "Create your own Route",
      "mapCreationName": "Route Name",
      "mapCreationNamePlaceholder": "Type in new route name",
      "mapCreationRouteDescription": "Route Description",
      "mapCreationRouteDescriptionPlaceholder": "(Optional) Type a description of the route",
      "mapCreationSaveButton": "Save route in pod",
      "mapCreationSearchBarFound": "Found! ",
      "mapCreationSearchBarError": "We are sorry! We didn't find that place. Please, try with a different one",
      "friendsTitle": "Friends",
      "friendsAdd": "Add a friend",
      "friendsList": "List of friends",
      "groupsTitle": "Groups of friends",
      "groupsCreate": "Create group",
      "groupsAdd": "Add",
      "groupsAdded": "Added",
      "groupsCreateBtn": "Create",
      "routeListLoadingMessage": "We're downloading your routes. Next time will be faster.",
      "routeHelpIndex": "Index",
      "routeHelpIntro": "Introduction",
      "routeHelpIntro_1": "Viade is an Application whose task is to manage routes.",
      "routeHelpIntro_2": "It allows you to store your favourite scenic routes on your Solid Pod and to share it with your friends and family as well as comment on those of your friends'.",
      "routeHelpCreatePOD": "Create a POD",
      "routeHelpCreatePOD_1": "If you are not an owner of a POD you can create one by pressing the register button. This will redirect you to a provider, where you can create your POD.",
      "routeHelpLogin": "Login",
      "routeHelpLogin_1": "Once the POD is created, press the login button and a popup will ask you for credentials. Once logged in you will have access to new options.",
      "routeHelpCreateRoutes": "Create a Route",
      "routeHelpCreateRoutes_1": "From \"Route Management > Create a new Route\" you can create a new route. Just set a title, description, select the waypoints of the route and press \"Save route in POD\".",
      "routeHelpViewRoutes": "View your Routes",
      "routeHelpViewRoutes_1": "We can now navigate to \"Route Management > My Routes\", where the routes you have created are listed. When clicking on \"Info\" of the new route a new window will display all the information recorded, as well as comments posted and a elevation chart of the waypoints.",
      "routeHelpShareRoutes": "Share with Friends",
      "routeHelpShareRoutes_1": "When displaying all routes \"Route Management > My Routes\", you can click on the share option. This will list all friends and when clicking share, a message with the route will be sent to the inbox of your friend.",
      "alertName": "Name can't be empty",
      "alertPoints": "Routes must have at least two points",
      "alertAccessPOD": "We can't access your POD. Please, review its permissions",
      "alertMembers": "A group must have at least one member",
      "alertAlreadyIncluded": " already included",
      "alertAddedSuccessfully": " added successfully",
      "alertErrorInPermissions": "Unable to share your route. Your friend does not allow sharing",
      "alertSuccessInPermissions": "Your route was successfully shared!",
      "alertNoInputOnSearch": "Oopss... At least try to search for some place :D",
      "searching": "Searching...",
      "alertUnableToRetrieveRoute": "There was an error trying to show the information for this route",
      "alertUnavailableRoutes": "One of your friends erased a route shared to you. Go to Shared routes and remove them to discard this message",
      "alertRoutesRemoved": "Routes Eliminated!",
      "messageNoGroups": "You have no groups created yet!",
      "messageNoGroupsCreateOne": "Click on the button and create one!",
      "sharedRouteListTitle": "Shared route list",
      "routeListOoopsTitle": "Oops! We didn't find any route in your POD",
      "routeListOoopsParagraph": "You can move to \"Route management >> Create a new route\" to add a new route!",
      "sharedRouteListOoopsTitle": "Oops! It seems that you haven't been shared any route yet. Sad...",
      "sharedRouteListOoopsParagraph": "You can ask some friend to share one to you",
      "infoViewCommentsNotYetImplemented": "This functionality is not currently being supported. We are sorry for the inconvenieces.",
      "routeCreationElevationPreviewTitle": "Route elevation previeww"
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
      "navBarGroups": "Mis grupos",
      "navBarFriends": "Amigos",
      "navBarSettings": "Ajustes",
      "navBarRoutes": "Gestión de rutas",
      "navBarMyRoutes": "Mis rutas",
      "navBarCreateRoute": "Crear una nueva ruta",
      "navBarSharedRoutes": "Compartidas conmigo",
      "navBarRouteHelp": "¿Cómo funcionan las rutas?",
      "routeListText": "Lista de rutas",
      "friendCardProfile": "Perfil",
      "pageNotFoundHeader": "¡Vaya! La página a la que estás intentando acceder no existe.",
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
      "homeWelcome": "Hola ",
      "homeWelcome2": "bienvenido a",
      "profileTitle": "Perfil",
      "profileUsername": "Usuario:",
      "profileAddress": "Dirección:",
      "profileEmail": "Correo:",
      "profilePhone": "Teléfono:",
      "profileEditButton": "Editar perfil",
      "profileLastRoutes": "Últimas rutas realizadas",
      "infoViewTitle": "Información de la ruta",
      "infoViewExportJSON": "Exportar ruta en formato json",
      "infoViewTh1": "Info",
      "infoViewTh2": "Datos",
      "infoViewTd1": "Nombre:",
      "infoViewTd2": "Autor:",
      "infoViewTd3": "Descripción:",
      "infoViewTd4": "Distancia:",
      "infoViewComments": "Comentarios",
      "infoViewWriteComments": "Escribe tu comentario aquí",
      "infoViewSubmit": "Publicar",
      "infoViewMap": "Vista del mapa",
      "infoViewElevation": "Perfil de elevación",
      "infoViewImg": "Galería de imágenes",
      "mapCreationTitle": "Crea tu propia ruta",
      "mapCreationName": "Nombre de ruta",
      "mapCreationNamePlaceholder": "Escribe el nombre de tu nueva ruta",
      "mapCreationRouteDescription": "Descripción",
      "mapCreationRouteDescriptionPlaceholder": "(Opcional) Escribe una descripción sobre la ruta",
      "mapCreationSaveButton": "Guardar ruta en pod",
      "mapCreationSearchBarFound": "¡Listo! ",
      "mapCreationSearchBarError": "¡Lo sentimos! No hemos podido encontrar ese lugar. Por favor, inténtalo de nuevo con otro lugar",
      "friendsTitle": "Amigos",
      "friendsAdd": "Añadir un amigo",
      "friendsList": "Lista de amigos",
      "groupsTitle": "Grupos de amigos",
      "groupsCreate": "Crear grupo",
      "groupsAdd": "Añadir",
      "groupsAdded": "Añadido",
      "groupsCreateBtn": "Crear",
      "routeListLoadingMessage": "Estamos descargando sus rutas. La próxima vez tardará menos.",
      "routeHelpIndex": "Índice",
      "routeHelpIntro": "Introducción",
      "routeHelpIntro_1": "Viade es una aplicación de Administración de Rutas.",
      "routeHelpIntro_2": "Te permite almacenar tus rutas de montaña favoritas en tu POD de Solid y compartirlas con tus amigos y familia a la par que comentar sobre ellas.",
      "routeHelpCreatePOD": "Crear un POD",
      "routeHelpCreatePOD_1": "Si todavía no tienes un POD, puedes hacerte a uno pulsando el botón de registrar. Esto te redirigirá a un proveedor, donde podrás crear tu POD.",
      "routeHelpLogin": "Iniciar Sesión",
      "routeHelpLogin_1": "Una vez tengas un POD, pulsa el botón 'Identificarse' y una ventana te pedirá credenciales. Una vez tengas la sesión uniciada dispondrás de más opciones.",
      "routeHelpCreateRoutes": "Crear una Ruta",
      "routeHelpCreateRoutes_1": "Desde \"Gestión de Rutas > Crear una Nueva Ruta\" puedes crear rutas nuevas. Escoge un título, descripción, los puntos por donde pasa y pulsa \"Guardar ruta en POD\".",
      "routeHelpViewRoutes": "Ver tus Rutas",
      "routeHelpViewRoutes_1": "Puedes navegar a \"Gestión de Rutas > Mis rutas\", donde se mostrará un listado de las rutas que hayas creado. Cuando se seleccione \"Info\" de la nueva ruta una ventana mostrará toda la información guardada, así como comentarios de la ruta o un gráfica de elevación de los puntos por donde pasa.",
      "routeHelpShareRoutes": "Compartir con los Amigos",
      "routeHelpShareRoutes_1": "Cuando se muestran todas tus rutas \"Gestión de Rutas > Mis rutas\", puedes pulsar en la opción de compartir. Esto listará a todos tus amigos y al pulsar sobre uno de ellos se les enviará un mensaje a \"Inbox\".",
      "alertName": "El nombre no puede estar vacío",
      "alertPoints": "La ruta debe contener al menos dos puntos",
      "alertAccessPOD": "No podemos acceder a su POD. Por favor, compruebe sus permisos",
      "alertMembers": "El grupo debe tener al menos un miembro",
      "alertAlreadyIncluded": " ya está incluido",
      "alertAddedSuccessfully": " añadido correctamente",
      "alertErrorInPermissions": "Imposible compartir la ruta. Tu amigo no permite esta acción",
      "alertSuccessInPermissions": "Tu ruta ha sido compartida con éxito",
      "alertNoInputOnSearch": "Oopss... Debes indicar un sitio para poder buscarlo :D",
      "searching": "Buscando...",
      "alertUnableToRetrieveRoute": "Hubo un error tratando de mostrar la información sobre la ruta",
      "alertUnavailableRoutes": "Uno de tus amigos elimino una o varias rutas que te había compartido. Ve a la sección de rutas compartidas y eliminalas para descartar este mensaje",
      "alertRoutesRemoved": "¡Rutas eliminadas!",
      "messageNoGroups": "¡Todavía no has creado ningun grupo!",
      "messageNoGroupsCreateOne": "Pulsa en el botón y crea uno",
      "sharedRouteListTitle": "Lista de routas compartidas",
      "routeListOoopsTitle": "¡Vaya! No hemos podido encontrar ninguna ruta en tu POD",
      "routeListOoopsParagraph": "¡Puedes usar la vista de creación de rutas \"Gestión de rutas >> Crear una nueva ruta\" para añadir una nueva!",
      "sharedRouteListOoopsTitle": "¡Vaya! Parece que no se te ha compartido ninguna ruta todavía. Triste, socio...",
      "sharedRouteListOoopsParagraph": "Puedes pedirle algún amigo o amiga que te comparta una para verla aquí",
      "infoViewCommentsNotYetImplemented": "Esta funcionalidad todavía no está soportada. Nos disculpamos por los inconvenientes que esto pueda causar.",
      "routeCreationElevationPreviewTitle": "Vista previa del perfil altimétrico"
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