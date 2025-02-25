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
    },
    cart: [],
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

        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
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

  const verifyingToken = async () => {
    const token = localStorage.getItem('token');

    if (token) {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token
    } else {
        delete axiosClient.defaults.headers.common['Authorization']
    }
    try {
        const res = await axiosClient.get('/user/verify');
        console.log('respuesta del verificar usuario', res);
        dispatch({
            type: 'OBTENER_USUARIO',
            payload: res.data.user
        })
    } catch (error) {
        console.log(error);
    }
  }

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

  const verifyPassword = async (password, id) => {
    try{
      const res = await axiosClient.post(`/user/verify/${id}`, { password });
      if(res.status === 200){
        return true;
      }
      else {
        return false
      }
    } catch (error){
      console.error(error);
      return false;
    }
  }

  const updateUserData = async (userData) => {
    try {
      const res = await axiosClient.put("/user/update", userData);
      if(res){
        dispatch({ type: "UPDATE", 
          payload: {
            email: res.data.email,
            username: res.data.username
          },
        })
        localStorage.setItem("userEmail", res.data.email);
        localStorage.setItem("username", res.data.username);
        return(res);
      }

    } catch (error) {
      console.error(error);
      return (error);
    }
  }

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
    <UserContext.Provider value={{ 
        login, 
        logout,
        verifyingToken,
        verifyPassword,
        updateUserData, 
        addProductToUserCart, 
        getUserCart, 
        substractProductFromUserCart, 
        deleteProductFromUserCart, 
        notAuth, 
        user: globalState.user, 
        isAuthenticated: globalState.isAuthenticated 
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
