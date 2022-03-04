<script>
	import { page } from '$app/stores';
	import Standard from './layouts/Standard.svelte';
	import Empty from './layouts/Empty.svelte';
</script>

{#if $page.url.pathname != '/display'}
	<Standard><slot /></Standard>
{:else}
	<Empty><slot /></Empty>
{/if}
