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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if(error.status === 400){
        return false;
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail")
    localStorage.removeItem("username");
    dispatch({
      type: "LOGOUT",
    });
  };

  const notAuth = (error) => {
    if (error.response && error.response.status === 401) {
      logout();
    } else {
      console.error(error);
    }
  }

  const getUserCart = async (userId) => {
    try {
      const res = await axiosClient.get(`/user/cart/${userId}`);
      if (res.data.cart) {
        dispatch({ type: "CART", payload: res.data.cart });
      } 
      return res.data.cart;
    } catch (error) {
      notAuth(error);
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

  return (
    <UserContext.Provider value={{ login, logout, checkAuthentication, addProductToUserCart, getUserCart, substractProductFromUserCart, deleteProductFromUserCart, notAuth, user: globalState.user, isAuthenticated: globalState.isAuthenticated }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
