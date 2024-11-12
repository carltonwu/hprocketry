<script lang="ts">
    import { page } from "$app/stores";

    let props = $props();
    let path = $derived($page.url.pathname);
</script>

<a href={props.url}>
    <div class="flex w-full items-center justify-center">
        <span
            class="h3 relative top-0 w-full justify-center flex bg-gradient-to-r from-primary-300 via-tertiary-200 to-primary-200 items-center bg-clip-text font-bold text-transparent"
        >
            <span
                class="h4 absolute flex border w-full bg-gradient-to-r from-primary-300 via-tertiary-200 to-primary-200 blur-md bg-clip-text font-bold text-transparent"
            >
                {props.name}
            </span>
            {props.name}
        </span>
    </div>
</a>
