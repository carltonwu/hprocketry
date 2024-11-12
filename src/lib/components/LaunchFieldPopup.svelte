<script lang="ts">
    import type { Table } from "@skeletonlabs/skeleton";

    export let launch_site: any;
</script>

<div class="bg-surface-100 dark:bg-surface-700 p-3 min-w-48">
    <a
        class="text-xs md:text-base anchor"
        href="/launchsites/{launch_site.club}/{launch_site.name}"
        >{launch_site.name}
    </a>
    <div class="text-xs dark:text-surface-300 text-surface-500 underline">
        <a href="/launchsites/{launch_site.club}">
            {launch_site.club}
        </a>
    </div>
    <div class="flex w-full justify-between">
        <div class="text-xs text-end">
            {#if launch_site.waiver != 0}
                {Intl.NumberFormat().format(launch_site.waiver)} ft
            {/if}
        </div>
        <a class="text-xs anchor" href={launch_site.website} target="”_blank”"
            >Website
        </a>
    </div>
</div>

<style>
    :global(.maplibregl-popup) {
        @apply bg-surface-300 dark:bg-surface-700;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 350px;
    }

    :global(.maplibregl-popup .maplibregl-popup-content) {
        padding: 0;
    }
</style>
