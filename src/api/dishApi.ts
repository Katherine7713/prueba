import { supabase } from "./supabase";
import type { CreateDishDto, Dish, UpdateDishDto } from "../types/dish";

const TABLE = "Dish";

export const dishApi = {
    
    async getAll(): Promise<Dish[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw new Error(error.message);
        return data ?? [];
    },


    async getById(id: string): Promise<Dish> {
        const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("id", id)
        .single();

        if (error) throw new Error(error.message);
        return data;
    },

    async create(dto: CreateDishDto): Promise<Dish> {
        const payload: any = { ...dto };
        
        if (!payload.name?.trim()) throw new Error("Nombre requerido");

        console.log("📦 INSERT PAYLOAD:", payload);

        const { data, error } = await supabase
            .from(TABLE)
            .insert(payload)
            .select()
            .single();

        if (error) {
            console.error("❌ CREATE ERROR:", error);
            throw new Error(error.message);
        }

        return data;
    },

    async update(id: string, dto: UpdateDishDto): Promise<Dish> {
        const payload: any = { ...dto };
        if (!payload.name?.trim()) delete payload.name;
        if (!payload.photo_uri?.trim()) delete payload.photo_uri;
        if (!payload.city?.trim()) delete payload.city;
        if (!payload.country?.trim()) delete payload.country;

        const { data, error } = await supabase
            .from(TABLE)
            .update(payload)
            .eq("id", id)
            .select();
        if (error) {
            console.error("[update ERROR]", error);
            throw new Error(error.message);
        }
        if (!data || data.length === 0) {
            throw new Error("No se encontró ningún registro");
        }
        return data[0];
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from(TABLE)
            .delete()
            .eq("id", id);

        if (error) {
            console.error("DELETE ERROR:", error);
            throw new Error(error.message);
        }
    },
};