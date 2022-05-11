import create from "zustand";
import { INITIAL_STATE, reducer, types } from "../reducers/store-reducer.js";

const useStore = create((set) => ({
    ...INITIAL_STATE,
    dispatch: (action) => set((state) => reducer(state, action)),
}));

export default useStore;
export {types, useStore};