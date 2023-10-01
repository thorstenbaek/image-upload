<script lang="ts">
    import Session from "../lib/Session.svelte";
    import ImageList from "../lib/ImageList.svelte";
    import UploadPanel from "../lib/UploadPanel.svelte";        
    import Information from "$lib/Information.svelte";

    let imageList: any;
</script>

<div class="content">
    <h1>
        <img width="75" height="75" alt="Logo" src="Logo_100.png"/>
        Jubileumsboka
    </h1>
    <Session>
        <div class="container">    
            <UploadPanel on:uploaded={onUploaded}/>
            <ImageList bind:this={imageList}/>                      
        </div>
    </Session>
    
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

    :global(.rounded:disabled) {
        background-color: gray;
        color: white;
        outline: none;
    }

    
</style>