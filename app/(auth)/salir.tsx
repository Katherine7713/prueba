import { AuthApi } from "@/src/auth/AuthApi";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Salir() {
    const handleLogout = async () => {
        await AuthApi.logout();
    };

    return (
        <View style={styles.contenedor}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttont}>Salir</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" },
    button: { backgroundColor: "#f56954", padding: 15, borderRadius: 10, width: '80%', alignItems: 'center' },
    buttont: { color: "#ffffff", fontWeight: 'bold', fontSize: 16 },
})