<script lang="ts">
    import { enhance } from '$app/forms';
    import { TableHandler, ThSort, ThFilter, check, Pagination, RowCount} from '@vincjo/datatables';
    import Datatable from '$lib/components/LaunchFieldTable.svelte';
    import data from '$lib/static/data';
    import type { PageData, ActionData } from './$types';

    let { form }: { form: ActionData } = $props();
    const table = new TableHandler(get_distance(data, form?.lat ?? 0, form?.lon ?? 0), { rowsPerPage: 10 });

    type LaunchSite = {
        id: number;
        launch_site: string;
        club: string;
        association: string;
        waiver: number;
        lat: number;
        lon: number;
    };

    function updateTable(lat: number, lon: number) {
        table.setRows(get_distance(data, lat, lon))
    }

    function get_distance(data: LaunchSite[], lat: number, lon: number): (LaunchSite & { distance: number })[] {
        const toRadians = (degrees: number) => degrees * (Math.PI / 180);

        return data.map(site => {
            const earthRadius = 3959; // Radius of the Earth in miles
            const dLat = toRadians(site.lat - lat);
            const dLon = toRadians(site.lon - lon);
            
            const lat1 = toRadians(lat);
            const lat2 = toRadians(site.lat);

            const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            
            const distance = Number((earthRadius * c).toFixed(1));

            return {
                ...site,
                distance
            };
        });
    }
    

</script>

<div class="flex justify-center w-full"> 
    <form method="POST" action="?/locate" use:enhance={({ formElement }) => {
        return async ({ result, update }) => {
            if (result.type === "success") {
                const data = result.data;
                updateTable(data.lat, data.lon);
            }
            update();
        }
    }}>
        <input class="input" name="query" type="text" value="{form?.query ?? ''}" placeholder="Enter Zipcode or Address" required/>
      </form>
</div>
<div class="flex justify-center">
    <Datatable {table} />
</div>