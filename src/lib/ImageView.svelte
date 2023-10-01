<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let image: any;
</script>

<div class="fullscreen">
    <img class="preview" src="https://bookimagesstorageaccount.blob.core.windows.net/images/{image.id}" alt="{image.id}"/>
    <button class="rounded closeButton" on:click={ () =>dispatch("close") }>Lukk</button>        
</div>

<style>
    .fullscreen {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.9);
        vertical-align: center;
        text-align: center;
    }

    .closeButton {
        position: absolute;
        right: 75px;
        top: 25px;
        z-index: 900;
    }

    .preview {
        left: 25px;
        top: 25px;
        max-width: calc(100% - 50px);
        max-height: calc(100% - 50px);
    }
</style>