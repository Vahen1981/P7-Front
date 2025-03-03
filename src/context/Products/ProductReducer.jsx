const productReducer = (globalState, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return {
                ...globalState,
                products: action.payload
            };

        case "GET_PRODUCT":
            return {
                ...globalState,
                products: [...globalState.products, action.payload], 
            };

        default:
            return globalState;
    }
};

export default productReducer;