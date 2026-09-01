import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import columnRoutes from "./routes/columnRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: env.frontendOrigin,
    credentials: true
}));

app.use("/api/columns", columnRoutes);
app.use("/api/cards", cardRoutes);

export default app;