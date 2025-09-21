<script lang="ts">
    import LaunchFieldPopup from "./LaunchFieldPopup.svelte";
    import { mount } from "svelte";
    import { onMount } from "svelte";
    import maplibre from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";
    import type { Coordinate } from "$lib/types/coordinate";
    import type { LaunchSite } from "$lib/types/launchSite";

    const { Popup, Map, Marker, NavigationControl } = maplibre;

    let props = $props();

    let mapContainer: HTMLElement;
    let map: maplibre.Map;

    let markers: maplibre.Marker[] = [];

    const updateMarkers = () => {
        markers.forEach((marker) => marker.remove());
        markers = [];

        props.table.allRows.forEach((row: LaunchSite) => {
            const popupContainer = document.createElement("div");

            const popup_dom = mount(LaunchFieldPopup, {
                target: popupContainer,
                props: { launch_site: row },
            });

            const popup = new Popup({
                closeButton: false,
                className: "popup",
                offset: 25,
            }).setDOMContent(popupContainer);

            const marker = new Marker()
                .setLngLat([row.location.longitude, row.location.latitude])
                .setPopup(popup)
                .addTo(map);

            markers.push(marker); // Store the marker for later reference
        });
    };

    onMount(() => {
        map = new Map({
            container: mapContainer,
            style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
            center: [-94, 40],
            zoom: 3,
        });

        map.addControl(new NavigationControl(), "top-right");

        $effect(() => updateMarkers());

        return () => {
            map.remove();
        };
    });

    export function centerMap(coord: Coordinate, zoom: number) {
        const options: maplibre.FlyToOptions = {
            center: [coord.longitude, coord.latitude],
            speed: 2,
            zoom: zoom,
        };

        markers.forEach((marker) => {
            const markerLngLat = marker.getLngLat();

            if (
                markerLngLat.lat == coord.latitude &&
                markerLngLat.lng == coord.longitude
            ) {
                markers.forEach((marker) => {
                    if (marker.getPopup().isOpen()) {
                        marker.togglePopup();
                    }
                });
                marker.togglePopup();
            }
        });

        map.flyTo(options);
    }
</script>

<div class="relative w-full h-full">
    <div
        class="rounded-lg absolute w-full h-full inset-0"
        bind:this={mapContainer}
    ></div>
</div>

<style>
    .map-wrap {
        position: relative;
        width: 100%;
        height: 75vh;
    } /* Calculate height of the screen minus the heading */

    .map {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
