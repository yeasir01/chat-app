import React, { createContext, useReducer } from "react";
import chatsReducer, { INITIAL_CHAT_STATE } from "../reducers/chats-reducer.js";

const StoreContext = createContext();

const ContextStore = ({children}) => {
    const [chats, dispatch] = useReducer(chatsReducer, INITIAL_CHAT_STATE);

    return (
        <StoreContext.Provider>
            {children}
        </StoreContext.Provider>
    );
};

export default ContextStore;
