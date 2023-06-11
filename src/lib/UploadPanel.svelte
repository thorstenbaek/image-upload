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
            <button on:click={ () => fileInput.click() }>Last opp bilde</button>    
    {:else}    
    <div class="panel">
        <div>
            <img class="image" src="{imageToUpload}" alt="d"/>
        </div>
        <div>
            <form>
                <table>
                    <tr>
                        <td>
                            <label for="title">Tittel*:</label>
                        </td>
                        <td>
                            <input id="title" type="text" bind:value={title}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="eventDate">Hendelsesdato*:</label>
                        </td>
                        <td>
                            <DateInput id="eventDate" bind:date={eventDate}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="credits">Fotograf*:</label>
                        </td>
                        <td>
                            <input id="credits" type="text" bind:value={credits}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="description">Beskrivelse:</label>
                        </td>
                        <td>
                            <input id="description" type="text" bind:value={description}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="category">Kategori:</label>
                        </td>
                        <td>
                            <input id="category" type="text" bind:value={category}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="category">Kategori:</label>
                        </td>
                        <td>
                            <input id="category" type="text" bind:value={category}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button on:click={ () => {imageToUpload = null} }>Avbryt</button>    
                        </td>
                        <td>
                            <button on:click={ () => {upload(files[0])} }>Last opp bilde</button>
                        </td>
                    </tr>    
                </table>
            </form>
        </div>
    </div>
{/if}
<style>
    .panel {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background: lightgray;
    }

    form {
        margin: 25px;
    }
    .hidden {
        display: none;
    }

    .image {
        padding: 20px;
        max-width: 350px;
        max-height: 350px;
    }
</style>