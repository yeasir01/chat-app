import "dotenv/config";
import db from "../src/models/index.js";
import { chats, messages, participants, users } from "./data.js";

(async () => {
    try {
        console.log("connecting to db...");
        await db.sequelize.sync({force: true});
        console.log("seeding...");
        await db.User.bulkCreate(users, {individualHooks: true});
        await db.Chat.bulkCreate(chats, {individualHooks: true});
        await db.Participant.bulkCreate(participants, {individualHooks: true});
        await db.Message.bulkCreate(messages, {individualHooks: true});
        console.log("done");
    } catch (error) {
        console.log(error);
    } finally {
        await db.sequelize.close();
        console.log("connection closed");
    }
})();