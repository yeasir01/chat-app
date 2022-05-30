import React from "react";
import List from "@mui/material/List";
import useStore from "../../hooks/useStore.jsx";
import ChatListItem from "./ChatListItem.jsx";

const ChatList = () => {
    const chats = useStore((state) => state.chats);

    return (
        <List disablePadding>
            {chats.map((chat, idx) => (
                <ChatListItem
                    chat={chat}
                    delay={(idx + 1) * 300}
                    key={chat.id}
                />
            ))}
        </List>
    );
};

export default ChatList;
