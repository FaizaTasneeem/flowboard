import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchColumns, fetchCards, updateCardList } from '../api/axios';
import { Card, cardsParamsType } from '../types';


export const useColumns = () => {
    return useQuery({
        queryKey: ['columns'],
        queryFn: fetchColumns
    });
};

export const useCards = (title?: string, label?: string) => {
    return useQuery({
        queryKey: ['cards', title, label],
        queryFn: () => fetchCards({ title, label })
    });
};

export const useUpdateCardList = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCardList,
        onMutate: async (cardList: Card[]) => {
            await queryClient.cancelQueries({ queryKey: ['cards'] });
            const previous: Card[] | undefined = queryClient.getQueryData(['cards']);
            queryClient.setQueryData(['cards'], cardList);
            return { previous };
        },
        onError: (_err, _var, context) => queryClient.setQueryData(['cards'], context?.previous),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
    })
};