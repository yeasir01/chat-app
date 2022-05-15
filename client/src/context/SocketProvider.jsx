import React from "react";

export const SocketContext = React.createContext();

const SocketProvider = ({children}) => {
    const [socket, setSocket] = React.useState(null);

    return (
        <>
            <SocketContext.Provider value={[socket, setSocket]}>
                {children}
            </SocketContext.Provider>
        </>
    );
};

export default SocketProvider;