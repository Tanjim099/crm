import mongoose from "mongoose";
import { config } from "dotenv";
config();

const dbConnection = async () => {
    try {
        const connectionInstance = mongoose.connect(process.env.MONGO_URL);
        // console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR:->", error);
        process.exit(1);
    }
}

export default dbConnection;