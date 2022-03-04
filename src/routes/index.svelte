<script type="js">
  import { page } from '$app/stores';
	import CollectionBlock from '$lib/collection_block/CollectionBlock.svelte';
	import Promotion from '$lib/promotion/Promotion.svelte';
	import SetupButton from '$lib/setup_button/SetupButton.svelte';
	import Configurator from '$lib/configurator/Configurator.svelte';

// let setup_hidden = false;
let do_not_query_opensea = true;

let ids = $page.url.searchParams.get('ids')?.split(',') || [];
let nbColumns = $page.url.searchParams.get('col');
let orientation = $page.url.searchParams.get('o');
let reverse = ($page.url.searchParams.get('r') === 'true') ? true : false;


</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<CollectionBlock do_not_query_opensea={do_not_query_opensea} />
<Promotion do_not_query_opensea={do_not_query_opensea} />
<!-- <SetupButton hidden={setup_hidden}> -->
<div class="w-full text-center mt-8">
	<Configurator ids={ids} nbColumns={nbColumns} orientation={orientation} reverse={reverse} />
</div>
<!-- </SetupButton> -->
