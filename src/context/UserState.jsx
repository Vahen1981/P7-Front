import { useEffect, useReducer } from "react";
import UserContext from "./UserContext";
import axiosClient from "../config/axios";
import UserReducer from "./UserReducer";

const UserState = (props) => {
  const initialState = {
    user: {
      id: null,
      email: null,
      username: null,
      token: null,
      cart: []
  },
    isAuthenticated: false,
  };

  const [globalState, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      const userId = localStorage.getItem("userId");
      const userEmail = localStorage.getItem("userEmail");
      const userUsername = localStorage.getItem("username");
  
      if (userId && userEmail && userUsername) {
        dispatch({
          type: "LOGIN",
          payload: {
            token: userToken,
            id: userId,
            email: userEmail,
            username: userUsername,
          },
        });
  
        dispatch({
          type: "AUTH",
          payload: true,
        });
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post("/user/login", { email, password });  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("username", response.data.username);
  
        dispatch({
          type: "LOGIN",
          payload: {
            token: response.data.token,
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
          },
        });
        dispatch({
          type: "AUTH",
          payload: true
        });
        alert("Inicio de sesión exitoso");
      } else {
        alert("El inicio de sesión falló: No se recibió token");
      }
  
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    const wasAuthenticated = globalState.isAuthenticated;
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
    if(wasAuthenticated){
      window.location.reload();
    }
  };

  const notAuth = (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("username");

      dispatch({ type: "AUTH", payload: false });
      window.location.href = "/login";
    } else {
      console.error(error);
    }
  }

  const getUserCart = async (userId) => {
    try {
      const res = await axiosClient.get(`/user/cart/${userId}`);
      if (res.data.cart) {
        dispatch({ type: "CART", payload: res.data.cart });
      } else {
        console.warn("La respuesta no contiene 'cart'");
      }
      return res.data.cart;
    } catch (error) {
      notAuth(error);
      console.error("Error al obtener el carrito:", error);
      return error;
    }
  };
  
  const addProductToUserCart = async (userId, productId) => {
    try {
      const res = await axiosClient.put("/user/addToCart", { userId, productId });
      dispatch({ type: "CART", payload: res.data.cart });
      return true;
    } catch (error) {
      notAuth(error);
      return false;
    }
  };

  const substractProductFromUserCart = async (userId, productId) => {
    try {
      const res = await axiosClient.put("/user/removeQuantity", { userId, productId });
      dispatch({ type: "CART", payload: res.data.cart });
      return true;
    } catch (error) {
      notAuth(error);
      return false;
    }
  };

  const deleteProductFromUserCart = async (userId, productId) => {
    try {
      const res = await axiosClient.put("/user/removeProduct", { userId, productId });
      dispatch({ type: "CART", payload: res.data.cart });
      return true;
    } catch (error) {
      notAuth(error);
      return false;
    }
  };

  const checkAuthentication = async () => {
    try {
      const response = await axiosClient.get("/user/verify", {
        headers: {
          Authorization: `Bearer ${globalState.user.token}`,
        },
      });
      if(response.status === 200){
        dispatch({ type: "AUTH", payload: true });
        return true;
      } 
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      dispatch({ type: "AUTH", payload: false });
    }
  };

  return (
    <UserContext.Provider value={{ login, logout, checkAuthentication, addProductToUserCart, getUserCart, substractProductFromUserCart, deleteProductFromUserCart, notAuth, user: globalState.user, isAuthenticated: globalState.isAuthenticated }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
