<script lang="ts">
    import {sessionStore} from "../stores";

    const apiKey = "RiCuIUIgCU1fbN2FMBbtaBLY1Bqxjenehb2OJD1zTYAzSeB7WuHZ";

    async function LoadImages(user:string): Promise<any[]> {

        const res = await fetch(`https://book-upload-backend.stenbaek.no/Images?user=${user}`);

        console.log(res.status);
        const json = await res.json();
        console.log(json);

        return json;
    }
    
</script>

<div class="container">
    {#await LoadImages($sessionStore.user.email)}
        Laster bilder...
    {:then images} 
        {#each images as image}
            <div class="tile">
                <img src="{image.thumbnailUrl}" alt="image with id {image.id}" height="140" width="140"/>
                {image.name}
            </div>
        {/each}
    {:catch error}
        {error}
    {/await}
</div>

<style>
    .tile {
        float: left;
        overflow: hidden;
        width: 140px;
        height: 170px;
        background-color: white;
        margin: 10px;
        padding: 8px;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));        
    }

    .container {
        background-color: lightgray;
    }
</style>