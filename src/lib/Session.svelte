<script lang="ts">
    import type SessionData from "../utils/SessionData";

    export var session: SessionData;
</script>
<p><img alt="[{session.user.name}s profile picture]" src={session.picture.url}/> {session.user.name}s opplastede bilder</p>