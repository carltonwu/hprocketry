<script lang="ts">
    import { Building2 } from "lucide-svelte";

    let props = $props();

    function truncate(text: string, totalChars: number, endChars = 0) {
        endChars = Math.min(endChars, totalChars);
        const start = text.slice(0, totalChars - endChars);
        const end = endChars > 0 ? text.slice(-endChars) : "";

        if (start.length + end.length < text.length) {
            return start + "…" + end;
        } else {
            return text;
        }
    }
</script>

<tr onclick={() => props.centerMap(props.row.lat, props.row.lon, 7)}>
    <td>
        <div class="grid auto-rows-max gap-1">
            <div>
                <a
                    class="text-xs md:text-base anchor"
                    href="/launchsites/{props.row.club}/{props.row.name}"
                    >{truncate(props.row.name, 30)}
                </a>
            </div>
            <div
                class="flex flex-nowrap space-x-2 text-xs text-surface-500 dark:text-surface-300 items-center underline"
            >
                <a href="/launchsites/{props.row.club}">
                    {truncate(props.row.club, 30)}
                </a>
                {#if props.row.association.includes("NAR")}
                    <Building2 size="16" class="text-error-500" />
                {/if}
                {#if props.row.association.includes("TRA")}
                    <Building2 size="16" class="text-tertiary-500" />
                {/if}
            </div>
        </div>
    </td>
    <td>
        <p class="text-xs md:text-base text-end">
            {Intl.NumberFormat().format(props.row.waiver)} ft
        </p>
    </td>
    <td>
        {#if props.row.distance != null}
            <p class="text-xs md:text-base text-end">
                {Intl.NumberFormat().format(props.row.distance)} mi
            </p>
        {/if}
    </td>
</tr>
