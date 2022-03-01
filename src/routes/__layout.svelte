<script>
	import Header from '$lib/header/Header.svelte';
	import CollectionBlock from '$lib/collection_block/CollectionBlock.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
