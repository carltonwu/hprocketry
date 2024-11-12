<script lang="ts">
    import { AppBar, LightSwitch } from "@skeletonlabs/skeleton";
    import { Rocket } from "lucide-svelte";
    import NavBarItem from "./NavBarItem.svelte";
</script>

<AppBar
    background={"!text-body bg-gradient-to-r from-tertiary-800 to-tertiary-900"}
>
    <svelte:fragment slot="lead">
        <Rocket size="32" class="text-primary-100" />
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <div class="flex space-x-8 items-center">
            <NavBarItem name={"Home"} url={"/"} />
            <NavBarItem name={"Launch Sites"} url={"/launchsites"} />
            <LightSwitch />
        </div>
    </svelte:fragment>
</AppBar>
