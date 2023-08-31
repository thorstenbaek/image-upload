<script lang="ts">
    export let upload: any;
    let thumbSize: number = 149;
</script>

<div class="tile" style="padding: 5px 5px {thumbSize/15}px 5px;">
    <div class="center" style="width:{thumbSize}px;height:{thumbSize}px;">
        <img src="{upload.image}" alt="image with id {upload.id}" style="max-width:{thumbSize}px;max-height:{thumbSize}px"/>            
    </div>
    <div class="title" style="visibility:{thumbSize>120?'visible':'hidden'};max-width:{thumbSize}px">{upload.title}</div>   
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

    .title {
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }    
</style>