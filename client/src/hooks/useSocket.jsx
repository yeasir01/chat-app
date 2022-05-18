import create from "zustand";

const useSocket = create((set) => ({
    socket: null,
    initSocket(socketInstance) {
        set(state => state.socket = socketInstance)
    },
}));

export default useSocket;