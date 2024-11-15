import { connectToDB } from "$lib/db";
import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
    const dbconn = await connectToDB();
    event.locals = { dbconn };

    const response = await resolve(event);
    dbconn.release();

    return response;
}) satisfies Handle;