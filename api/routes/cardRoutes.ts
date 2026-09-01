import express from "express";
import { eq } from "drizzle-orm";
import { db } from "../../src/db/index.js";
import { cards } from "../../src/db/schema.js";

const router = express.Router();

router.get('/', async (_req, res) => {
    const data = await db.select().from(cards);
    res.status(200).json(data);
});

router.post('/create', async (req, res) => {
    await db.insert(cards).values(req.body);
    res.status(200).json({ success: true });
});

router.patch('/edit/:id', async (req, res) => {
    await db.update(cards).set(req.body).where(eq(cards.id, req.params.id));
    res.status(200).json({ success: true });
});

router.delete('/delete/:id', async (req, res) => {
    await db.delete(cards).where(eq(cards.id, req.params.id));
    res.status(200).json({ success: true });
});

export default router;