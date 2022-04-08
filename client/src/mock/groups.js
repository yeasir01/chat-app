const groups = [
    {
        group: null,
        groupID: 101,
        image: "",
        participants: ["Yeasir H", "Jose C."],
        lastMessage: "Great, how about you?",
        messages: [
            {
                handle: "joseC",
                createdAt: "1649359810052",
                body: "How's it going?",
            },
            {
                handle: "yeasir01",
                createdAt: "1649359866210",
                body: "Great, how about you?",
            },
        ],
    },
    {
        group: "Work Group",
        groupID: 103,
        image: "https://cdn4.iconfinder.com/data/icons/office-business-1-1/180/Working_Man-512.png",
        participants: ["Yeasir H", "Mike D.", "John Hunt"],
        lastMessage: "Do you need any help? I'm free?",
        messages: [
            {
                handle: "jht",
                createdAt: "1649359810052",
                body: "When will the proposal be ready?",
            },
            {
                handle: "yeasir01",
                createdAt: "1649359866210",
                body: "hopefully by next week, working on it now.",
            },
            {
                handle: "miked",
                createdAt: "1649359866210",
                body: "Do you need any help? I'm free",
            },
        ],
    },
];

export default groups;
