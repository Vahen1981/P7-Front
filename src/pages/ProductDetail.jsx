import { useContext, useEffect, useState } from "react";
import ProductContext from "../context/ProductContext";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import Popup from "../components/Popup";

const ProductDetail = () => {
    const { id } = useParams();
    const { getProductById } = useContext(ProductContext);
    const { user, isAuthenticated, addProductToUserCart} = useContext(UserContext);
    const [productInfo, setProductInfo] = useState(null);
    const [rating, setRating] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const getProductInfo = async () => {
        const info = await getProductById(id);
        setProductInfo(info);
        setRating(getRatingStar(info.product.rating.rate));
    }

    const getRatingStar = (rate) => {
        const rating = parseFloat(rate);
        if(rating >= 4.5){
            return "★★★★★";
        }
        if(rating >= 3.5 && rating <= 4.4){
            return "★★★★☆";
        }
        if(rating >= 2.5 && rating <= 3.4){
            return "★★★☆☆";
        }
        if(rating >= 1.5 && rating <= 2.4){
            return "★★☆☆☆";
        }
        if(rating >= 0.5 && rating <= 1.4){
            return "★☆☆☆☆";
        }
        if(rating <= 0.4){
            return "☆☆☆☆☆";
        }
    }

    const addToCart = async (productId) => {
        await addProductToUserCart(user.id, productId);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    useEffect(() => {
        getProductInfo();
    }, [id]);


    useEffect(() =>{
        if(isAuthenticated){
        setPopupMessage("Producto añadido al carrito");
        }
        else {
        setPopupMessage("Debe iniciar sesión para añadir productos al carrito");
        }
    }, [isAuthenticated]);

    if (!productInfo) {
        return <div>Loading...</div>;
    }
  
    return (
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
            {showPopup && <Popup message={popupMessage} />}
            <div className="w-full md:w-1/2">
                <img
                src={productInfo.product.image}
                alt={productInfo.product.title}
                className="w-full rounded-lg"
                />
            </div>

            <div className="w-full md:w-1/2">
                <h1 className="text-3xl font-bold">{productInfo.product.title}</h1>
                <p className="text-4xl text-gray-700 mt-2">${productInfo.product.price}</p>
                <div className="flex mt-2">
                    <span className="text-yellow-500 text-4xl">{rating}</span>
                </div>
                <p className="mt-4 text-gray-600">{productInfo.product.description}</p>

                <button className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg w-full text-lg font-semibold hover:bg-blue-700"
                    onClick={() => addToCart(productInfo.product._id)}>
                    Agregar al carrito
                </button>

            </div>
        </div>
    );
    };

export default ProductDetail;
