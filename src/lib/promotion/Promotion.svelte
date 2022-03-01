<script lang="js">
  import { browser } from '$app/env';

  let items = [];
  const asset_contract_address = '0x52e66ca968010d064938a8099a172cbaaf08c125';

  function getAsset(asset_contract_address, token_id) {
    const options = {method: 'GET'};
    const url = 'https://api.opensea.io/api/v1/asset/'+asset_contract_address+'/'+ token_id +'/?include_orders=false'
    return fetch(url, options).then(response => response.json())
  }
  function getRandomOrbNumber() {
    const min = 1;
    const max = 3333;
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function getItemData(id) {
    return getAsset(asset_contract_address, id)
      .then(response => ({
        collection_name: response.collection.name,
        image: response.image_preview_url,
        id: response.token_id,
        link: response.permalink,
      }));
  }

  if (browser) {
    function setItem(data) {
      items = [...items, {
        image: data.image,
        collection_name: data.collection_name,
        id: data.id,
        url: data.link,
      }];
    }

      getItemData(getRandomOrbNumber())
        .then(data => setItem(data))
        .then(() => getItemData(getRandomOrbNumber()))
        .then(data => setItem(data))
        .then(() => getItemData(getRandomOrbNumber()))
        .then(data => setItem(data));
  }
</script>

<div class="flex flex-row justify-center -mt-6 ">
  {#each items as item}
    <div class="flex flex-col cursor-text rounded-lg border-solid border-2 mx-1 border-slate-800 bg-slate-300/70 dark:bg-slate-500/70">
      <div class="h-28 w-28">
        <img src="{item.image}" alt="An Orb" class="object-cover w-full h-full rounded-t-lg">
      </div>
      <div class="text-xs flex flex-col justify-center items-center py-1">
        <div class="collection_name"><span>{item.collection_name}</span></div>
        <div class="mt-1 text-blue-300 underline"><span><a href="{item.url}" target="_blank">{item.id}</a></span></div>
      </div>
    </div>
  {/each}
</div>
