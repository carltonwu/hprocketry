import { GEOCODIO_API_KEY } from '$env/static/private';


export async function getGeocodio(query: string) {
    try {
        const params = new URLSearchParams({
            q: query,
            api_key: GEOCODIO_API_KEY,
            country: 'USA',
            format: 'simple',
        });

        const response = await fetch(`https://api.geocod.io/v1.7/geocode?${params.toString()}`, {
            method: "GET",
        });


        const data = await response.json();

        return { success: true, query: query, coord: { latitude: data.lat, longitude: data.lng } };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { success: false, query: query }
    }
}