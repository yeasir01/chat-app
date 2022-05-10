const loginTypes = {
    SET_EMAIL: "SET_EMAIL",
    SET_PASSWORD: "SET_PASSWORD",
    SET_REMEMBER: "SET_REMEMBER",
    RESET: "RESET",
};

const INITIAL_LOGIN_STATE = {
    email: "mike@example.com",
    password: "password",
    remember: false,
};

const loginReducer = (state, action) => {
    switch (action.type) {
        case loginTypes.SET_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case loginTypes.SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case loginTypes.SET_REMEMBER:
            return {
                ...state,
                remember: action.payload
            };
        case loginTypes.RESET:
            return {
                ...INITIAL_LOGIN_STATE,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

export { INITIAL_LOGIN_STATE, loginReducer, loginTypes };
