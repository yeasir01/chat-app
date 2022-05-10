const registerTypes = {
    SET_FIRST_NAME: "SET_FIRST_NAME",
    SET_LAST_NAME: "SET_LAST_NAME",
    SET_EMAIL: "SET_EMAIL",
    SET_PASSWORD: "SET_PASSWORD",
    SET_PASSWORD_REPEAT: "SET_PASSWORD_REPEAT",
    SET_HANDLE: "SET_HANDLE",
    RESET: "RESET",
};

const INITIAL_REGISTER_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
    handle: "",
};

const registerReducer = (state, action) => {
    switch (action.type) {
        case registerTypes.SET_FIRST_NAME:
            return {
                ...state,
                firstName: action.payload
            };
        case registerTypes.SET_LAST_NAME:
            return {
                ...state,
                lastName: action.payload
            };
        case registerTypes.SET_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case registerTypes.SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case registerTypes.SET_PASSWORD_REPEAT:
            return {
                ...state,
                passwordRepeat: action.payload
            };
        case registerTypes.SET_HANDLE:
            return {
                ...state,
                handle: action.payload
            };
        case registerTypes.RESET:
            return {
                ...INITIAL_REGISTER_STATE,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

export { INITIAL_REGISTER_STATE, registerReducer, registerTypes };