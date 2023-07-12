import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to MongoDB Successfully");
        });

        connection.on("error", (err) =>{
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })
    } catch (error) {
        console.log("Something Went Wrong");
        console.log(error);
    }
}