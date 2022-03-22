import { ThemeProvider as MUIProvider } from "@mui/material/styles";
import { createContext, useState } from "react";
import themes from "../themes/index.js";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(prevState => !prevState)
    }
    
    //Easily change themes, by providing an object name below.
    const currentTheme = darkMode ? themes["dark"] : themes["light"];

    return (
        <ThemeContext.Provider value={[toggleTheme]}>
            {<MUIProvider theme={currentTheme}>
                {children}
            </MUIProvider>}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
