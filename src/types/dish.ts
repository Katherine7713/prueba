export type Dish = {
    id: string;
    user_id: string;
    name: string;
    photo_uri: string | null;
    city: string | null;
    country: string | null;
    latitude: number | null;
    longitude: number | null;
    created_at: string;
};

// DTO para crear un nuevo proyecto (sin id ni created_at, los genera Supabase)
export type CreateDishDto = Omit<Dish, 'id' | 'created_at'>& {
};
    
// DTO para actualizar (todos los campos opcionales excepto el id)
export type UpdateDishDto = Partial<CreateDishDto>;
