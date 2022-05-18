import create from "zustand";

const initialState = {
    user: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        handle: "",
        avatar: "",
    },
    isAuthenticated: false,
    chats: [],
    messages: [],
    notification: [],
    activeChat: null,
    isConnected: false,
    snackbar: {
        isOpen: false,
        message: "",
        severity: "success",
        duration: null,
    },
};

const useStore = create((set, get) => ({
    ...initialState,
    setAuthUser(USER) {
        set((state) => ({
            ...state,
            isAuthenticated: true,
            user: USER,
        }));
    },
    updateAuthUser(USER) {
        set((state) => ({
            ...state,
            isAuthenticated: true,
            user: { ...state.user, ...USER },
        }));
    },
    logout() {
        set((_state) => initialState);
    },
    openSnackbar(CONFIG) {
        set((state) => ({
            ...state,
            snackbar: {
                ...state.snackbar,
                isOpen: true,
                ...CONFIG,
            },
        }));
    },
    closeSnackbar() {
        set((state) => ({
            ...state,
            snackbar: {
                ...initialState.snackbar,
            },
        }));
    },
    setIsConnected(VALUE) {
        set((state) => ({
            ...state,
            isConnected: VALUE,
        }));
    },
    setChats(CHATS) {
        set((state) => ({
            ...state,
            chats: CHATS,
        }));
    },
    addChat(NEW_CHAT) {
        set((state) => ({
            ...state,
            chats: [...state.chats, NEW_CHAT],
        }));
    },
    updateChat(CHAT_OBJ) {
        if (!CHAT_OBJ.id) return;

        set((state) => ({
            ...state,
            chats: state.chats.map((item) =>
                item.id === CHAT_OBJ.id ? { ...item, ...CHAT_OBJ } : item
            ),
        }));
    },
    deleteChat(CHAT_ID) {
        if (CHAT_ID === 0) return;

        set((state) => ({
            ...state,
            chats: state.chats.filter((cht) => cht.id !== CHAT_ID),
        }));
    },
    setActiveChat(ID) {
        set((state) => ({
            ...state,
            activeChat: ID,
        }));
    },
    setMessages(MESSAGES) {
        set((state) => ({
            ...state,
            messages: MESSAGES,
        }));
    },
    addMessage(MESSAGE) {
        if (!MESSAGE.chatId) return;

        set((state) => {
            const chatIndex = state.chats.findIndex(
                (elm) => elm.id === MESSAGE.chatId
            );
                
            if (state.activeChat === MESSAGE.chatId) {
                return {
                    ...state,
                    messages: [...state.messages, MESSAGE],
                    //chats: ([...state.chats][chatIndex].messages = [MESSAGE])
                };
            } else {
                return {
                    ...state,
                    //chats: ([...state.chats][chatIndex].messages = [MESSAGE]),
                };
            }
        });
    },
}));

export default useStore;
