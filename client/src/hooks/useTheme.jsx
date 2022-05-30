import create from "zustand";

const useTheme = create((set, get)=>({
    mode: "light",
    setTheme(mode) {
        set(state=> state.mode = mode)
    },
}));

export default useTheme;