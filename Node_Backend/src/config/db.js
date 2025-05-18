const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.db_Name;

const connectDB = async () => {
 try {
    await mongoose.connect(`${mongoUrl}/${dbName}`);
    console.log('MongoDB Connected Successfully');
 } catch (error) {
    console.error(error)
 }
} 

module.exports = {
    connectDB
}
