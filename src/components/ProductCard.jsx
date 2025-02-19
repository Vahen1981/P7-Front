import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Popup from "../components/Popup"; 

const ProductCard = ({ product }) => {
  const { addProductToUserCart, user } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = async (productId) => {
    const res = await addProductToUserCart(user.id, productId);
    if (res) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // Oculta el popup después de 2 segundos
    }
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col h-full">
      {showPopup && <Popup message="Producto añadido al carrito" />}
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
