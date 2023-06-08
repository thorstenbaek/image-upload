<script lang="ts">
    import {clickOutside} from "../utils/clickOutside";

    let open: Boolean = false;
    let menu: Element;

    function handleOnClick(event: any) {
        open = !open;
    }

    function handleClickOutside(event: any) {
        if (open) {
            open = false;
        }
        
    }
</script>

<div bind:this={menu} class={!open?"hidden":""}>
    <slot />
</div>

<div class="hamburger" on:click={handleOnClick} use:clickOutside on:click_outside={handleClickOutside}>
    {#if open}
        X
    {:else}
        <span class="rotate90">…</span>
    {/if}
</div>

<style>
    .hidden {
        display: none;
    }

    .hamburger {
        font-size: 22px;
        font-weight: bolder;
        text-align: center;
        color: white;
        position: absolute;
        width: 1.25em;
        right: 8px;
        top: 15px;
    }

    .rotate90 {
        position: absolute;
        transform: rotate(90deg);
        transform-origin: center center;
    }
</style>