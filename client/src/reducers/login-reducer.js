const loginTypes = {
    SET_EMAIL: "SET_EMAIL",
    SET_PASSWORD: "SET_PASSWORD",
    SET_REMEMBER: "SET_REMEMBER",
    SET_ERRORS: "SET_ERRORS",
    RESET: "RESET",
};

const INITIAL_LOGIN_STATE = {
    values: {
        email: "mike@example.com",
        password: "password",
        remember: false,
    },
    errors: {
        email: "",
        password: "",
        remember: "",
    }
};

const loginReducer = (state, action) => {
    switch (action.type) {
        case loginTypes.SET_EMAIL:
            return {
                values: {
                    ...state.values,
                    email: action.payload
                },
                errors: {
                    ...state.errors,
                    email: ""
                }
            };
        case loginTypes.SET_PASSWORD:
            return {
                values: {
                    ...state.values,
                    password: action.payload
                },
                errors: {
                    ...state.errors,
                    password: ""
                }
            };
        case loginTypes.SET_REMEMBER:
            return {
                values: {
                    ...state.values,
                    password: action.payload
                },
                errors: {
                    ...state.errors,
                    remember: ""
                }
            };
        case loginTypes.SET_ERRORS:
            return {
                ...state,
                errors: {
                    ...action.payload
                }
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
