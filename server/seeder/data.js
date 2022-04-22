const users = [
    {
        id: 1,
        firstName: "Mike",
        lastName: "Kleen",
        handle: "mike01",
        password: "password",
        email: "mike@example.com"
    },
    {
        id: 2,
        firstName: "John",
        lastName: "Hunt",
        handle: "john01",
        password: "password",
        email: "john@example.com"
    },
    {
        id: 3,
        firstName: "Jose",
        lastName: "Martinez",
        handle: "jose01",
        password: "password",
        email: "jose@example.com"
    },
    {
        id: 4,
        firstName: "Samantha",
        lastName: "Jenkins",
        handle: "samantha01",
        password: "password",
        email: "samantha@example.com"
    },
    {
        id: 5,
        firstName: "Arleen",
        lastName: "Lopez",
        handle: "arleen01",
        password: "password",
        email: "arlean@example.com"
    },
    {
        id: 6,
        firstName: "Dan",
        lastName: "Hughes",
        handle: "dan01",
        password: "password",
        email: "dan@example.com"
    },
];

const chats = [
    {
        id: 1,
        title: "Dream Team",
        avatar: "https://s.yimg.com/os/creatr-uploaded-images/2022-01/51f760a0-81f5-11ec-a7ee-f09942e600f9",
    },
    {
        id: 2,
        title: "",
    },
    {
        id: 3,
        title: "",
    }
];

const participants = [
    {
        id: 1,
        userId: 1,
        chatId: 1
    },
    {
        id: 2,
        userId: 2,
        chatId: 1
    },
    {
        id: 3,
        userId: 3,
        chatId: 1
    },
    {
        id: 4,
        userId: 4,
        chatId: 1
    },
    {
        id: 5,
        userId: 5,
        chatId: 2
    },
    {
        id: 6,
        userId: 6,
        chatId: 2
    },
    {
        id: 7,
        userId: 1,
        chatId: 3
    },
    {
        id: 8,
        userId: 2,
        chatId: 3
    },
];

const messages = [
    {
        id: 1,
        body: "Hello Team",
        userId: 1,
        chatId: 1
    },
    {
        id: 2,
        body: "Hi Mike",
        userId: 2,
        chatId: 1
    },
    {
        id: 3,
        body: "Hello Dan",
        userId: 5,
        chatId: 2
    },
    {
        id: 4,
        body: "Hi Dan 😀",
        userId: 1,
        chatId: 3
    },
    {
        id: 5,
        body: "what-up mike?",
        userId: 2,
        chatId: 3
    },
];

export {
    users,
    chats,
    participants, 
    messages
};