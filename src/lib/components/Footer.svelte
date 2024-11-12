<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton";
</script>

<AppBar background={"h-32 opacity-40"}>
    <svelte:fragment slot="lead"></svelte:fragment>
    <svelte:fragment slot="trail"></svelte:fragment>
</AppBar>
