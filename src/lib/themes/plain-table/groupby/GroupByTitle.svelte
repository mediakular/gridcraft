<script lang="ts">
    export let content = "";
</script>

<span>
    {!content || content === "" ? "-" : content}
</span>