<script lang="ts">    
    import { FacebookAuth } from '@beyonk/svelte-social-auth'
    import Session from "../lib/Session.svelte";
    import SessionData from "../utils/SessionData";
    import Picture from '../utils/Picture';
    import User from '../utils/User';
    
    let fileInput: HTMLInputElement;
    let files: FileList;
    let avatar: string | null | undefined;

    let status: string = "Uninitialized";
    let session: SessionData = null;
    
    function onSuccess(event:CustomEvent) {
    
        const FB: any = window['FB'];
        FB.api('/me', {fields: ['name', 'email', 'picture']}, response => {
            console.log(response);
            var picture:Picture = new Picture(response.picture.data.url, response.picture.data.width, response.picture.data.height, response.picture.data.is_silhouette);
            var user = new User(response.id, response.email, response.name, picture);
            session = new SessionData(user, picture);
            console.log(session);
        });
        
        console.log("Success: " + event.detail.userId);
    }

    async function upload(imgBase64: string): Promise<void> {
        const imageData = imgBase64.split(",");

        var formData = new FormData();
        formData.append("image", imageData[1]);

        await fetch("./?/upload", {
            method: "POST",
            body: formData
        });        
    }
        
    function getBase64(image:File):void {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async e => {
            if (e.target) {                
                await upload(e.target.result as string);
                avatar = e.target.result as string;
            }
        };        
    };
</script>

<img width="50" height="50" alt="Logo" src="Logo_100.jpg"/>
<h1>Lillestrøm skolekorps jubileumsbok</h1>

{#if !session}
<FacebookAuth 
    appId="644472207516388" 
    on:auth-success={onSuccess} />
{:else}
<Session {session}/>

<div class="container">    
    {#if avatar}
        <img id="avatar" src={avatar} alt="avatar"/>
    {:else}
        <img id="avatar" src="avatar.png" alt="avatar"/>
    {/if}

    <form>
        <input class="hidden" id="file-to-upload" type="file" accept=".png,.jpg" bind:files bind:this={fileInput} on:change={() => getBase64(files[0])}/>
        <button class="upload-btn" on:click={ () => fileInput.click() }>Upload</button>    
    </form>
</div>
{/if}

<style>
    .container { 
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #avatar {
        border-radius: 99999px;
        height: 128px;
        width: 128px;
        margin-bottom: 10px;
    }

    .hidden {
        display: none;
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