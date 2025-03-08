<script lang="ts">
    interface Props {
        isSorted?: boolean;
        isDescending?: boolean;
    }

    let { isSorted = false, isDescending = false }: Props = $props();
</script>

{#if isSorted}
    {#if isDescending}
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style="width: 15px;">
            <path d="M -249.971 -411.47 L -142.662 -278.166 L -357.279 -278.166 L -249.971 -411.47 Z" style="paint-order: fill; fill: rgb(31, 41, 55);" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
            <path d="M 248.235 -713.7 L 415.751 -537.465 L 80.719 -537.465 L 248.235 -713.7 Z" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
            <path d="M 250.029 88.53 L 357.338 221.834 L 142.721 221.834 L 250.029 88.53 Z" style="transform-box: fill-box; transform-origin: 50% 50%; fill: rgb(156, 163, 175);"></path>
        </svg>
    {:else}
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style="width: 15px;">
            <path d="M -249.971 -411.47 L -142.662 -278.166 L -357.279 -278.166 L -249.971 -411.47 Z" style="paint-order: fill; fill: rgb(156, 163, 175);" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
            <path d="M 248.235 -713.7 L 415.751 -537.465 L 80.719 -537.465 L 248.235 -713.7 Z" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
            <path d="M 250.029 88.53 L 357.338 221.834 L 142.721 221.834 L 250.029 88.53 Z" style="transform-box: fill-box; transform-origin: 50% 50%; fill: rgb(31, 41, 55);"></path>
        </svg>
    {/if}
{:else}
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style="width: 15px;">
        <path d="M -249.971 -411.47 L -142.662 -278.166 L -357.279 -278.166 L -249.971 -411.47 Z" style="paint-order: fill; fill: rgb(156, 163, 175);" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
        <path d="M 248.235 -713.7 L 415.751 -537.465 L 80.719 -537.465 L 248.235 -713.7 Z" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
        <path d="M 250.029 88.53 L 357.338 221.834 L 142.721 221.834 L 250.029 88.53 Z" style="transform-box: fill-box; transform-origin: 50% 50%; fill: rgb(156, 163, 175);"></path>
    </svg>
{/if}