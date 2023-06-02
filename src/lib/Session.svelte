<script lang="ts">
    import type SessionData from "../utils/SessionData";
    import {sessionStore} from "../stores";
</script>
<p>
    <img alt="[{$sessionStore.user.name}s profile picture]" 
        src={$sessionStore.picture.url}/> 
    {$sessionStore.user.name}s opplastede bilder
</p>