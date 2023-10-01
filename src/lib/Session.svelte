<script lang="ts">
    import {onMount} from "svelte";    
    import { FacebookAuth } from '@beyonk/svelte-social-auth'
    import SessionData from "../utils/SessionData";
    import {sessionStore} from "../stores";
    import Picture from '../utils/Picture';
    import User from '../utils/User';
    import { dev } from '$app/environment';

    export let users:string[] = [];

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
<p>
    {#if !$sessionStore}
        <FacebookAuth 
            appId="644472207516388" 
            on:auth-success={onSuccess} />
    {:else}
        <h2><img alt="[{$sessionStore.user.name}s profile picture]" 
        src={$sessionStore.picture.url}/>{$sessionStore.user.name}</h2>

        {#if (users.length == 0)}
            <slot/>
        {:else if (users.includes($sessionStore.user.email))}        
            <slot/>
        {:else}
            <h2>
                You have no access to this page
            </h2>                
        {/if}
    {/if}


    
</p>

<style>
    p {
        margin: 0 20px 0 20px;
    }
</style>