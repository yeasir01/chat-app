import User from "./User.js";
import Participant from "./Participant.js";
import Message from "./Message.js";
import Thread from "./Thread.js";

//One user can have many participants
User.hasMany(Participant);
Participant.belongsTo(User);

//One user can have many messages
User.hasMany(Message);
Message.belongsTo(User);

//One thread can have many messages
Thread.hasMany(Message);
Message.belongsTo(Thread);

//One Thread can have many participants
Thread.hasMany(Participant);
Participant.belongsTo(Thread);