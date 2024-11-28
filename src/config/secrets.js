import { config } from 'dotenv';
config()
export const secrets = {
    mongo_url: process.env.MONGO_DB_URL,
    port: process.env.PORT || 3000,
}