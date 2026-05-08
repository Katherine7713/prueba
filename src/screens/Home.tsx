import React from "react";
import { FlatList, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import DishCard from "../components/DishCard";
import { useDishes } from "../hooks/useDishes";

export default function Home({ userId }: any) {
    const { dishesQuery, deleteDish } = useDishes(userId);

    const handleDelete = (id: string) => {
        deleteDish.mutate(id);
    };

    const data = Array.isArray(dishesQuery.data)
        ? dishesQuery.data.filter(Boolean)
        : [];

    if (!userId) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Cargando usuario...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => {
                if (!item) return null;

                return (
                    <Animated.View entering={FadeInDown}>
                        <DishCard item={item} onDelete={handleDelete} />
                    </Animated.View>
                );
            }}
            ListEmptyComponent={() => (
                <View style={{ marginTop: 50, alignItems: "center" }}>
                    <Text>No tienes platos aún 🍽️</Text>
                </View>
            )}
        />
    );
}