const { mongoose } = require("mongoose");
const url = process.env.MONGODB_URL;

const databaseConnection = async () => {
    try {
        const connection = await mongoose.connect(url);
        return connection;
    } catch (error) {
        console.log(error);
        console.log("Failed to connection with mongodb connection");
        return;
    }
}

module.exports = { databaseConnection }
