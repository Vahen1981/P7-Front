import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import ProductContext from "../context/ProductContext";
import { Trash } from "lucide-react";

const CartList = () => {
  const { getUserCart, user, substractProductFromUserCart } = useContext(UserContext);
  const { getProductById } = useContext(ProductContext);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      const cart = await getUserCart(user.id);
      if (cart) {
        const updatedCart = await Promise.all(
          cart.map(async (item) => {
            const productList = await getProductById(item.productId);
            if (productList) {
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

    if (user.id) {
      getCart();
    }
  }, [user.id]);

  const handleQuantityChange = async (productId, change) => {
    setProductsInCart((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? {
              ...product,
              quantity: product.quantity + change,
            }
          : product
      )
    );
    if(change === -1){
        await substractProductFromUserCart(user.id, productId); 
    }
  };

  const handleRemoveProduct = (productId) => {
    setProductsInCart((prevProducts) =>
      prevProducts.filter((product) => product.productId !== productId)
    );
  };

  const totalPrice = productsInCart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

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
                {/* Imagen */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-10 h-10 object-cover rounded"
                />

                {/* Título */}
                <div className="flex-1 ml-4">
                  <h3 className="text-sm font-medium">{product.title}</h3>
                </div>

                {/* Cantidad y botones */}
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

                {/* Precio */}
                <div className="w-30 font-semibold text-sm text-right">
                  ${product.price * product.quantity}
                </div>

                <button
                    onClick={() => handleRemoveProduct(product.productId)}
                    className="ml-4 text-red-500 hover:text-red-700"
                >
                    <Trash size={18} />
                </button>
              </div>
            ))
          ) : (
            <p>El carrito está vacío</p>
          )}
        </div>

        {/* Total y botón de compra */}
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
