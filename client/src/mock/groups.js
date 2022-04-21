const mike = "https://avatarfiles.alphacoders.com/218/218127.jpg"
const rick = "https://s.hdnux.com/photos/70/27/07/14774782/9/rawImage.jpg"
const yeasir = "https://yeasir01.github.io/portfolio/assets/images/MyPhoto.jpg"
const mikeD = "https://media-exp1.licdn.com/dms/image/C4D05AQGMetyKdOtwqQ/videocover-low/0/1641674405043?e=2147483647&v=beta&t=N0Bvf6qd9W79iFyO1GLl2jAlLIKfDSygRxxSVFUh_74"

const groups = [
    {
        groupName: "Mike Tyson", //filter server request to exclude id's that match req.user object and set the value to the group
        groupID: 101,
        participants: [{id: 2, name: "Mike Tyson", img: mike}, {id: 1, name: "Yeasir Hugais", img: yeasir}],
        isGroup: false,
        lastMessage: {
            name: "Mike Tyson",
            message: "I'm doing excellent, great to hear from you again!"
        },
        img: mike //same with image
    },
    {
        groupName: "LA Group",
        groupID: 102,
        participants: [{id: 3, name: "Rick Smith", img: rick},{id: 2, name: "Mike Tyson", img: mike}, {id: 1, name: "Yeasir Hugais", img: yeasir}],
        isGroup: true,
        lastMessage: {
            name: "Rick Smith",
            message: "Are you guys free later?"
        },
        owner: 1,
        img: "https://whatsondisneyplus.com/wp-content/uploads/2018/11/groot-rocket.jpg"
    },
    {
        groupName: "Mike Deeze",
        groupID: 103,
        participants: [{id: 4, name: "Mike Deeze", img: mikeD}, {id: 1, name: "Yeasir Hugais", img: yeasir}],
        isGroup: false,
        lastMessage: {
            name: "Mike Deeze",
            message: "Hello!"
        },
        img: mikeD
    }
];

export default groups;
