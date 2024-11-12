<script>
    import Footer from "$lib/components/Footer.svelte";
    import NavigationBar from "$lib/components/NavBar.svelte";
    import "../tailwind.css";
    import { initializeStores, Modal } from "@skeletonlabs/skeleton";

    initializeStores();

    let { children } = $props();
    const name = $state("bob");
</script>

<Modal />
<NavigationBar />

<div class="overflow-x-auto">
    {@render children()}
</div>

<Footer />
