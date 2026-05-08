import * as Location from "expo-location";

export const getCurrentLocation =
    async () => {
        const { status } =
        await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
        throw new Error(
            "Permiso de ubicación denegado"
        );
        }

        const location =
        await Location.getCurrentPositionAsync(
            {}
        );

        const reverse =
        await Location.reverseGeocodeAsync({
            latitude:
            location.coords.latitude,
            longitude:
            location.coords.longitude,
        });

        return {
        latitude:
            location.coords.latitude,

        longitude:
            location.coords.longitude,

        city:
            reverse[0]?.city || null,

        country:
            reverse[0]?.country || null,
        };
};