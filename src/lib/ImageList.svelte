<script lang="ts">
    import {sessionStore} from "../stores";
    import ImageTile from "./ImageTile.svelte";
    import { sleep } from "../utils/utils";

    const apiKey = "RiCuIUIgCU1fbN2FMBbtaBLY1Bqxjenehb2OJD1zTYAzSeB7WuHZ";
    let doLoadImages = LoadImages($sessionStore.user.email);

    export function Refresh() {
        doLoadImages = LoadImages($sessionStore.user.email);
    }

    async function LoadImages(user:string): Promise<any[]> {

        const res = await fetch(`https://book-upload-backend.stenbaek.no/Images?user=${user}`);
        console.log(res.status);
        const json = await res.json();
        console.log(json);
        return json;
    }

    async function DeleteImage(imageId:string) {
        console.log(`Deleting image ${imageId}`);
        const res = await fetch(
            `https://book-upload-backend.stenbaek.no/Images/Delete?id=${imageId}`, {
                method: "DELETE"});
        if (res.ok) {
            await sleep(1000);
            console.log(`Successfully deleted image ${imageId}`);
            Refresh();
        }
    }
    
</script>

<div>
    {#await doLoadImages}
        Laster bilder...
    {:then images} 
        {#each images as image}
            <ImageTile {image} on:delete={event => DeleteImage(event.detail)}/>
        {/each}
    {:catch error}
        {error}
    {/await}
</div>