# Küpan Store / Proyecto 7 App Fullstack de comercio electrónico

**Küpan Store** es una aplicación web fullstack para una tienda en línea, diseñada para ofrecer todas las funcionalidades esenciales del comercio electrónico. Los usuarios pueden explorar productos organizados por categorías, agregarlos al carrito de compras y completar sus pagos de manera segura. Además, cuenta con un sistema de autenticación de usuarios gestionado desde el backend.

Para ver el sitio desplegado en la web, visita el siguiente enlace: link

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

Para ejecutar el proyecto en tu entorno local descarga y sigue las instrucciones listadas abajo.

### Backend
Descarga y sigue las instrucciones del backend aquí: link

### Frontend

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/Vahen1981/P7-Front.git
   cd P7-Front
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:

   Crea un archivo `.env` en la carpeta raíz con las siguientes variables:

   ```env
   VITE_BACKEND_URL=http://localhost:8000/api
   ```

4. **Inicia la aplicación frontend**:

   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173`.

## Uso

- **Navegación**: Explora las diferentes categorías de productos desde la página principal.
- **Detalles del producto**: Haz clic en "mas detalles..." de un producto para ver su descripción detallada, rating y precio.
- **Regístrate e inicia sesión**: Crea tu usuario para acceder a las opciones que requieren privilegios, como el carrito de compras, gestión de datos de usuario, etc.
- **Carrito de compras**: Añade productos al carrito y ajusta las cantidades según tus necesidades.
- **Proceso de pago**: Completa el proceso de pago proporcionando la información requerida y utilizando la integración con Stripe. Para testear puedes usar la tarjet `4242 4242 4242 4242`

