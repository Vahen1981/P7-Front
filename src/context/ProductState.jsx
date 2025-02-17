import { useReducer } from "react";
import ProductContext from "./ProductContext";
import productReducer from "./ProductReducer";
import axiosClient from "../config/axios";

const ProductState = (props) => {
    const initialState = {
        products: [],
    };

    const [globalState, dispatch] = useReducer(productReducer, initialState);

    const getAllProducts = async () => {
        try {
            const res = await axiosClient.get('/products/all');
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data.products
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getProductById = async (id) => {
        try {
            const res = await axiosClient.get(`/products/${id}`);
            console.log("Product fetched:", res.data);
            dispatch({
                type: "GET_PRODUCT",
                payload: res.data
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const getMenClothing = async () => {
        try {
            const res = await axiosClient.get('/products/category/menclothes');
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data.products
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getWomenClothing = async () => {
        try {
            const res = await axiosClient.get('/products/category/womenclothes');
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data.products
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getJewelery = async () => {
        try {
            const res = await axiosClient.get('/products/category/jewelery');
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data.products
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getElectronics = async () => {
        try {
            const res = await axiosClient.get('/products/category/electronics');
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data.products
            });
        } catch (error) {
            console.log(error);
        }
    };

    const subtractQuantity = async (id) => {
        try {
            await axiosClient.put(`/products/quantity/subtract/${id}`);
            getProductById(id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductContext.Provider value={{ globalState, getAllProducts, getProductById, getMenClothing, getWomenClothing, getJewelery, getElectronics, subtractQuantity }}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductState;