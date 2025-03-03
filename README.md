# Küpan Store / Proyecto 7 App Fullstack de comercio electrónico - Bootcamp UDD 

**Küpan Store** es una aplicación web fullstack para una tienda en línea, diseñada para ofrecer todas las funcionalidades esenciales del comercio electrónico. Los usuarios pueden explorar productos organizados por categorías, agregarlos al carrito de compras y completar sus pagos de manera segura. Además, cuenta con un sistema de autenticación de usuarios gestionado desde el backend.

Este repositorio contiene únicamente el frontend de la aplicación. Para acceder al backend, visita: https://www.backend.cl.

## Características

- **Catálogo de productos:** Muestra los productos organizados en categorías como ropa de hombre, ropa de mujer, electrónica y joyería.
- **Sistema de pagos:** Incorpora Stripe para procesar pagos de forma segura.
- **Carrito de compras:** Permite a los usuarios añadir, actualizar o eliminar productos antes de completar la compra.
- **Autenticación de usuarios:** Ofrece un sistema de registro e inicio de sesión, además de rutas exclusivas para usuarios autenticados.
- **Panel de administración:** Proporciona una interfaz para que los usuarios actualicen su información personal.

## Tecnologías utilizadas

### Frontend

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **React Router DOM v6**: Manejo de rutas y navegación dentro de la aplicación.
- **Tailwind CSS**: Estilización de componentes y diseño responsivo.
- **Hooks de React**, algunos de los principales:
    - **useState:** Manejo del estado en los componentes.
    - **useEffect:** Ejecución de efectos secundarios en los componentes.
    - **useContext:** Gestión de estados globales mediante el contexto.
    - **useReducer:** Manejo avanzado del estado con lógica más estructurada.

### Backend

- **Node.js**: Entorno de ejecución para el servidor.
- **Express**: Framework para la creación de la API RESTful.
- **MongoDB Atlas**: Base de datos NoSQL en la nube para almacenamiento de datos.
- **Mongoose**: ODM para modelar los datos en MongoDB.
- **Stripe**: Plataforma para procesar pagos en línea de forma segura.

### Despliegue

- **Railway**: Plataforma utilizada para el despliegue continuo de la aplicación.

## Instalación y configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tu_usuario/kupan-store.git
   cd kupan-store
   ```

2. **Instala las dependencias del backend**:

   ```bash
   cd backend
   npm install
   ```

3. **Configura las variables de entorno**:

   Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:

   ```env
   PORT=5000
   MONGODB_URI=tu_mongodb_uri
   STRIPE_SECRET_KEY=tu_stripe_secret_key
   ```

4. **Inicia el servidor backend**:

   ```bash
   npm start
   ```

5. **Instala las dependencias del frontend**:

   ```bash
   cd ../frontend
   npm install
   ```

6. **Configura las variables de entorno del frontend**:

   Crea un archivo `.env` en la carpeta `frontend` con las siguientes variables:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_STRIPE_PUBLIC_KEY=tu_stripe_public_key
   ```

7. **Inicia la aplicación frontend**:

   ```bash
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000`.

## Uso

- **Navegación**: Explora las diferentes categorías de productos desde la página principal.
- **Detalles del producto**: Haz clic en un producto para ver su descripción detallada, precio y opciones disponibles.
- **Carrito de compras**: Añade productos al carrito y ajusta las cantidades según tus necesidades.
- **Proceso de pago**: Completa el proceso de pago proporcionando la información requerida y utilizando la integración con Stripe.
- **Cuenta de usuario**: Regístrate o inicia sesión para acceder a tu historial de pedidos y gestionar tu información personal.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. **Fork** el repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección de errores: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commits descriptivos.
4. Envía una **pull request** detallando tus cambios y la razón de ellos.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por visitar Küpan Store! Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.

