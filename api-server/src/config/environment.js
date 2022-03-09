export default {
    port: process.env.API_PORT,
    saltRounds: parseInt(process.env.SALT_ROUNDS),
    sequelize: {
        username: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD ,
        dialect: "postgres",
        port: 5432,
        logging: false
    }
};