import { supabase } from "../api/supabase";

export const AuthApi = {
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw new Error(error.message);
        return data;
    },

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error al cerrar sesión:", error.message);
            throw new Error(error.message);
        }
    },

    async getSession() {
        const { data } = await supabase.auth.getSession();
        return data.session;
    }
}