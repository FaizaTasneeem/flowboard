import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchColumns, addColumn, fetchCards, updateCardList, addCard, editCard, deleteCard, deleteColumn } from '../api/axios';
import { Card } from '../types';


export const useColumns = () => {
    return useQuery({
        queryKey: ['columns'],
        queryFn: fetchColumns
    });
};

export const useAddColumn = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addColumn,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['columns'] })
    });
};

export const useDeleteColumn = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteColumn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['columns'] });
            queryClient.invalidateQueries({ queryKey: ['cards'] });
        }
    })
};

export const useCards = () => {
    return useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards
    });
};

export const useUpdateCardList = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCardList,
        onMutate: async ({ prevList, updatedList }: { prevList: Card[], updatedList: Card[] }) => {
            await queryClient.cancelQueries({ queryKey: ['cards'] });
            const previous: Card[] | undefined = queryClient.getQueryData(['cards']);
            queryClient.setQueryData(['cards'], updatedList);
            return { previous };
        },
        onError: (_err, _var, context) => queryClient.setQueryData(['cards'], context?.previous),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
    })
};

export const useAddCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCard,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
    });
}

export const useEditCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editCard,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
    });
};

export const useDeleteCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCard,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
    })
};