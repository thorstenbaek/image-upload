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
    <!-- {#if active}
        <button class="delete-button" on:click={() => DeleteImage(image.id)}>X</button>
    {/if} -->
    <img class="thumbnail" src="{image.thumbnailUrl}" alt="image with id {image.id}" />
    <span class="title">{image.name}</span>
</div>

<style>
    .tile {
        float: left;
        overflow: hidden;
        width: 159px;
        height: 180px;
        background-color: white;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));        
        margin: 10px;
        padding: 8px;        
    }

    .title {
        display: inline-block;
        width: 100%;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .active {
        background-color: white;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));        
    }

    .thumbnail {
        max-height: 159px; 
        max-width: 159px;
    }

    .delete-button {
        position: absolute;
        top: 15px;
        right: 15px;
    }
</style>