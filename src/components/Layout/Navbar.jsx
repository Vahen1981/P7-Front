import { useState, useRef, useCallback, useEffect, useContext } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/Users/UserContext";
import Popup from "../Popup/Popup";
import logo from '../../assets/img/logo.png';

export default function Navbar() {
  const { user, isAuthenticated, logout, cart, getUserCart } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [numCartItems, setNumCartItems] = useState(null);
  

  const handleClickOutside = useCallback((event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setUserMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const logingOut = () => {
    setPopupMessage("Se ha cerrado su sesión");
    setShowPopup(true);
    setNumCartItems(null);
    setTimeout(() => {
      setShowPopup(false);
      setUserMenuOpen(false);
      logout();
      navigate('/login');
    }, 2000);
  }

  useEffect(() => {
    if(cart){
      let totalQuantity = 0;
      for(let i = 0 ; i < cart.length ; i++){
        totalQuantity = totalQuantity + (1 * cart[i].quantity);
      }
      setNumCartItems(totalQuantity);
    }
  }, [cart]);

  useEffect(() => {
    const getCart = async () => {
      await getUserCart(user.id);
    }
    getCart();
  }, [user.id]);

  return (
    <nav className="bg-blue-600 p-2 text-white relative z-60">
      {showPopup && <Popup message={popupMessage} />}
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-row items-center">
          <img src={logo} alt="Logo" className="w-16 h-auto cursor-pointer" onClick={() => navigate('/')}/>
          <h1 className="text-xl font-bold ml-3 hidden md:block"></h1>
        </div>
        
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul
          className={`md:flex md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent transition-all ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="p-2 md:p-0">
            <Link to="/all-products" className="block" onClick={() => setIsOpen(false)}>Todos los productos</Link>
          </li>
          <li className="p-2 md:p-0">
            <Link to="/men" className="block" onClick={() => setIsOpen(false)}>Ropa de Hombre</Link>
          </li>
          <li className="p-2 md:p-0">
            <Link to="/women" className="block" onClick={() => setIsOpen(false)}>Ropa de Mujer</Link>
          </li>
          <li className="p-2 md:p-0">
            <Link to="/jewelery" className="block" onClick={() => setIsOpen(false)}>Joyería</Link>
          </li>
          <li className="p-2 md:p-0">
            <Link to="/electronics" className="block" onClick={() => setIsOpen(false)}>Electrónica</Link>
          </li>
        </ul>
        <div className="flex space-x-4 items-center user-menu" ref={userMenuRef}>
          <Link to="/cart" className="flex items-center relative" onClick={() => console.log("Autenticado: ", isAuthenticated)}>
            <ShoppingCart size={24} />
            {numCartItems > 0 && (
              <p className="absolute top-4 left-5 bg-red-500 text-white text-xs px-1 py-0 rounded-full">{numCartItems}</p>
            )}
          </Link>

          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setUserMenuOpen(!userMenuOpen);
            }}
            className="flex items-center space-x-2"
          >
            <User size={24} />
            <span>{isAuthenticated ? user?.username : "Sesión no iniciada"}</span>
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 top-10 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden">
              {isAuthenticated ? (
                <>
                  <button className="block px-4 py-2 hover:bg-gray-200 w-48 text-right" 
                    onClick={() => {
                      navigate('/userProfile');
                      setUserMenuOpen(false);
                      }
                    }
                  >
                    Administrar cuenta
                  </button>
                  <button className="block px-4 py-2 hover:bg-gray-200 w-48 text-right" onClick={() => logingOut()}>Cerrar sesión</button>
                </>
              ) : (
                <>
                  <Link to="/register" className="block px-4 py-2 hover:bg-gray-200 w-48 text-right" onClick={() => setUserMenuOpen(false)}>Registrarse</Link>
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-200 w-48 text-right" onClick={() => setUserMenuOpen(false)}>Iniciar sesión</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
