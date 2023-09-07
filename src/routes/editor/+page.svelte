<script lang="ts">
    import ImageView from "../../lib/ImageView.svelte";

    let currentImage:any  = null;

    async function LoadImages(): Promise<any[]> {
        const res = await fetch(`https://book-upload-backend.stenbaek.no/search?query=*&page=0&pageSize=12`);
        const json = await res.json();
        console.log(json);
        return json;
    }
</script>

<h1>Images</h1>

{#if currentImage != null}
    <ImageView image={currentImage} on:close={() => currentImage = null}/>
{/if}

{#await LoadImages()}
    Loading...
{:then images}
        {#each images as image}
        <div class="card" on:click={(e) => currentImage = image}>
            <h2>
                {image.name}
            </h2>            
            <img class="preview" src="https://bookimagesstorageaccount.blob.core.windows.net/thumbnails/{image.id}" alt="{image.id}"/>
            <p>{image.description}</p>
            <p>{image.credits}</p>  
            <p>{new Date(image.eventDate).toLocaleDateString()}</p>         
        </div>
        {/each}
{:catch error}
    Failed: {error}
{/await}


<style>
    .card {
        float: left;
        margin: 10px;
        width: 250px;
        height: 350px;
    }

    .preview {
        max-width: 300px;
        max-height: 300px; 
    }

    :global(.rounded) {
        width: 128px;
        height: 32px;
        background-color: black;
        font-family: sans-serif;
        color: white;
        font-weight: bold;
        border: none;
        margin: 10px;
        border-radius: 15px;
    }    

    :global(.rounded:hover) {
        background-color: white;
        color: black;
        outline: black solid 2px;
    }

    :global(.rounded:disabled) {
        background-color: gray;
        color: white;
        outline: none;
    }
</style>