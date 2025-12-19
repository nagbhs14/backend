import mongoose, { mongo } from "mongoose";
import { connect } from "node:http2";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB conncted successfully ${connectionInstance.connection.host}`)
    }
    catch (error) {
        console.log("Connection Failed")
        process.exit(1)
    }
}
export default connectDB