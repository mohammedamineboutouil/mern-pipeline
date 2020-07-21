import mongoose from 'mongoose';
import env from "../config";

export const connectToMongo = async () => {
    try {
        await mongoose.connect(env.DB_URI, {
            useUnifiedTopology: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};