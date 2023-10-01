<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import TileMenu from "./TileMenu.svelte"

    const dispatch = createEventDispatcher();
    
    export let image: any;
    let thumbSize: number = 149;

    function DeleteImage(id: string) {        
        dispatch("delete", id);
    }

</script>

<div class="tile" style="padding: 5px 5px {thumbSize/15}px 5px;">
    <div class="center" style="width:{thumbSize}px;height:{thumbSize}px;">
        <img src="{image.thumbnailUrl}" alt="image with id {image.id}" style="max-width:{thumbSize}px;max-height:{thumbSize}px"/>
        <TileMenu>
            <ul class="menu">
                <!-- <li>Edit</li> -->
                <li tabindex="-1" on:mouseup={()=>DeleteImage(image.id)}>Slett</li>
            </ul>
        </TileMenu>
    </div>
    <div class="title" style="visibility:{image.name != "undefined" ? 'inherited':'hidden'};width:{thumbSize}px">{image.name}</div>
</div>

<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }

    .tile {        
        position: relative;
        text-align: center;        
        float: left;
        overflow: hidden;
        background-color: white;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));        
        margin: 10px;
    }

    .menu {
        position: absolute;
        right: 5px; top: 5px;
        list-style-type: none;
        margin: 0;
        padding: 0;
        padding: 10px 25px 10px 10px;
        overflow: hidden;
        color: white;
        font-family: sans-serif;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;        
    }

    .title {
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }    
</style>