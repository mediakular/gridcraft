<script lang="ts">
    export let value = "";
</script>

<span>
    {!value || value === "" ? "-" : value}
</span>