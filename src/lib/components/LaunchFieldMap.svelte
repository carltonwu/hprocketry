<script lang="ts">
    import LaunchFieldPopup from "./LaunchFieldPopup.svelte";
    import { mount } from "svelte";
    import { onMount } from "svelte";
    import maplibre from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";

    const { Popup, Map, Marker, NavigationControl } = maplibre;

    let props = $props();

    let mapContainer: HTMLElement;
    let map: maplibre.Map;

    let markers: maplibre.Marker[] = [];

    const updateMarkers = () => {
        markers.forEach((marker) => marker.remove());
        markers = [];

        props.table.allRows.forEach((row: any) => {
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
                .setLngLat([row.lon, row.lat])
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

    export function centerMap(lat: number, lon: number, zoom: number) {
        const options: maplibre.FlyToOptions = {
            center: [lon, lat],
            speed: 2,
            zoom: zoom,
        };

        markers.forEach((marker) => {
            const markerLngLat = marker.getLngLat();
            if (markerLngLat.lat === lat && markerLngLat.lng === lon) {
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

<div class="map-wrap">
    <div class="map rounded-md" bind:this={mapContainer}></div>
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
