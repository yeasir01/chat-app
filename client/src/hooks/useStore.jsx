import create from "zustand";
import { immer } from "zustand/middleware/immer";

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

// immer middleware handles state immutability for us.
const useStore = create(
    immer((set, get) => ({
        ...initialState,
        setAuthUser(user) {
            set((state) => {
                state.isAuthenticated = true;
                state.user = user;
            });
        },
        updateAuthUser(user) {
            set((state) => {
                state.user = { ...state.user, ...user };
            });
        },
        logout() {
            set((state) => initialState);
        },
        openSnackbar(config) {
            set((state) => {
                state.snackbar = { isOpen: true, ...config };
            });
        },
        closeSnackbar() {
            set((state) => {
                state.snackbar = initialState.snackbar;
            });
        },
        setIsConnected(value) {
            set((state) => {
                state.isConnected = value;
            });
        },
        setChats(chats) {
            set((state) => {
                state.chats = chats;
            });
        },
        addChat(newChat) {
            set((state) => {
                state.chats.push(newChat);
            });
        },
        updateChat(chat) {
            if (!chat.id) { return; };
            const idx = get().chats.findIndex(cht => cht.id === chat.id);
            
            set((state) => {
                state.chats[idx] = { ...state.chats[idx], ...chat };
            });
        },
        deleteChat(chatId) {
            if (chatId === 0) return;

            set((state) => {
                state.chats = state.chats.filter((cht) => cht.id !== chatId);
            });
        },
        setActiveChat(id) {
            set((state) => {
                state.activeChat = id;
            });
        },
        setMessages(messages) {
            set((state) => {
                state.messages = messages;
            });
        },
        addMessage(message) {
            const idx = get().chats.findIndex((chat) => {
                return chat.id === message.chatId;
            });

            if (idx === -1) {
                return;
            }

            if (get().activeChat === message.chatId) {
                set((state) => {
                    state.messages.push(message);
                    state.chats[idx].messages[0] = message;
                });
            } else {
                set((state) => {
                    state.chats[idx].messages[0] = message;
                });
            }
        },
        getCurrentChat() {
            return get().chats.find((chat) => chat.id === get().activeChat);
        },
        updateMemberStatus(chatId, userId, status) {
            const chatIdx = get().chats.findIndex((chat) => chat.id === chatId);
            const memberIdx = get().chats[chatIdx].members.findIndex(
                (member) => member.id === userId
            );

            set((state) => {
                state.chats[chatIdx].members[memberIdx].isOnline = status;
            });
        },
    }))
);

export default useStore;
