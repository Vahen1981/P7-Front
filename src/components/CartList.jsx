import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import ProductContext from "../context/ProductContext";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const CartList = () => {
  const { getUserCart, user, addProductToUserCart, substractProductFromUserCart, deleteProductFromUserCart } = useContext(UserContext);
  const { getProductById } = useContext(ProductContext);
  const [productsInCart, setProductsInCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCart = async () => {
    const res = await getUserCart(user.id);
    if (res) {
        const updatedCart = await Promise.all(
          res.map(async (item) => {
            const productList = await getProductById(item.productId);
            if (productList) {
              setLoading(false);
              return {
                ...item,
                title: productList.product.title,
                image: productList.product.image,
                price: productList.product.price,
              };
            } else {
              return null;
            }
          })
        );
      setProductsInCart(updatedCart.filter((item) => item !== null));
      }
  };

  useEffect(() => {
    if (user?.id) {
      getCart();
    }
  }, [user.id]);


  const totalPrice = productsInCart.reduce(
    (total, product) => total + (product.price * product.quantity),
    0
  ).toFixed(2);


  const handleQuantityChange = async (productId, change) => {
    let ok = false;
    if (change === -1) {
      ok = await substractProductFromUserCart(user.id, productId);
    } else if (change === 1) {
      ok = await addProductToUserCart(user.id, productId);
    }
  
    if (ok) {
      setProductsInCart((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId
            ? { ...product, quantity: product.quantity + change }
            : product
        )
      );
    } else {
      console.error("Error al actualizar la cantidad");
    }
  };

  const handleRemoveProduct = async (productId) => {
    const ok = await deleteProductFromUserCart(user.id, productId);
    if(ok){
      setProductsInCart((prevProducts) =>
        prevProducts.filter((product) => product.productId !== productId)
      );
    }
    else {
      console.error("Error al eliminar elemento");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center">
        <Loader2 className="w-20 h-20 animate-spin text-blue-500" />
      </div>
    );
  }  

  return (
    <div className="max-w-full lg:max-w-[55%] mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="space-y-4">
          {productsInCart.length > 0 ? (
            productsInCart.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-300 py-4 text-sm"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-10 h-10 object-cover rounded cursor-pointer"
                  onClick={() => {navigate(`/productDetail/${product.productId}`)}}
                />

                <div className="flex-1 ml-4">
                  <h3 className="text-sm font-medium hover:text-blue-500 flex items-center cursor-pointer" 
                  onClick={() => {navigate(`/productDetail/${product.productId}`)}}>
                    {product.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(product.productId, -1)}
                    disabled={product.quantity <= 1}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-xs"
                  >
                    -
                  </button>
                  <span className="text-sm">{product.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(product.productId, 1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-xs"
                  >
                    +
                  </button>
                </div>

                <div className="w-30 font-semibold text-sm text-right">
                  ${product.price * product.quantity}
                </div>

                <button
                    onClick={() => handleRemoveProduct(product.productId)}
                    className="ml-4 text-black-500 hover:text-red-700"
                >
                    <Trash size={18} />
                </button>
              </div>
            ))
          ) : (
            <p>El carrito está vacío</p>
          )}
        </div>

        {productsInCart.length > 0 && (
        <div className="mt-6">
            <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${totalPrice}</span>
            </div>
            <button className="w-32 mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ml-auto block">
            Comprar
            </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default CartList;
