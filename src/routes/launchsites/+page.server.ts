import type { Actions } from './$types';
import { getGeocodio } from '$lib/server/Geocodio';

export const actions = {
    locate: async ({ request }) => {
        const input = await request.formData();
        const query =  String(input.get('query'));

        return getGeocodio(query);
    }
} satisfies Actions;
