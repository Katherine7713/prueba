import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import { supabase } from "@/src/api/supabase";
import { useDishes } from "@/src/hooks/useDishes";
import { Dish } from "@/src/types/dish";
import { getCurrentLocation } from "@/src/utils/location";

export default function AddDish() {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState<string | null>(null);
    const [userId, setUserId] = useState("");

    const { addDish } = useDishes(userId);

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUserId(data.user?.id ?? "");
        };
        getUser();
    }, []);

    useEffect(() => {
        (async () => {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            await ImagePicker.requestCameraPermissionsAsync();
        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], 
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.status !== "granted") {
            Alert.alert("Permiso denegado");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'], 
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };


    const handleAdd = async () => {
        if (!name || !photo || !userId) {
            Alert.alert("Completa todos los campos");
            return;
        }

        try {
            const location = await getCurrentLocation();

            const newDish: Dish = {
                id: Date.now().toString(),
                user_id: userId,
                name,
                photo_uri: photo,
                city: location.city,
                country: location.country,
                latitude: location.latitude,
                longitude: location.longitude,
                created_at: new Date().toISOString(),
            };

            await addDish.mutateAsync(newDish);

            setName("");
            setPhoto(null);

            Alert.alert("Plato registrado");
        } catch (e) {
            Alert.alert("Error al registrar");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nombre del plato"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            {/* GALERÍA */}
            <TouchableOpacity
                onPress={pickImage}
                style={styles.buttonSecondary}
            >
                <Text style={styles.buttonText}>📷 Galería</Text>
            </TouchableOpacity>

            {/* CÁMARA */}
            <TouchableOpacity
                onPress={takePhoto}
                style={styles.button}
            >
                <Text style={styles.buttonText}>📸 Cámara</Text>
            </TouchableOpacity>

            {photo && (
                <Image source={{ uri: photo }} style={styles.image} />
            )}

            {/* REGISTRAR */}
            <Animated.View style={{ marginTop: 20 }}>
                <TouchableOpacity
                    onPressIn={() => (scale.value = withSpring(0.95))}
                    onPressOut={() => (scale.value = withSpring(1))}
                    onPress={handleAdd}
                    style={styles.submitButton}
                >
                    <Text style={styles.buttonText}>
                        ✅ Registrar Plato
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#F5F7FA",
        flex: 1,
    },

    input: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    button: {
        backgroundColor: "#1A3A5C",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    buttonSecondary: {
        backgroundColor: "#3B82F6",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    submitButton: {
        backgroundColor: "#10B981",
        padding: 16,
        borderRadius: 14,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
    },

    image: {
        height: 220,
        borderRadius: 16,
        marginTop: 15,
    },
});