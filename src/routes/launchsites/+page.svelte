<script lang="ts">
    import { enhance } from "$app/forms";
    import { TableHandler } from "@vincjo/datatables";
    import data from "$lib/static/data";
    import type { ActionData } from "./$types";
    import { Locate } from "lucide-svelte";
    import { browser } from "$app/environment";
    import LaunchFieldTable from "$lib/components/LaunchFieldTable.svelte";
    import LaunchFieldMap from "$lib/components/LaunchFieldMap.svelte";

    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";

    const modalStore = getModalStore();

    const modal: ModalSettings = {
        type: "alert",
        title: "Warning",
        body: "This is an unofficial collection of NAR and TRA launchsites. The information contained on this site may not be complete or accurate and should be used as an initial reference only.",
    };
    modalStore.trigger(modal);

    let { form }: { form: ActionData } = $props();
    const table = new TableHandler(
        get_distance(data, form?.lat ?? null, form?.lon ?? null),
        { rowsPerPage: 10 },
    );

    let mapRef: any;

    type LaunchSite = {
        id: number;
        launch_site: string;
        club: string;
        association: string;
        waiver: number;
        lat: number;
        lon: number;
        website: string;
    };

    function updateUI(lat: number, lon: number) {
        updateTable(lat, lon);
        centerMap(lat, lon, 5);
    }

    function centerMap(lat: number, lon: number, zoom: number) {
        mapRef.centerMap(lat, lon, zoom);
    }

    function updateTable(lat: number, lon: number) {
        table.setRows(get_distance(data, lat, lon));
    }

    function get_distance(
        data: LaunchSite[],
        lat: number,
        lon: number,
    ): (LaunchSite & { distance: any })[] {
        const toRadians = (degrees: number) => degrees * (Math.PI / 180);

        if (lat == null || lon == null) {
            return data.map((site) => {
                const distance = null;
                return {
                    ...site,
                    distance,
                };
            });
        }

        return data.map((site) => {
            const earthRadius = 3959; // Radius of the Earth in miles
            const dLat = toRadians(site.lat - lat);
            const dLon = toRadians(site.lon - lon);

            const lat1 = toRadians(lat);
            const lat2 = toRadians(site.lat);

            const a =
                Math.sin(dLat / 2) ** 2 +
                Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = Number((earthRadius * c).toFixed(1));

            return {
                ...site,
                distance,
            };
        });
    }

    function geolocationSuccess(pos) {
        const coords = pos.coords;
        updateUI(coords.latitude, coords.longitude);
    }
</script>

<div class="grid grid-flow-row-dense auto-rows-max pt-8">
    <div class="flex justify-center w-full items-center pb-4">
        <div
            class="flex justify-center w-full space-x-3 items-center flex-wrap"
        >
            <form
                class="max-w-64 w-1/3"
                method="POST"
                action="?/locate"
                use:enhance={({}) => {
                    return async ({ result, update }) => {
                        if (result.type === "success") {
                            const data = result.data;
                            updateUI(data.lat, data.lon);
                        }
                        update();
                    };
                }}
            >
                <input
                    class="input"
                    name="query"
                    type="text"
                    value={form?.query ?? ""}
                    placeholder="Enter Zipcode or Address"
                    required
                />
            </form>
            {#if browser && navigator.geolocation}
                <h5 class="h5">Or</h5>
                <button
                    type="button"
                    class="max-w-48 w-1/3 btn variant-filled"
                    onclick={() =>
                        navigator.geolocation.getCurrentPosition(
                            geolocationSuccess,
                        )}
                >
                    <span><Locate /></span>
                    <span>Locate Me</span>
                </button>
            {/if}
        </div>
    </div>
    <div class="flex flex-wrap justify-center pb-4">
        <div
            class="flex flex-col sm:flex-row justify-center items-start space-x-4 w-full px-8"
        >
            <div class="w-full sm:w-1/3">
                <LaunchFieldTable {table} {centerMap} />
            </div>
            <div class="w-full sm:w-2/3">
                <LaunchFieldMap bind:this={mapRef} {table} />
            </div>
        </div>
    </div>
</div>
