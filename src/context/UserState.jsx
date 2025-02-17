import { useReducer } from "react";
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

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post("/user/login", { email, password });  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
  
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
  
  const addProductToUserCart = async (userId, productId) => {
    try {
      const res = await axiosClient.put("/user/addToCart", {userId, productId})
      dispatch({ type: "CART", payload: res.data.cart });
    } catch (error){
      console.error(error);
    }
  }

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
    <UserContext.Provider value={{ login, logout, checkAuthentication, addProductToUserCart, user: globalState.user, isAuthenticated: globalState.isAuthenticated }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
