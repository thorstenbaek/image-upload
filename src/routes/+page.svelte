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
        // fakeLogon();
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


<h1><img width="50" height="50" alt="Logo" src="Logo_100.jpg"/> Lillestrøm skolekorps jubileumsbok</h1>


{#if !$sessionStore}
<FacebookAuth 
    appId="644472207516388" 
    on:auth-success={onSuccess} />
{:else}

<Session />

<div class="container">    
    <UploadPanel on:uploaded={() => imageList.Refresh()}/>
    <ImageList bind:this={imageList}/>
    <button on:click={imageList.Refresh()}>Refresh</button>
</div>
{/if}

<style>
    .container { 
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>