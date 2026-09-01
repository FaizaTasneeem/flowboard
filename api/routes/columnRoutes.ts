import express from "express";
import { eq } from "drizzle-orm";
import { db } from "../../src/db/index.js";
import { columns } from "../../src/db/schema.js";

const router = express.Router();

export default router;