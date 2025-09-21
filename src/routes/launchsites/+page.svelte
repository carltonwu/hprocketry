<script lang="ts">
    import { enhance } from "$app/forms";
    import { TableHandler } from "@vincjo/datatables";
    import type { ActionData } from "./$types";
    import { Locate } from "lucide-svelte";
    import { browser } from "$app/environment";
    import LaunchFieldTable from "$lib/components/LaunchFieldTable.svelte";
    import LaunchFieldMap from "$lib/components/LaunchFieldMap.svelte";
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import type { PageData } from "./$types";
    import type { LaunchSite } from "$lib/types/launchSite.d.ts";
    import type { Coordinate } from "$lib/types/coordinate.d.ts";

    const modalStore = getModalStore();

    const modal: ModalSettings = {
        type: "alert",
        title: "Warning",
        body: "This is an unofficial collection of NAR and TRA launchsites. The information contained on this site may not be complete or accurate and should be used as an initial reference only.",
    };
    modalStore.trigger(modal);

    let { data, form }: { data: PageData; form: ActionData } = $props();
    const table = new TableHandler(data.launch_fields, { rowsPerPage: 8 });
    if (form?.success === true) {
        updateTable(form.coord);
    }

    let mapRef: any;

    function updateUI(coords: Coordinate) {
        updateTable(coords);
        centerMap(coords, 5);
    }

    function centerMap(coords: Coordinate, zoom: number) {
        mapRef.centerMap(coords, zoom);
    }

    function updateTable(coords: Coordinate) {
        table.setRows(get_distance(data.launch_fields, coords));
    }

    function get_distance(
        data: LaunchSite[],
        coords: Coordinate,
    ): LaunchSite[] {
        const toRadians = (degrees: number): number =>
            degrees * (Math.PI / 180);

        if (coords === null) {
            return data;
        }

        return data.map((site) => {
            const earthRadius = 3959; // Radius of the Earth in miles
            const dLat = toRadians(site.location.latitude - coords.latitude);
            const dLon = toRadians(site.location.longitude - coords.longitude);

            const lat1 = toRadians(coords.latitude);
            const lat2 = toRadians(site.location.latitude);

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

    function geolocationSuccess(pos: GeolocationPosition) {
        const coords = pos.coords;
        updateUI({ latitude: coords.latitude, longitude: coords.longitude });
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
                            if (data) updateUI(data.coord);
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
    <div class="flex flex-wrap justify-center space-4 w-full h-[50em]">
        <div
            class="flex flex-col sm:flex-row justify-center items-start px-4 lg:px-24 w-full"
        >
            <div class="w-full md:w-full h-full">
                <LaunchFieldTable {table} {centerMap} />
            </div>
            <div class="w-full md:w-full h-full">
                <LaunchFieldMap bind:this={mapRef} {table} />
            </div>
        </div>
    </div>
</div>
