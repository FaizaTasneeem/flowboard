export type LabelType = 'bug' | 'feat' | 'docs';

export type Column = {
    id: string,
    title: string,
    order: number,
    color: string
}

export type Card = {
    id: string,
    columnId: string,
    title: string,
    label: LabelType,
    order: number,
}