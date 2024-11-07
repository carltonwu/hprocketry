<script lang="ts">    
    import { TableHandler, ThSort, ThFilter, check, Pagination, RowCount} from '@vincjo/datatables';
    import { Building2 } from 'lucide-svelte';

    export let table: TableHandler;

    const waiver_filter = table.createFilter('waiver', check.isGreaterThanOrEqualTo);
    const distance_filter = table.createFilter('distance', check.isLessThanOrEqualTo);

    const association_filter = table.createAdvancedFilter('association', check.isLike);

</script>


<div class="w-2/3 space-y-4">
    <div class="table-container">
        <table class="table table-hover table-compact table-auto w-full">
            <thead>
                <tr>
                    <td class="w-1/4"></td>
                    <td class="w-1/3 flex mt-4 items-end h-full">
                        <div class="flex space-x-4">
                            <label class="flex space-x-2">
                                <input 
                                    class="checkbox"
                                    type="checkbox"
                                    class:active={association_filter.criteria.includes("NAR")}
                                    oninput={() => association_filter.set("NAR")}
                                    checked
                                />
                                <p>NAR</p>
                            </label>
                            <label class="flex space-x-2">
                                <input 
                                    class="checkbox"
                                    type="checkbox"
                                    class:active={association_filter.criteria.includes("TRA")}
                                    oninput={() => association_filter.set("TRA")}
                                    checked
                                />
                                <p>TRA</p>
                            </label>
                        </div>
                    </td>
                    <td class="w-1/5 px-2">
                        <input 
                        class="input max-h-8" 
                        type="text" 
                        bind:value={waiver_filter.value} 
                        placeholder="Minimum Waiver" 
                        oninput={() => waiver_filter.set()}>
                    </td>
                    <td class="w-1/5 px-2">
                        <input 
                        class="input max-h-8" 
                        type="text" 
                        bind:value={distance_filter.value} 
                        placeholder="Maximum Distance" 
                        oninput={() => distance_filter.set()}>
                    </td>
                </tr>
                <tr>
                    <ThSort {table} field="launch_site">Launch Site</ThSort>
                    <ThSort {table} field="club">Club</ThSort>
                    <ThSort {table} field="waiver">Waiver</ThSort>
                    <ThSort {table} field="distance">Distance</ThSort>
                </tr>
                
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td>
                            <a href="/{row.club}/{row.launch_site}">
                            {row.launch_site}
                            </a>
                        </td>
                        <td>
                            <div class="flex space-x-2">
                                <a href="/{row.club}">
                                    {row.club}
                                </a>
                                {#if row.association.includes("NAR")} 
                                    <Building2 class="text-error-500"/>
                                {/if}
                                {#if row.association.includes("TRA")}
                                    <Building2 class="text-tertiary-500"/>
                                {/if}
                            </div>
                        </td>
                        <td>{row.waiver}</td>
                        <td>{row.distance}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <footer class="flex justify-between">
            <RowCount {table} />
            <Pagination {table} />
        </footer>
    </div>
</div>
