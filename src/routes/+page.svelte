<script lang="ts">
    import {onMount} from "svelte";    
    import { FacebookAuth } from '@beyonk/svelte-social-auth'
    import Session from "../lib/Session.svelte";
    import {sessionStore} from "../stores";
    import ImageList from "../lib/ImageList.svelte";
    import UploadPanel from "../lib/UploadPanel.svelte";
    import SessionData from "../utils/SessionData";
    import Picture from '../utils/Picture';
    import User from '../utils/User';
    import { dev } from '$app/environment';
    import Information from "$lib/Information.svelte";
    

    let status: string = "Uninitialized";
    let imageList: any;
    
    function fakeLogon() {
        var picture:Picture = new Picture(
                "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10159080085056021&height=50&width=50&ext=1687982817&hash=AeRq9Esi1ACkgSCMkm8", 
                150,150, false);
        var user:User = new User(123, "tst@dips.no", "Thor Stenbæk");
        $sessionStore = new SessionData(user, picture);            
        console.log($sessionStore);
    }

    onMount(() => {
        if (dev) { 
            fakeLogon();
        }
    })

    function onSuccess(event:CustomEvent) {    
        const FB: any = window['FB'];
        FB.api('/me', {fields: ['name', 'email', 'picture']}, (response: { picture: { data: { url: string; width: number; height: number; is_silhouette: boolean | undefined; }; }; id: number; email: string; name: string; }) => {
            console.log(response);
            var picture:Picture = new Picture(response.picture.data.url, response.picture.data.width, response.picture.data.height, response.picture.data.is_silhouette);            
            var user:User = new User(response.id, response.email, response.name);            
            $sessionStore = new SessionData(user, picture);            
            console.log($sessionStore);
        });
        
        console.log("Success: " + event.detail.userId);
    }

    
</script>

<div class="content">
    <h1>
        <img width="75" height="75" alt="Logo" src="Logo_100.png"/>
        Jubileumsboka
    </h1>

    {#if !$sessionStore}
        <FacebookAuth 
            appId="644472207516388" 
            on:auth-success={onSuccess} />

        
    {:else}
        <Session />

        <div class="container">    
            <UploadPanel on:uploaded={() => imageList.Refresh()}/>
            <ImageList bind:this={imageList}/>                      
        </div>
    {/if}
    <div class="bottompanel">
        <Information/>
    </div>
</div>

<style global>

    * {
        background: rgb(240, 240, 240);
    }

    h1 {
        
        padding: 2px 0 0 0;
        margin: 0;
    }

    .container { 
        width: 390px;                
    }
    
    .bottompanel {
        clear:both;
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
    
</style>