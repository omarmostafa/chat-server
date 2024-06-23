import * as process from "process";
import 'dotenv/config';


const appConfig: Record<string, any> = {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/chat-db',
};

export default appConfig;