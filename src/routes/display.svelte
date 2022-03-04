<script lang="js">
  import { page } from '$app/stores';
  import Grid from "$lib/grid/Grid.svelte";
  import { onMount } from 'svelte';

  const asset_contract_address = '0x52e66ca968010d064938a8099a172cbaaf08c125';
  let ids = $page.url.searchParams.get('ids').split(',');
  let nbColumns = $page.url.searchParams.get('col');
  let orientation = $page.url.searchParams.get('o');
  let reverse = ($page.url.searchParams.get('r') === 'true') ? true : false;
  let htmlStringArray = [];

  function getAsset(asset_contract_address, token_id) {
      const options = {method: 'GET'};
      const url = 'https://api.opensea.io/api/v1/asset/'+asset_contract_address+'/'+ token_id +'/?include_orders=false'
      return fetch(url, options).then(response => response.json())
    }

  onMount(() => {
    ids.reduce( (p, id) => 
        p.then(() => {
          return getAsset(asset_contract_address, id)
            .then(response => response?.animation_original_url)
            .then(url => {
              let iframe = '<iframe allow="autoplay; encrypted-media; picture-in-picture; display-capture" frameborder="0" height="100%" sandbox="allow-scripts" src="'+url+'" width="100%"></iframe>';
              htmlStringArray.push(iframe);
            })
          })
      , Promise.resolve() )
      .then(() => htmlStringArray = [...htmlStringArray])
  });

</script>

<Grid htmlStringArray={htmlStringArray} nbColumns={nbColumns} orientation={orientation} reverse={reverse}/>
