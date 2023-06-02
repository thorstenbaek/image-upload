<script lang="ts">
    import {onMount} from "svelte";    
    import { FacebookAuth } from '@beyonk/svelte-social-auth'
    import Session from "../lib/Session.svelte";
    import {sessionStore} from "../stores";
    import ImageList from "../lib/ImageList.svelte";
    import SessionData from "../utils/SessionData";
    import Picture from '../utils/Picture';
    import User from '../utils/User';
    
    let fileInput: HTMLInputElement;
    let files: FileList;

    let status: string = "Uninitialized";
    
    function fakeLogon() {
        var picture:Picture = new Picture(
                "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10159080085056021&height=50&width=50&ext=1687982817&hash=AeRq9Esi1ACkgSCMkm8", 
                150,150, false);
        var user:User = new User(123, "tst@dips.no", "Thor Stenbæk");
        $sessionStore = new SessionData(user, picture);            
        console.log($sessionStore);
    }

    onMount(() => {
        fakeLogon();
    })

    function onSuccess(event:CustomEvent) {    
        const FB: any = window['FB'];
        FB.api('/me', {fields: ['name', 'email', 'picture']}, response => {
            console.log(response);
            var picture:Picture = new Picture(response.picture.data.url, response.picture.data.width, response.picture.data.height, response.picture.data.is_silhouette);            
            var user:User = new User(response.id, response.email, response.name);            
            $sessionStore = new SessionData(user, picture);            
            console.log($sessionStore);
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
            }
        };        
    };    
</script>

<img width="50" height="50" alt="Logo" src="Logo_100.jpg"/>
<h1>Lillestrøm skolekorps jubileumsbok</h1>


{#if !$sessionStore}
<FacebookAuth 
    appId="644472207516388" 
    on:auth-success={onSuccess} />
{:else}

<Session />

<div class="container">    
   

    <form>
        <input class="hidden" id="file-to-upload" type="file" accept=".png,.jpg" bind:files bind:this={fileInput} on:change={() => getBase64(files[0])}/>
        <button class="upload-btn" on:click={ () => fileInput.click() }>Last opp bilde</button>    
    </form>

    <ImageList/>

</div>
{/if}

<style>
    .container { 
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* #avatar {
        border-radius: 99999px;
        height: 128px;
        width: 128px;
        margin-bottom: 10px;
    } */

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