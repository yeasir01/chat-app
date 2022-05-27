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
const useStore = create(immer((set, get)=>({
    ...initialState,
    setAuthUser(user) {
        set((state) => {state.isAuthenticated = true; state.user = user;});
    },
    updateAuthUser(user) {
        set((state) =>  {state.user = {...state.user, ...user}});
    },
    logout() {
        set((state) => initialState);
    },
    openSnackbar(config) {
        set((state) => {state.snackbar = {isOpen: true, ...config}});
    },
    closeSnackbar() {
        set((state) => {state.snackbar = initialState.snackbar});
    },
    setIsConnected(value) {
        set((state) => {state.isConnected = value});
    },
    setChats(chats) {
        set((state) => {state.chats = chats});
    },
    addChat(newChat) {
        set((state) => {state.chats.push(newChat)});
    },
    updateChat(chat) {
        if (!chat.id) return;

        set((state) => {
            state.chats[chat.id] = {...state.chats[chat.id], ...chat }
        });
    },
    deleteChat(chatId) {
        if (chatId === 0) return;

        set((state) => {
            state.chats = state.chats.filter((cht) => cht.id !== chatId);
        });
    },
    setActiveChat(id) {
        set((state) => { state.activeChat = id; });
    },
    setMessages(messages) {
        const idx = get().chats.findIndex(c => c.id === get().activeChat)
        set((state) => {state.chats[idx].messages = messages});
    },
    addMessage(message) {
          const idx = get().chats.findIndex(chat => chat.id === message.chatId);
          
          if (idx === -1) return;

          set((state)=>{
              state.chats[idx].messages.push(message);
          })
    },
    getMessages(){
        return get().chats.find(chat => chat.id === get().activeChat).messages;
    },
    getCurrentChat(){
        return get().chats.find(c => c.id === get().activeChat)
    }
})));

export default useStore;
