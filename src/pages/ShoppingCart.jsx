import { useContext, useState, useEffect } from 'react'
import CartList from '../components/CartList'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

const ShoppingCartPage = () => {
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            navigate('/login'); // Redirige cuando el contador llegue a 0
          }
          return prevCountdown - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <h2 className="text-xl font-semibold mb-4 mt-10 text-center">Carrito de Compras</h2>
          <CartList />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="mt-6">
              <p className="text-xl text-500 mt-0 mb-10">Redirigiendo en:</p>
              <p className="text-8xl font-bold mb-10 text-600">{countdown}</p>
            </div>
            <h2 className="text-2xl font-semibold mb-2 mt-2 text-gray-600">Debe iniciar sesión para ver o</h2>
            <h2 className="text-2xl font-semibold mb-4 mt-2 text-gray-600">añadir artículos a su carrito</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingCartPage;
