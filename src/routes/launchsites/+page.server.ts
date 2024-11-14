
import type { Actions, PageServerLoad } from './$types';
import { getGeocodio } from '$lib/server/Geocodio';
import { connectToDB } from '$lib/db';
import type { LaunchSite } from "$lib/types/launchSite";

function containerizeCoordinate(data: any[]): LaunchSite[] {
    return data.map(site => ({
        launch_site_id: site.launch_site_id,
        club_id: site.club_id,
        name: site.name,
        waiver: site.waiver,
        altitude: site.altitude,
        location: {
            latitude: site.latitude,
            longitude: site.longitude
        },
        club: site.club,
        association: site.association,
        website: site.website,
        distance: site.distance
    }));
}

export const load: PageServerLoad = async ({ locals }) => {
    const dbconn = locals.dbconn;

    try {
        const res = await dbconn.query(dbquery);

        const launch_fields: LaunchSite[] = containerizeCoordinate(res.rows);

        return {
            launch_fields
        }
    } catch (error) {
        console.log(error);
        return {
            launch_fields: []
        };
    }
}

export const actions = {
    locate: async ({ request }) => {
        const input = await request.formData();
        const query = String(input.get('query'));

        return getGeocodio(query);
    }
} satisfies Actions;


const dbquery = `
    SELECT
        launch_sites.id AS launch_site_id,
        clubs.id AS club_id,
        launch_sites.name,
        waiver,
        altitude,
        latitude,
        longitude,
        clubs.name AS club,
        association,
        launch_sites.website_url AS website
    FROM
        launch_sites
    JOIN
        clubs ON launch_sites.club_id = clubs.id
`;