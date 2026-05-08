import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dish } from "../types/dish";

export const getDishes = async (userId: string) => {
    const data = await AsyncStorage.getItem(`dishes_${userId}`);

    return data ? JSON.parse(data) : [];
};

export const saveDishes = async (
    userId: string,
    dishes: Dish[]
    ) => {
    await AsyncStorage.setItem(
        `dishes_${userId}`,
        JSON.stringify(dishes)
    );
};