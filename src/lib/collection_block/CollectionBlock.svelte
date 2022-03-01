<script lang="js">
  import eth_logo from './eth.svg';
  import { browser } from '$app/env';

  const collection_slug = 'theorbsbybt';
  let image_source;
  let name;
  let statistics;

  function removeAllChildrenFromNode(node) {
    while (node.firstChild) { node.firstChild.remove() };
  }
  
  function kFormatter(num) {
    // @ts-ignore
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num) + '';
  }

  function update_banner(url) {
    const el = document.getElementById('banner');
    el.style.backgroundImage = 'url('+url+')';
  }

  function update_description(text) {
    const url_matcher = /https?:\/\/((www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/ig;
    const el = document.querySelector('#description span');
    removeAllChildrenFromNode(el)
    const strings = text.split("\n");
    strings.forEach(string => {
      let p = document.createElement('p');
      p.innerHTML = string.replace(url_matcher, (href, text) => "<a href=\""+href+"\">"+text+"</a>");
      el.appendChild(p);
    });
  }

  function getCollection(slug) {
    const options = {method: 'GET'};
    const url = 'https://api.opensea.io/api/v1/collection/' + slug;
    return fetch(url, options).then(response => response.json())
  }

  if (browser) {
    getCollection(collection_slug)
      .then(response => {
        const collection = response?.collection;
        if (!collection) {throw 'Collection not found.'}
        update_banner(collection?.banner_image_url);
        name = collection?.name
        image_source = collection?.image_url
        statistics = [{
          stat: kFormatter(collection?.stats.count),
          name: 'orbs',
        }, {
          stat: kFormatter(collection?.stats.num_owners),
          name: 'owners',
        }, {
          stat: collection?.stats.floor_price,
          name: 'floor price',
          type: 'eth',
        }, {
          stat: kFormatter(collection?.stats.total_volume),
          name: 'volume traded',
          type: 'eth',
        }];
      }).catch(console.error);
  }

</script>

<div class="mb-8 text-slate-200">
  <div id="banner" class="border-b-2 border-b-slate-800 bg-cover h-80 bg-red-50 -mt-12"></div>
  <div id="info" class="flex flex-col items-center -mt-64">
    <div id="image">
      <div id="image_border" class="rounded-full border-slate-800 border-2 border-solid h-32 w-32">
        {#if image_source}
          <img src={image_source} alt="Collection" class="object-cover w-full h-full">
        {/if}
      </div>
    </div>
    <div id="title" class="mt-2">
      <h1 class="text-4xl">{name}</h1>
    </div>
    {#if statistics}
      <div id="statistics" class="flex flex-row items-center mt-4 text-center w-full justify-evenly bg-slate-800/60">
        {#each statistics as item}
          <div class="mx-2">
            <div class="flex flex-row text-xl text-center items-center">
              <div class="w-full">
                {#if item.type === 'eth'}
                  <img class="h-5 w-5 inline-block" src={eth_logo} alt="SvelteKit" />
                {/if}
                <span>{item.stat}</span>
              </div>
            </div>
            <div class="text-xs">{item.name}</div>
          </div>
        {/each}
      </div>
    {/if}
    <!-- <div id="description" class="text-slate-200 mt-6">
      {@html description}
    </div> -->
  </div>
</div>

<style>
  #banner {
    background: no-repeat center/ contain;
    background-size: cover;
  }
</style>
