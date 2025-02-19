import { useContext, useState, useEffect } from 'react'
import CartList from '../components/CartList'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';

const ShoppingCartPage = () => {
  const { isAuthenticated, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const[showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        logout();
        navigate('/login');
      }, 2000);
    }
  }, [ isAuthenticated ]);

  return (
    <>
      {showPopup && <Popup message={"No ha iniciado sesión, o su tiempo de sesión a expirado"} />}
      {isAuthenticated ? (
        <>
          <h2 className="text-xl font-semibold mb-4 mt-10 text-center">Carrito de Compras</h2>
          <CartList />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ShoppingCartPage;
