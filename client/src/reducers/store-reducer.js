const types = {
    SET_USER: "SET_USER",
    UPDATE_USER: "UPDATE_USER",

    ADD_CHAT: "ADD_CHAT",
    DELETE_CHAT: "DELETE_CHAT",
    UPDATE_CHAT: "UPDATE_CHAT",
    SET_CHATS: "SET_CHATS",

    ADD_CHAT_MEMBER: "ADD_CHAT_MEMBER",
    DELETE_CHAT_MEMBER: "DELETE_CHAT_MEMBER",
    UPDATE_CHAT_MEMBER: "UPDATE_CHAT_MEMBER",
    SET_CHAT_MEMBER: "SET_CHAT_MEMBER",

    ADD_NOTIFICATION: "ADD_NOTIFICATION",
    DELETE_NOTIFICATION: "DELETE_NOTIFICATION",
    UPDATE_NOTIFICATION: "UPDATE_NOTIFICATION",
    SET_NOTIFICATIONS: "SET_NOTIFICATIONS",

    ADD_MESSAGE: "ADD_MESSAGE",
    DELETE_MESSAGE: "DELETE_MESSAGE",
    UPDATE_MESSAGE: "UPDATE_MESSAGE",
    SET_MESSAGES: "SET_MESSAGES",

    SET_ACTIVE_CHAT: "SET_ACTIVE_CHAT",
    DELETE_ACTIVE_CHAT: "DELETE_ACTIVE_CHAT",
    
    SET_CONNECTED: "SET_CONNECTED",

    OPEN_SNACKBAR: "OPEN_SNACKBAR",
    CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
    
    RESET_STATE: "RESET",
};

const INITIAL_STATE = {
    user: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        handle: "",
        avatar: ""
    },
    isAuthenticated: false,
    chats: [],
    members: [],
    notifications: [],
    messages: [],
    activeChatId: null,
    isConnected: false,
    snackbar: {
        isOpen: false,
        message: "",
        severity: "info",
        duration: null
    },
};

const updatedRecord = (prevState, payload) => {
    const idx = prevState.findIndex(item => item.id === payload.id);
    if (idx === -1) return prevState;

    const state = [...prevState];
    state[idx] = {...state[idx], ...payload};

    return state;
};

const removeRecord = (prevState, payload) => {
    return prevState.filter(item=> item.id !== payload.id);
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case types.UPDATE_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: {...state.user, ...action.payload},
            };
        case types.ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, action.payload],
            };
        case types.DELETE_CHAT:
            return {
                ...state,
                activeChatId: null,
                chats: removeRecord(state.chats, action.payload),
            };
        case types.UPDATE_CHAT:
            return {
                ...state,
                chats: updatedRecord(state.chats, action.payload),
            };
        case types.SET_CHATS:
            return {
                ...state,
                chats: action.payload,
            };
        case types.SET_ACTIVE_CHAT:
            return {
                ...state,
                activeChatId: action.payload,
            };


        case types.SET_CONNECTED:
            return {
                ...state,
                isConnected: action.payload
            };
        case types.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        case types.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };
        
        case types.OPEN_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    ...state.snackbar,
                    ...action.payload,
                    isOpen: true
                },
            };
        case types.CLOSE_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    ...INITIAL_STATE.snackbar
                },
            };
            
        case types.RESET_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export { types, INITIAL_STATE, reducer };
