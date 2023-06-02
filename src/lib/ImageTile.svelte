<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    
    let active = false;
    export let image: any;

    function DeleteImage(id: string) {        
        dispatch("delete", id);
    }

</script>

<div class="tile" class:active={active} on:mouseenter={() => active=true} on:mouseleave={() => active=false} on:touchstart={() => active=true} on:touchend={() => active=false}>
    {#if active}
        <button class="delete-button" on:click={() => DeleteImage(image.id)}>X</button>
    {/if}
    <img class="thumbnail" src="{image.thumbnailUrl}" alt="image with id {image.id}" />
    {image.name}
</div>

<style>
    .tile {
        float: left;
        overflow: hidden;
        width: 140px;
        height: 170px;
        background-color: rgb(245, 245, 245);
        margin: 10px;
        padding: 8px;
        
    }

    .active {
        background-color: white;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));        
    }

    .thumbnail {
        max-height: 140px; 
        max-width: 140px;
    }

    .delete-button {
        position: absolute;
        top: 15px;
        right: 15px;
    }
</style>