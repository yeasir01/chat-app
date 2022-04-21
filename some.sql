SELECT "user"."id", "user"."firstName", "user"."lastName", "user"."email", "user"."handle", "user"."password", "user"."avatar", "user"."emailVerified", "user"."isActive", "user"."createdAt", "user"."updatedAt", "chats"."id" AS "chats.id", "chats"."name" AS "chats.name", "chats"."avatar" AS "chats.avatar", "chats"."isGroup" AS "chats.isGroup", "chats"."isPublic" AS "chats.isPublic", "chats"."createdAt" AS "chats.createdAt", "chats"."updatedAt" AS "chats.updatedAt", "chats"."deletedAt" AS "chats.deletedAt", "chats->participant"."id" AS "chats.participant.id", "chats->participant"."createdAt" AS "chats.participant.createdAt", "chats->participant"."updatedAt" AS "chats.participant.updatedAt", "chats->participant"."deletedAt" AS "chats.participant.deletedAt", "chats->participant"."userID" AS "chats.participant.userID", "chats->participant"."chatID" AS "chats.participant.chatID" FROM "users" AS "user" LEFT OUTER JOIN ( "participants" AS "chats->participant" INNER JOIN "chats" AS "chats" ON "chats"."id" = "chats->participant"."userID" AND ("chats->participant"."deletedAt" IS NULL)) ON "user"."id" = "chats->participant"."userID" AND ("chats"."deletedAt" IS 
NULL);