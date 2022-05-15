import create from "zustand";
import { INITIAL_STATE, reducer, types } from "../reducers/store-reducer.js";

const useStore = create((set, get) => ({
    ...INITIAL_STATE,
    dispatch: (action) => set((state) => reducer(state, action)),
    getChat: () => get().chats.find(element=> element.id === get().activeChatId)
}));

export default useStore;
export {types, useStore};