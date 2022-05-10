
const types = {
    ADD_CHAT: "ADD_CHAT",
    DELETE_CHAT: "DELETE_CHAT",
    UPDATE_CHAT: "UPDATE_CHAT",
    SET_CHATS: "SET_CHATS",
    SET_ACTIVE_CHAT: "SET_ACTIVE_CHAT",
    DELETE_ACTIVE_CHAT: "DELETE_ACTIVE_CHAT",
    SET_CONNECTED: "SET_CONNECTED",
    RESET: "RESET"
};

const INITIAL_STATE = {
    chats: [],
    chatMembers: [],
    users: [],
    messages: [],
    activeChatID: null,
    connected: false,
};

function updateRecord(prevState, payload){
    const idx = prevState.findIndex(item=> item.id === payload.id);
    if (idx === -1) return prevState;
    
    const state = [...prevState];
    state[idx] = {...prevState[idx], ...payload};
    return state;
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_CHAT":
            return {
                ...state,
                chats: [...state.chats, ...action.payload]
            };
        case "DELETE_CHAT":
            return {
                ...state,
                chats: state.chats.filter(item => item.id !== action.payload.id)
            };
        case "UPDATE_CHAT":
            return {
                ...state,
                chats: updateRecord(state.chats, action.payload)
            };
        default:
            return state;
    }
}

export {types, INITIAL_STATE, reducer};