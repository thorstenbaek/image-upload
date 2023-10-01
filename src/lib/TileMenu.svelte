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
        <div class="rotate_shadow">…</div>
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
        top: 0.5em;
        z-index: 1000;
        font-size: 22px;
        font-weight: bolder;
        color: white;
        width: .75em;
        cursor: pointer;
    }

    .rotate {
        position: absolute;
        transform: rotate(90deg);
    }
    
    .rotate_shadow {
        position: absolute;
        color: #333333;
        transform: translate(1px, 1px) rotate(90deg);                
    }
</style>