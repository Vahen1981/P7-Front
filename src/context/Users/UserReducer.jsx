const UserReducer = (globalState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
            ...globalState,
            user: {
                id: action.payload.id,
                email: action.payload.email,
                username: action.payload.username,
                token: action.payload.token,
            },
            isAuthenticated: true,
        };

      case 'LOGOUT':
        return {
          ...globalState,
          user: {
            id: null,
            email: null,
            username: null,
            token: null,
          },
          isAuthenticated: false,
          cart: null
        };

      case 'CART':
        return {
          ...globalState,
          cart: action.payload,
        };

      case "OBTENER_USUARIO":
        return {
            ...globalState,
            user: {
              id: action.payload.id,
              email: action.payload.email,
              username: action.payload.username,
          },
            isAuthenticated: true,
            cart: globalState.cart,
        }

      case 'AUTH':
        return {
          ...globalState,
          isAuthenticated: action.payload,
          cart: globalState.cart,
        };

      case 'UPDATE':
        return {
          ...globalState,
          user: {
            ...globalState.user, // Mantiene los datos previos
            email: action.payload.email,
            username: action.payload.username,
          },
        };

      case 'CHECKOUT_SESSION':
        return {
          ...globalState,
          sessionURL: action.payload,
        };

      default:
        return globalState;
    }
  };
  

export default UserReducer;


