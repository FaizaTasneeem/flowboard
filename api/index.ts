import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import columnRoutes from "./routes/columnRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import healthCheckRoutes from "./routes/healthCheckRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: env.frontendOrigin,
    credentials: true
}));

app.use("/api/columns", columnRoutes);
app.use("/api/cards", cardRoutes);
app.use('/api/health', healthCheckRoutes);

export default app;