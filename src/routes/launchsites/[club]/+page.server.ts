import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	
    const club = params.club;

    return { club };
    // const post = await getPostFromDatabase(params.club);

	// if (post) {
	// 	return post;
	// }

	// error(404, 'Not found');
};