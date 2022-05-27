import create from "zustand";
import * as themes from "../themes";

const useTheme = create((set, get)=>({
    mode: "light",
    setTheme(mode) {
        set(state=> state.mode = mode)
    },
    getTheme() {
        return themes[get().mode];
    }
}));

export default useTheme;