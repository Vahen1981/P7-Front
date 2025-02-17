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
        };

      case 'CART':
        return {
          ...globalState,
          cart: action.payload,
        };

      case 'AUTH':
        return {
          ...globalState,
          isAuthenticated: action.payload
        };

      default:
        return globalState;
    }
  };
  

export default UserReducer;


