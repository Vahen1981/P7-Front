import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CartList from '../../components/Cart/CartList'
import UserContext from '../../context/Users/UserContext'
import Popup from '../../components/Popup/Popup';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const ShoppingCartPage = () => {
  const { verifyingToken, isAuthenticated, logout, sessionURL } = useContext(UserContext);
  const navigate = useNavigate();
  const[showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const auth = async () => {
      const isAuth = await verifyingToken();
      if (!isAuth) {
        setShowPopup(true);
        setTimeout(() => {
        setShowPopup(false);
        logout();
        navigate('/login');
        }, 2000);
      }
    }
    auth();
  }, []);

  useEffect(() => {
    if (sessionURL) window.location.href = sessionURL;
  }, [sessionURL]);

  return (
    <>
      <ErrorBoundary>
        {showPopup && <Popup message={"No ha iniciado sesión, o su tiempo de sesión a expirado"} />}
          {isAuthenticated ? (
            <div className="min-h-[70vh]">
              <h2 className="text-xl font-semibold mb-4 mt-10 text-center">Carrito de Compras</h2>
              <CartList />
            </div>
          ) : (
            <></>
          )}
      </ErrorBoundary>
    </>
  );
}

export default ShoppingCartPage;
