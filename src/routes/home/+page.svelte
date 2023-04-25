<script lang="ts">
    import { token } from "../../stores";
    import jwt_decode from "jwt-decode"
    import FacebookLogin from "svelte-facebook-login";
    
    let fileInput: HTMLInputElement;
    let files: FileList;
    let avatar: string | null | undefined;

    let status: string = "Uninitialized";

//     window.handleCredentialResponse = (response) => {
//   jwt_decode() 
//   to decode the credential response.
//   let responsePayload = jwt_decode(response.credential);
//   console.log("Token: " + response.credential)
//   console.log("Token: ", responsePayload)
//   console.log("ID: " + responsePayload.sub);
//   console.log('Full Name: ' + responsePayload.name);
//   console.log('Given Name: ' + responsePayload.given_name);
//   console.log('Family Name: ' + responsePayload.family_name);
//   console.log("Image URL: " + responsePayload.picture);
//   console.log("Email: " + responsePayload.email);

// }
    
    function onSuccess(params:any) {
        
        var claims = jwt_decode(params.authResponse.accessToken);

        status = "Success: " + claims
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

<FacebookLogin
    clientId="644472207516388"
    scope="email public_profile"
    responseType="token"
    state="1"
    redirectUri="http://localhost:5173/login"    
    on:success={params => console.log('success', params.authResponse.accessToken)}
    on:error={error => console.log('error', error.detail)}
    let:onLogin>
    <button on:click={onLogin}>Facebook Login</button>    
</FacebookLogin>

<div>{status}</div>

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