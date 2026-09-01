import dotenv from "dotenv";

dotenv.config();

export const env = {
    database_url: process.env.DATABASE_URL,
    frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    port: process.env.PORT || "5000",
}