<script lang="ts">
    import {
        TableHandler,
        ThSort,
        check,
        Pagination,
        RowCount,
    } from "@vincjo/datatables";
    import LaunchFieldTableRow from "./LaunchFieldTableRow.svelte";

    export let table: TableHandler;
    export let centerMap;

    const waiver_filter = table.createFilter(
        "waiver",
        check.isGreaterThanOrEqualTo,
    );
    const distance_filter = table.createFilter(
        "distance",
        check.isLessThanOrEqualTo,
    );

    const association_filter = table.createAdvancedFilter(
        "association",
        check.isLike,
    );

    const search = table.createSearch();
</script>

<div class="w-full">
    <div class="table-container">
        <table class="table table-hover table-compact table-auto">
            <thead>
                <tr class="border-0">
                    <ThSort {table} field="launch_site">
                        <p class="btext-xs md:text-base">Launch Site</p>
                    </ThSort>
                    <ThSort {table} field="waiver">
                        <p class="text-xs md:text-base">Waiver</p>
                    </ThSort>
                    <ThSort {table} field="distance">
                        <p class="text-xs md:text-base">Distance</p>
                    </ThSort>
                </tr>
                <tr>
                    <td class="w-1/2 p-2">
                        <div class="flex flex-wrap items-center gap-2">
                            <div class="flex-grow min-w-0 w-full md:w-1/3">
                                <input
                                    class="w-full max-h-8 input text-xs"
                                    type="text"
                                    bind:value={search.value}
                                    placeholder="Search"
                                    oninput={() => search.set()}
                                />
                            </div>
                            <div
                                class="flex-grow flex space-x-2 text-xs w-full md:w-1/3 justify-start md:justify-end min-w-0"
                            >
                                <div>
                                    <label class="flex space-x-2 items-center">
                                        <input
                                            class="checkbox"
                                            type="checkbox"
                                            class:active={association_filter.criteria.includes(
                                                "NAR",
                                            )}
                                            oninput={() =>
                                                association_filter.set("NAR")}
                                        />
                                        <p>NAR</p>
                                    </label>
                                </div>
                                <div>
                                    <label class="flex space-x-2 items-center">
                                        <input
                                            class="checkbox"
                                            type="checkbox"
                                            class:active={association_filter.criteria.includes(
                                                "TRA",
                                            )}
                                            oninput={() =>
                                                association_filter.set("TRA")}
                                        />
                                        <p>TRA</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="w-1/4 p-2">
                        <input
                            class="input max-h-8 text-xs"
                            type="text"
                            bind:value={waiver_filter.value}
                            placeholder="Minimum Waiver"
                            oninput={() => waiver_filter.set()}
                        />
                    </td>
                    <td class="w-1/4 p-2">
                        <input
                            class="input max-h-8 text-xs"
                            type="text"
                            bind:value={distance_filter.value}
                            placeholder="Maximum Distance"
                            oninput={() => distance_filter.set()}
                        />
                    </td>
                </tr>
            </thead>
            <tbody
                class="text-xs md:text-base overflow-hidden whitespace-nowrap"
            >
                {#each table.rows as row}
                    <LaunchFieldTableRow {row} {centerMap} />
                {/each}
            </tbody>
        </table>
        <footer class="flex justify-between text-xs">
            <RowCount {table} />
            <Pagination {table} />
        </footer>
    </div>
</div>

<style>
    tr :global(th) {
        @apply border-none;
    }
</style>
