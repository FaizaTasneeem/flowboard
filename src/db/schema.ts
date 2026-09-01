import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const columns = pgTable('columns', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    order: serial('order').notNull(),
    color: text('color').notNull()
});

export const cards = pgTable('cards', {
    id: text('id').primaryKey(),
    columnId: text('columnId').notNull().references(() => columns.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    order: serial('order').notNull(),
    label: text('label').notNull()
});

export const columnsRelations = relations(columns, ({ many }) => ({
    cards: many(cards),
}));

export const cardsRelations = relations(cards, ({ one }) => ({
    column: one(columns, {
        fields: [cards.columnId],
        references: [columns.id],
    }),
}));
