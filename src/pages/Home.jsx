import logo from '../img/logo-color.png'
import bg from '../img/bg.png'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col items-center justify-center w-[100vw] h-[calc(100vh-80px)] " /* h-[calc(100vh-80px)] */
            style={{
                backgroundImage: `url(${bg})`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
                <img src={logo} alt="Logo" className="w-100 h-auto"/>
                <h1 className="text-4xl lg:text-6xl text-black font-bold ml-3">Küpan Store</h1>
                <p className="text-black font-bold text-md lg:text-lg text-center mt-10 max-w-2xl">
                    ¡Bienvenido a Küpan Store! Explora nuestra exclusiva selección de ropa para hombres y mujeres, 
                    joyería elegante y lo último en electrónica. Encuentra estilo, calidad y tecnología en un solo lugar.  
                    Ofrecemos novedades cada semana, envíos rápidos y productos de alta calidad.  
                    Descubre lo mejor para tu estilo hoy. ¡Compra ahora!
                </p>
                <button 
                    className="mt-10 mb-10 px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => navigate('/allproducts')}>
                    Comenzar
                </button>
        </div>
    )
}

export default Home
