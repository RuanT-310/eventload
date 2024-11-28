import mongoose from 'mongoose';
import { secrets } from '../config/secrets.js';

const MONGO_DB_URL = secrets.mongo_url
export async function main() {
    await mongoose.connect(MONGO_DB_URL);
    return mongoose.connection
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const db = await main()
db
.on("error", erro => console.log(erro))
.once("open", () => console.log("conected"))
/* (async () => {
    await mongoose.connect(process.env.MONGO_DB_URL);
    return mongoose.connection
    
})( )*/
