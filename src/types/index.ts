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
    label: string,
    order: number,
}

export type cardsParamsType = {
    title: string | undefined,
    label: string | undefined
}