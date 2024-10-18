import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log( `Successfully connected to database ${mongoose.connection.host}`);
    } catch (error) {
        console.log("Error while connecting database",error);
    }
}
export default connectDB;