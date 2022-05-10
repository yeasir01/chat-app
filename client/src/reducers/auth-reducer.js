const authTypes = {
    SET_USER: "SET_USER",
    RESET: "RESET",
};

const INITIAL_AUTH_STATE = {
    user: {
        firstName: "",
        lastName: "",
        email: "",
        handle: "",
        id: null,
    },
    isAuthenticated: false,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case authTypes.SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case authTypes.RESET:
            return {
                ...INITIAL_AUTH_STATE,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

export { INITIAL_AUTH_STATE, authReducer, authTypes };
