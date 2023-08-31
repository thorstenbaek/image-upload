<script lang="ts">
    import {onMount} from "svelte";
    import {sessionStore} from "../stores";
    import ImageTile from "./ImageTile.svelte";
    import UploadTile from "./UploadTile.svelte";

    let uploads: any[];
    let images: any[];
    let status: any;

    onMount(async () => {
        await Refresh();
    });

    export async function Refresh() {
        images = await LoadImages($sessionStore.user.email);
    }

    export function AddUpload(upload: any) {
        uploads = [...uploads, upload];
    }

    async function LoadImages(user:string): Promise<any[]> {
        try {
            status = "Loading images..."
            const res = await fetch(`https://book-upload-backend.stenbaek.no/Images?user=${user}`);
            const json = await res.json();
            status = "";
            uploads = [];
            return json;    

        } catch (error) {
            status = error;
            throw(error);
        }
    }

    async function DeleteImage(imageId:string) {
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
    {#if uploads}   
        {#each uploads as upload}
            <UploadTile {upload}/>
        {/each}
    {/if}
    {#if images}        
        {#each images as image}
            <ImageTile {image} on:delete={event => DeleteImage(event.detail)}/>
        {/each}
    {/if}    
</div>