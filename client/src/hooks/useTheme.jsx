import { useContext } from "react";
import ThemeContext from "../context/ThemeProvider.jsx";

const useTheme = () => {
    return useContext(ThemeContext);
}

export default useTheme;

