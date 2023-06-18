<script lang="ts">
    import {onMount} from "svelte";
    import {sessionStore} from "../stores";
    import ImageTile from "./ImageTile.svelte";

    let images: any[];
    let status: any;

    onMount(async () => {
        await Refresh();
    });

    export async function Refresh() {
        images = await LoadImages($sessionStore.user.email);
    }

    async function LoadImages(user:string): Promise<any[]> {
        try {
            status = "Loading images..."
            const res = await fetch(`https://book-upload-backend.stenbaek.no/Images?user=${user}`);
            const json = await res.json();
            status = ""
            return json;    

        } catch (error) {
            status = error;
            throw(error);
        }
    }

    async function DeleteImage(imageId:string) {
        console.log(`Deleting image ${imageId}`);
        const res = await fetch(
            `https://book-upload-backend.stenbaek.no/Images/Delete?id=${imageId}`, {
                method: "DELETE"});
        if (res.ok) {
            images = images.filter(i => i.id != imageId);
            console.log(`Successfully deleted image ${imageId}`);
        }
    }
    
</script>

<div>
    <p>{status}</p>
    {#if images}
        {#each images as image}
            <ImageTile {image} on:delete={event => DeleteImage(event.detail)}/>
        {/each}
    {/if}    
</div>