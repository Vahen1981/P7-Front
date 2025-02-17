import { useState, useRef, useCallback, useEffect, useContext } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Navbar() {
  const { user, isAuthenticated } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

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

  return (
    <nav className="bg-blue-600 p-4 text-white relative">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Tienda</h1>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul
          className={`md:flex md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent transition-all ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="p-2 md:p-0">
            <Link to="/" className="block" onClick={() => setIsOpen(false)}>Todos los productos</Link>
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
        <div className="flex space-x-4 items-center relative user-menu" ref={userMenuRef}>
          <Link to="#" className="flex items-center"><ShoppingCart size={24} /></Link>
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
                <button className="block px-4 py-2 hover:bg-gray-200">Cerrar sesión</button>
              ) : (
                <>
                  <Link to="/register" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setUserMenuOpen(false)}>Registrarse</Link>
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setUserMenuOpen(false)}>Iniciar sesión</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
