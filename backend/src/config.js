const env = {
    DB_URI: process.env.DB_URI || "mongodb+srv://xsegma:Alpha2020@cluster0-bdxsy.gcp.mongodb.net/boutouil",
    DB_NAME: process.env.DB_NAME || "boutouil",
    USERS_API: process.env.USERS_API || "https://randomuser.me/api/?results=",
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3305,
};

export default env;
