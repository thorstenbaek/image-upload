<script lang="ts">
    import { pageStore } from "../stores";
    import { sizeStore } from "../stores";
</script>
<div>
    Showing {$sizeStore} images on page {$pageStore}
    
    <a on:click={() => {$pageStore++}}>next</a>
    
    <a on:click={() => {$pageStore--}}>previous</a>
</div>