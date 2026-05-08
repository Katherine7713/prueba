import { supabase } from "@/src/api/supabase";
import { Link } from 'expo-router';
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function RegistroScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }

        // Validar coincidencia de contraseñas
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        // Validar longitud mínima
        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
        });

        setLoading(false);

        if (error) {
            Alert.alert('Error al registrar', error.message);
            return;
        }

        Alert.alert(
            'Registro exitoso',
            'Revisa tu correo electrónico para confirmar tu cuenta.'
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.contenedor}>

                <View style={styles.header}>
                    <Image
                        source={require('../../assets/images/logop.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.headerT}>Crea tu cuenta</Text>

                    <Text style={styles.headerS}>
                        Comienza a gestionar tu proyecto ahora
                    </Text>
                </View>

                <View style={styles.form}>

                    <Text style={styles.label}>Correo Electrónico</Text>

                    <TextInput
                        style={styles.text}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Contraseña</Text>

                    <TextInput
                        style={styles.text}
                        placeholder="Password"
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                    />

                    <Text style={styles.label}>Confirmar Contraseña</Text>

                    <TextInput
                        style={styles.text}
                        placeholder="Confirmar Password"
                        value={confirmPassword}
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity
                        style={[styles.btn, loading && styles.buttonDisabled]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {
                            loading
                                ? <ActivityIndicator color="#fff" />
                                : <Text style={styles.btnText}>Registrarse</Text>
                        }
                    </TouchableOpacity>

                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        ¿Ya tienes una cuenta?
                    </Text>

                    <Link href="/(auth)/login" asChild>
                        <TouchableOpacity>
                            <Text style={styles.link}> Inicia sesión</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#ffffff"
    },

    header: {
        alignItems: "center",
        marginBottom: 30
    },

    form: {
        gap: 12
    },

    logo: {
        width: 150,
        height: 80,
        marginBottom: 10
    },

    headerT: {
        fontSize: 20,
        fontWeight: '800',
        color: "#001F3F"
    },

    headerS: {
        fontSize: 14,
        color: "#80b5d3",
        fontWeight: '600',
        marginTop: 2,
        textAlign: 'center'
    },

    text: {
        width: '100%',
        borderWidth: 1,
        borderColor: "#3c8dbc",
        borderRadius: 10,
        padding: 15,
        backgroundColor: "#ffffff",
        marginVertical: 8,
        color: "#000000"
    },

    btn: {
        backgroundColor: "#3c8dbc",
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },

    btnText: {
        color: "#ffffff",
        fontWeight: 'bold'
    },

    buttonDisabled: {
        opacity: 0.7
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },

    footerText: {
        fontSize: 14,
        color: '#666666'
    },

    link: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600'
    },

    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4A4A4A',
        marginBottom: 8
    }
});