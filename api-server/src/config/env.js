export default {
    port: process.env.PORT,
    hostName: process.env.HOSTNAME,
    saltRounds: parseInt(process.env.SALT_ROUNDS),
    sequelize: {
        username: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD ,
        port: process.env.PGPORT,
        dialect: "postgres",
        logging: false
    }
};