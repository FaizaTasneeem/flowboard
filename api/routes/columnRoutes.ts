import express from "express";
import { db } from "../../src/db/index.js";
import { columns } from "../../src/db/schema.js";

const router = express.Router();

router.get('/', async (_req, res) => {
    const data = await db.select().from(columns);
    res.status(200).json(data);
});

router.post('/create', async (req, res) => {
    await db.insert(columns).values(req.body);
    res.status(200).json({ success: true });
});

export default router;