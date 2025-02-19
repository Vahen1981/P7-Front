import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Popup from "../components/Popup"; 

const ProductCard = ({ product }) => {
  const { addProductToUserCart, user, isAuthenticated } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const addToCart = async (productId) => {
    await addProductToUserCart(user.id, productId);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  useEffect(() =>{
    if(isAuthenticated){
      setPopupMessage("Producto añadido al carrito");
    }
    else {
      setPopupMessage("Debe iniciar sesión para añadir productos al carrito");
    }
  }, [isAuthenticated]);

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col h-full">
      {showPopup && <Popup message={popupMessage} />}
      <img className="w-full h-64 object-cover rounded-lg mb-4" src={product.image} alt={product.title} />
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="mt-auto flex justify-between items-center">
        <span className="text-xl font-bold">${product.price}</span>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => addToCart(product._id)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
