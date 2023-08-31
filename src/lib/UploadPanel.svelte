<script lang="ts">
    import DateInput from "./DateInput.svelte";
    import {sessionStore} from "../stores";
    import {createEventDispatcher} from "svelte";
 
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const dispatch = createEventDispatcher();
    
    let files: FileList;
    let uploads: any[] = [];
    let canUpload = true;
    
    let fileInput: HTMLInputElement;
    
    let eventDate: Date = new Date();
    let title: string;
    let credits: string = $sessionStore.user.name;
    let description: string;
    
    let selectedCategory: string;
    let categories = ["UK", "MK", "JK", "AK", "annet"];

    async function upload(): Promise<void> {        
        
        canUpload = false;

        var responses: Array<any> = new Array<any>();

        var index: number = 0;
        
        //Consider using await Promise.all(uploads.map(async (upload) => {... here
        //Also see if each item can be created and added to image list before upload - displaying status all the way
        for(const upload of uploads) {
            var formData = new FormData();

            var defaultTitle = upload.file.name.replace(/\.[^/.]+$/, "");            

            formData.append("Blob", upload.file)
            formData.append("Metadata.Name", title ?? defaultTitle);
            formData.append("Metadata.Credits", credits);
            formData.append("Metadata.Description", description ?? defaultTitle);
            formData.append("Metadata.Category", selectedCategory);
            formData.append("Metadata.EventDate", eventDate.toDateString());
            formData.append("Metadata.Tags", "test, test");
            formData.append("Metadata.User", $sessionStore.user.email);            

            var response = await fetch("https://book-upload-backend.stenbaek.no/Images/Upload", {
                method: "POST",
                body: formData
            });
            var newId = await response.text();            
            responses.push({response: response, id:newId, image:upload.image, title:title ?? defaultTitle});

            index++;
        };            
        
        responses.forEach(response => {
            if (!response.response.ok) {
                console.error("upload failed");
                return; //display error
            }
        });
        dispatch("uploaded", {responses});
        uploads = [];     
        canUpload = true;               
    }
        
    function readFiles(files:FileList):void {                
        const filesArray = Array.from(files);        
        filesArray.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async e => {
                if (e.target) {                
                    uploads = [...uploads, {id: "", file: file, image:<string>e.target.result}];              
                }
            };        
        });
    };    
    
</script>
    {#if uploads.length == 0}
        <input class="hidden" 
            id="file-to-upload" 
            type="file" accept={validExtensions.join(",")} 
            bind:files
            multiple
            bind:this={fileInput} 
            on:change={() => readFiles(files)}/>
        <button class="rounded" on:click={ () => fileInput.click() }>Last opp bilder</button>        
    {:else}
    <div class="panel">
        <div class="preview">
            {#each uploads as upload, index}
                <!-- <span style="position:absolute;top={index*10}px;left={index*10}px"> -->
                <img style="position:absolute;top:{index*10}px;left:{index*10}px" class="image" src="{upload.image}" alt="preview of upload" />
            {/each}
        </div>
        <div>
            <form>
                <table>
                    <!-- <tr>
                        <td>
                            <label for="title">Tittel*:</label>
                        </td>
                        <td>
                            <input id="title" type="text" bind:value={title}/>
                        </td>
                    </tr> -->
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
                            <input id="credits" type="text" bind:value={credits} />
                        </td>
                    </tr>                    
                    <!-- <tr>
                        <td>
                            <label for="description">Beskrivelse:</label>
                        </td>
                        <td>
                            <input id="description" type="text" bind:value={description}/>
                        </td>
                    </tr> -->
                    <tr>
                        <td>
                            <label for="category">Korps:</label>
                        </td>
                        <td>
                            <!-- <input id="category" type="dropdown" bind:value={category}/> -->
                            <select bind:value={selectedCategory}>
                                {#each categories as category}
                                    <option value={category}>
                                        {category}
                                    </option>
                                {/each}
                            </select>
                        </td>
                    </tr>                    
                    <tr>
                        <td>
                            <button class="rounded" on:click={ () => {uploads = []} }>Avbryt</button>    
                        </td>
                        <td>
                            <button class="rounded" disabled={!canUpload} on:click={ () => {upload()} }>Last opp bilder</button>
                        </td>
                    </tr>    
                </table>
            </form>
        </div>
    </div>
{/if}
<style>
    .preview {
        position: relative;
        height: 420px;        
    }

    .panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        min-height: 100vh;
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