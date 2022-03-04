<script type="js">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
	import CollectionBlock from '$lib/collection_block/CollectionBlock.svelte';
	import Promotion from '$lib/promotion/Promotion.svelte';
	import SetupButton from '$lib/setup_button/SetupButton.svelte';
	import Configurator from '$lib/configurator/Configurator.svelte';
  import { onMount } from 'svelte';

	// let setup_hidden = false;
	let do_not_query_opensea = false;

	let ids = [];
	let nbColumns;
	let orientation = 'horizontal';
	let reverse = false;

	function updateParam(key, value) {
		const params = $page.url.searchParams;
		(params.has(key) ? params.set(key, value) : params.append(key, value));
		window.history.replaceState({}, '', `${$page.url.pathname}?${params}`);
	}

	if (browser) {
		ids = $page.url.searchParams.get('ids')?.split(',')?.filter(e => e != '') || [];
		nbColumns = $page.url.searchParams.get('col');
		orientation = $page.url.searchParams.get('o') || 'horizontal';
		reverse = ($page.url.searchParams.get('r') === 'true') ? true : false;
	}

	$:{
		if (browser) {
			updateParam('ids', ids.join(','));
			updateParam('col', nbColumns);
			updateParam('o', orientation);
			updateParam('r', reverse.toString());
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<CollectionBlock do_not_query_opensea={do_not_query_opensea} />
<Promotion do_not_query_opensea={do_not_query_opensea} />
<!-- <SetupButton hidden={setup_hidden}> -->
<div class="w-full text-center mt-8 px-2">
	<Configurator bind:ids={ids} bind:nbColumns={nbColumns} bind:orientation={orientation} bind:reverse={reverse} />
</div>
<!-- </SetupButton> -->
