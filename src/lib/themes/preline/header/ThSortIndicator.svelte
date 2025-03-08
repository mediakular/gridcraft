<script lang="ts">
    interface Props {
        isSorted?: boolean;
        isDescending?: boolean;
    }

    let { isSorted = false, isDescending = false }: Props = $props();
</script>

<div class="shrink-0 w-4 h-4">
    {#if isSorted}
        {#if isDescending}
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path d="M -249.971 -411.47 L -142.662 -278.166 L -357.279 -278.166 L -249.971 -411.47 Z" style="paint-order: fill;" class="fill-gray-800 dark:fill-gray-300" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
                <path d="M 250.029 88.53 L 357.338 221.834 L 142.721 221.834 L 250.029 88.53 Z" style="transform-box: fill-box; transform-origin: 50% 50%;"  class="fill-gray-400 dark:fill-gray-600"></path>
            </svg>
        {:else}
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path d="M -249.971 -411.47 L -142.662 -278.166 L -357.279 -278.166 L -249.971 -411.47 Z" style="paint-order: fill;" class="fill-gray-400 dark:fill-gray-600" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
                <path d="M 250.029 88.53 L 357.338 221.834 L 142.721 221.834 L 250.029 88.53 Z" style="transform-box: fill-box; transform-origin: 50% 50%" class="fill-gray-800 dark:fill-gray-300" ></path>
            </svg>
        {/if}
    {:else}
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M -249.971 -411.47 L -142.662 -278.166 L -357.279 -278.166 L -249.971 -411.47 Z" style="paint-order: fill;" class="fill-gray-400 dark:fill-gray-600" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
            <path d="M 250.029 88.53 L 357.338 221.834 L 142.721 221.834 L 250.029 88.53 Z" style="transform-box: fill-box; transform-origin: 50% 50%;" class="fill-gray-400 dark:fill-gray-600"></path>
        </svg>
    {/if}
</div>