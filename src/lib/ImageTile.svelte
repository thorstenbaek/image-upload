<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import TileMenu from "./TileMenu.svelte"

    const dispatch = createEventDispatcher();
    
    export let image: any;

    function DeleteImage(id: string) {        
        dispatch("delete", id);
    }

</script>

<div class="tile">
    <img class="thumbnail" src="{image.thumbnailUrl}" alt="image with id {image.id}" />
    <TileMenu>
        <ul class="menu">
            <!-- <li>Edit</li> -->
            <li on:click={()=>DeleteImage(image.id)}>Delete</li>
        </ul>
    </TileMenu>
    <span class="title">{image.name}</span>
    
</div>

<style>
    .tile {
        position: relative;
        float: left;
        overflow: hidden;
        width: 149px;
        height: 178px;
        background-color: white;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));        
        margin: 10px;
        padding: 8px;        
    }

    .menu {
        position: absolute;
        right: 10px; top: 10px;
        list-style-type: none;
        margin: 0;
        padding: 0;
        padding: 10px 50px 10px 10px;
        overflow: hidden;
        color: white;
        font-family: sans-serif;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;        
    }

    .title {
        display: inline-block;
        width: 100%;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .thumbnail {
        max-height: 149px; 
        max-width: 149px;
    }
</style>