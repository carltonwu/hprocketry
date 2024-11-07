<script>
    import "../tailwind.css";
    import { LightSwitch } from '@skeletonlabs/skeleton';

    let { children } = $props();
</script>

<LightSwitch />

{@render children()}