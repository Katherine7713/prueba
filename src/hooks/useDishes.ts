import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDishes, saveDishes } from "../storage/dishesStorage";
import { Dish } from "../types/dish";

export const useDishes = (userId: string) => {
    const queryClient = useQueryClient();

    const dishesQuery = useQuery({
        queryKey: ["dishes", userId],
        queryFn: () => getDishes(userId),
        enabled: !!userId,
    });

    const addDish = useMutation({
        mutationFn: async (dish: Dish) => {
            const current = await getDishes(userId);
            const updated = [dish, ...current];
            await saveDishes(userId, updated);
            return updated;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dishes", userId] });
        },
    });

    const deleteDish = useMutation({
        mutationFn: async (id: string) => {
            const current = await getDishes(userId);
            const updated = current.filter((d: Dish) => d.id !== id);
            await saveDishes(userId, updated);
            return updated;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dishes", userId] });
        },
    });

    return {
        dishesQuery,
        addDish,
        deleteDish,
    };
};