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
        <div class="rotate">…</div>
    {/if}
</div>

<style>
    .hidden {
        display: none;
    }

    .hamburger {
        position: absolute;
        right: 0px;
        top: 15px;
        z-index: 1000;
        font-size: 22px;
        font-weight: bolder;
        text-align: center;
        color: white;
        width: 1.25em;
        cursor: pointer;
    }

    .rotate {
        position: absolute;
        color: white;
        cursor: pointer;
        transform: rotate(90deg);
        transform-origin: center center;
    }
</style>