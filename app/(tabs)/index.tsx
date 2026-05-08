import { supabase } from "@/src/api/supabase";
import DishCard from "@/src/components/DishCard";
import { useDishes } from "@/src/hooks/useDishes";
import { globalStyles } from "@/src/styles/globalStyles";

import {
  FlatList,
  Text,
  View,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

export default function Home() {
  const [userId, setUserId] =
    useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } =
        await supabase.auth.getUser();

      setUserId(
        data.user?.id || ""
      );
    };

    getUser();
  }, []);

  const { dishesQuery, deleteDish } =
    useDishes(userId);

  const handleDelete = (id: string) => {
    deleteDish.mutate(id);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>
        Mis platos
      </Text>

      <FlatList
        data={dishesQuery.data || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DishCard item={item} onDelete={handleDelete} />
        )}
      />
    </View>
  );
}