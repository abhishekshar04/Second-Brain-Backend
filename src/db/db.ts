import mongoose from "mongoose";
const DB_NAME = "SecondBrain"
const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log(`\n Mongo DB connected !! DB HOST ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MONGODB connection error ", error instanceof Error ? error.message : error);
        process.exit(1);        
    }
}

export default connectDB;