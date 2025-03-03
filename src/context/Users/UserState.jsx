import { useEffect, useReducer } from "react";
import UserContext from "./UserContext";
import axiosClient from "../../config/axios";
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
    sessionURL: null
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
    addTokenToHeaders();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post("/user/login", { email, password });  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("username", response.data.username);

        console.log("Usuario: ", response.data.username);
        console.log("Id: ", response.data.id);
        console.log("Email: ", response.data.email);
  
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
    localStorage.removeItem("cart");
    dispatch({
      type: "LOGOUT",
    });
  };

  const addTokenToHeaders = () => {
    const token = localStorage.getItem('token');
    if (token) {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token
    } else {
      delete axiosClient.defaults.headers.common['Authorization']
    }
  }

  const verifyingToken = async () => {
    addTokenToHeaders();
    try {
        const res = await axiosClient.get('/user/verify-user');
        dispatch({
            type: 'OBTENER_USUARIO',
            payload: {
              id: res.data.user._id,
              email: res.data.user.email,
              username: res.data.user.username,
            },
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }

  const notAuth = (error) => {
    if (error.response && error.response.status === 401) {
      logout();
    } else {
      console.error(error);
    }
  }

  const verifyPassword = async (password, id) => {
    addTokenToHeaders();
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
    addTokenToHeaders();
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

  const getUserCart = async (userId) => {
    addTokenToHeaders();
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

  const addProductToUserCart = async (userId, productId, stripeProductId) => {
    addTokenToHeaders();
    try {
      const res = await axiosClient.put("/user/addToCart", { userId, productId, stripeProductId });
      dispatch({ type: "CART", payload: res.data.cart });
      return true;
    } catch (error) {
      notAuth(error);
      return false;
    }
  };

  const substractProductFromUserCart = async (userId, productId) => {
    addTokenToHeaders();
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
    addTokenToHeaders();
    try {
      const res = await axiosClient.put("/user/removeProduct", { userId, productId });
      dispatch({ type: "CART", payload: res.data.cart });
      return true;
    } catch (error) {
      notAuth(error);
      return false;
    }
  };

  const checkoutSession = async (userId) => {
    addTokenToHeaders();
    try{
      const res = await axiosClient.post("/checkout", { userId } );

      if (res.data.cart) {
        localStorage.setItem("cart", JSON.stringify(res.data.cart));
        dispatch({ type: "CART", payload: res.data.cart });
      } else {
        localStorage.setItem("cart", JSON.stringify(globalState.cart));
      }

      dispatch({
        type: 'CHECKOUT_SESSION',
        payload: res.data.session_url
      })

    } catch (error){
      console.error(error);
    }
  }

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
        checkoutSession, 
        notAuth, 
        user: globalState.user, 
        cart: globalState.cart,
        isAuthenticated: globalState.isAuthenticated,
        sessionURL: globalState.sessionURL
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
