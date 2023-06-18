<script lang="ts">
    import {onMount} from "svelte";
    import {marked} from "marked";

    let html: string;

    onMount(async () => {
        const res = await fetch("https://raw.githubusercontent.com/thorstenbaek/image-upload/main/README.md");
        const markDown = await res.text();
        html = marked(markDown);

    });

</script>

<div class="content">
    {@html html}
</div>

<style>
    .content {
        padding: 15px;
        max-width: 360px;
    }
</style>