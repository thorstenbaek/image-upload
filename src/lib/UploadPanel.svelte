<script lang="ts">
    import DateInput from "./DateInput.svelte";
    import {sessionStore} from "../stores";
    import {createEventDispatcher} from "svelte";
    import { sleep } from "../utils/utils";

    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const dispatch = createEventDispatcher();
    let imageToUpload: any;
    let fileInput: HTMLInputElement;
    let files: FileList;
    
    let eventDate: Date = new Date();
    let title: string;
    let credits: string;
    let description: string;
    let category: string;

    async function upload(file: File): Promise<void> {        
        var formData = new FormData();
        formData.append("Blob", file);
        formData.append("Metadata.Name", title);
        formData.append("Metadata.Credits", credits);
        formData.append("Metadata.Description", description);
        formData.append("Metadata.Category", category);
        formData.append("Metadata.EventDate", eventDate.toDateString());
        formData.append("Metadata.Tags", "test, test");
        formData.append("Metadata.User", $sessionStore.user.email);

        var response = await fetch("https://book-upload-backend.stenbaek.no/Images/Upload", {
            method: "POST",
            body: formData
        });
        
        if(response.ok) {
            await sleep(1000);
            imageToUpload = null;            
            dispatch("uploaded");
        }
        
    }
        
    function getBase64(image:File):void {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async e => {
            if (e.target) {                
                imageToUpload = e.target.result
            }
        };        
    };    
</script>

{#if !imageToUpload}
        <input class="hidden" 
            id="file-to-upload" 
            type="file" accept={validExtensions.join(",")} 
            bind:files 
            bind:this={fileInput} 
            on:change={() => getBase64(files[0])}/>
        <button class="upload-btn" on:click={ () => fileInput.click() }>+</button>    
{:else}
    <div>
        <img class="image" src="{imageToUpload}" alt="d"/>
    </div>
    <div>
        <form>
            <p>
                <label for="title">Tittel*:</label>
                <input id="title" type="text" bind:value={title}/>
            </p>
            <p>
                <label for="eventDate">Hendelsesdato*:</label>
                <DateInput id="eventDate" bind:date={eventDate}/>
            </p>
            <p>
                <label for="credits">Fotograf*:</label>
                <input id="credits" type="text" bind:value={credits}/>
            </p>
            <p>
                <label for="description">Beskrivelse:</label>
                <input id="description" type="text" bind:value={description}/>
            </p>
            <p>
                <label for="category">Kategori:</label>
                <input id="category" type="text" bind:value={category}/>
            </p>
            <p>
                <button class="upload-btn" on:click={ () => {imageToUpload = null} }>Avbryt</button>    
                <button class="upload-btn" on:click={ () => {upload(files[0])} }>Last opp bilde</button>        
            </p>  
        </form>
    </div>

{/if}
<style>
    form { 
        display: table;
    }
    p { 
        display: table-row;  
    }
    label { 
        display: table-cell; 
    }
    input { 
        display: table-cell; 
    }
    button { 
        display: table-cell; 
    }

    .hidden {
        display: none;
    }

    .image {
        max-width: 400px;
        max-height: 400px;
    }

    .upload-btn {
        width: 128px;
        height: 32px;
        background-color: black;
        font-family: sans-serif;
        color: white;
        font-weight: bold;
        border: none;
        margin: 10px;
    }

    .upload-btn:hover {
        background-color: white;
        color: black;
        outline: black solid 2px;
    }
</style>