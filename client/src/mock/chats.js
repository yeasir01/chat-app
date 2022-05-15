

const chats = [
    {
        id: 1,
        title: "The Dream Team",
        admin: "1",
        isGroup: true,
        avatar: "http://www.somesite.com/image.png",
        createdAt: "2018-09-28T10:55:51.603Z",
        members: {
            1:{ // Each key in members map represents the userId. This insures we have no duplicates when adding or updating records.
                firstName: "Yeasir",
                lastName: "Hugais",
                handle: "yeasir01",
                isOnline: true,
                avatar: "http://www.somesite.com/image.png"
            },
            2:{
                firstName: "John",
                lastName: "Hopkins",
                handle: "jHopkins",
                isOnline: true,
                avatar: "http://www.somesite.com/image.png"
            },
            3:{
                firstName: "Yeasir",
                lastName: "Hugais",
                handle: "yeasir01",
                isOnline: true,
                avatar: "http://www.somesite.com/image.png"
            },
        },
        messages: [
            {
                id: 1,
                chatId: 1,
                updatedAt: "2018-09-28T10:55:51.603Z",
                user: 1,
                content: "hello",
                attachments: [],
                readBy: []
            },
            {
                id: 2,
                chatId: 1,
                updatedAt: "2018-09-28T10:56:53.603Z",
                user: 2,
                content: "hello",
                attachments: [],
                readBy: []
            }
        ]
    },
    {
        id: 2,
        title: "Private Message",
        admin: "1",
        isGroup: false,
        avatar: null,
        createdAt: "2018-09-28T10:55:51.603Z",
        members: {
            2:{
                firstName: "John",
                lastName: "Hopkins",
                handle: "jHopkins",
                isOnline: true,
                avatar: "http://www.somesite.com/image.png"
            }
        },
        messages: [
            {
                id: 3,
                chatId: 2,
                updatedAt: "2018-09-28T10:55:51.603Z",
                user: 1,
                content: "Hi",
                readBy: []
            }
        ]
    }
];