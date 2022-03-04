<script lang="js">
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import { data } from './mocked_api_response.js';

  export let do_not_query_opensea = false;
  let items = [];
  let other_items = []
  let promotion_width;
  let max_items_displayable;
  const asset_contract_address = '0x52e66ca968010d064938a8099a172cbaaf08c125';
  const items_total_width = 124 * 3;

  function getAsset(asset_contract_address, token_id) {
    if (do_not_query_opensea) {
      return Promise.resolve(data);
    } else {
      const options = {method: 'GET'};
      const url = 'https://api.opensea.io/api/v1/asset/'+asset_contract_address+'/'+ token_id +'/?include_orders=false'
      return fetch(url, options).then(response => response.json())
    }
  }
  function getRandomOrbNumber() {
    const min = 1;
    const max = 3333;
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function getItemData(id) {
    return getAsset(asset_contract_address, id)
      .then(response => ({
        image: response.image_preview_url,
        id: response.token_id,
        link: response.permalink,
      }));
  }
  function setItem(data) {
      items = [...items, {
        image: data.image,
        id: data.id,
        url: data.link,
      }];
    }
    function setOtherItem(data, before=false) {
      let item = {
        image: data.image,
        id: data.id,
        url: data.link,
        hidden: false,
      }
      if (before) {
        other_items = [item, ...other_items];
      } else {
        other_items = [...other_items, item];
      }
    }
    function reportWindowSize(event) {
      if (event.type === 'resize'){
        update_promotion_width()
          .then(calc_max_items_displayable);
      }
    }
    function update_promotion_width() {
      return new Promise((ok) => {
        // let el = document.getElementById('promotion');
        // let clientWidth = el.clientWidth;
        // let style = window.getComputedStyle(el);
        // let padding = parseInt(style.paddingLeft) + parseInt(style.paddingRight);
        // promotion_width = clientWidth - padding;
        promotion_width = window.outerWidth;
        ok(promotion_width);
      })
    }
    function roundToEven(value) {
      return Number.isNaN(value)
        ? 0.0
        : 2 * Math.floor(value / 2);
    }
    function calc_max_items_displayable(width) {
      max_items_displayable = roundToEven((width - items_total_width) / 108);
      return max_items_displayable;
    }
    function add_x_random_orbs(x) {
      [...Array(x)].reduce( (p, _, i) => 
        p.then(() => getItemData(getRandomOrbNumber()))
          .then(data => setOtherItem(data, i%2 === 0))
      , Promise.resolve() );
    }
    function hide_x_random_orbs(x) {
      let a = other_items.slice(0, other_items.length/2).filter(i => !i.hidden);
      let b = other_items.slice(other_items.length/2).filter(i => !i.hidden);
      
      [...Array(x/2)].forEach((_, i) => {
        if (a[i]) a[i].hidden = true;
        if (b[b.length-1-i]) b[b.length-1-i].hidden = true;
      });
      other_items = [...other_items];
    }
    function show_x_random_orbs(x) {
      let a = other_items.slice(0, other_items.length/2).filter(i => i.hidden);
      let b = other_items.slice(other_items.length/2).filter(i => i.hidden);

      [...Array(x/2)].forEach((_, i) => {
        if (a[i]) a.reverse()[i].hidden = false;
        if (b[b.length-1-i]) b.reverse()[b.length-1-i].hidden = false;
      });
      other_items = [...other_items];
    }
    function show_or_hide_other_items(max_items) {
      let nb_items = other_items.length;
      let nb_items_displayed = other_items.filter(i => i.hidden === false).length;
      if (max_items < nb_items_displayed) {
        let to_remove = nb_items_displayed - max_items;
        hide_x_random_orbs(to_remove);
      } else if (max_items > nb_items) {
        let to_add = max_items - nb_items;
        add_x_random_orbs(to_add);
        other_items.forEach(item => item.hidden = false);
      } else if (max_items > nb_items_displayed && max_items <= nb_items) {
        let to_show = max_items - nb_items_displayed;
        show_x_random_orbs(to_show);
      }
    }
    onMount(() => {
      if (browser) {
        let promise = update_promotion_width();
        window.addEventListener('resize', reportWindowSize);
        // The promoted orbs
        getItemData(getRandomOrbNumber())
          .then(data => setItem(data))
          .then(() => getItemData(getRandomOrbNumber()))
          .then(data => setItem(data))
          .then(() => getItemData(getRandomOrbNumber()))
          .then(data => setItem(data));
        // Random orbs
        promise.then(calc_max_items_displayable);

        // on unMouont
        return () => window.removeEventListener('resize', reportWindowSize);
      }
    });
  $: {
    show_or_hide_other_items(max_items_displayable);
  }
</script>

<div id="promotion" class="flex flex-row justify-center align-middle -mt-2 w-full">
  {#each other_items.slice(0, other_items.length / 2) as item}
  <div class="self-center {item.hidden ? 'hidden' : ''}">
    <div class="flex flex-col rounded-lg border-solid border-2 mx-1 border-slate-800 bg-slate-300/70 dark:bg-slate-500/70">
      <div class="h-24 w-24 cursor-pointer">
        <img id={item.id} src="{item.image}" alt="An Orb" class="object-cover w-full h-full rounded-t-lg">
      </div>
      <div class="text-xs flex flex-col justify-center items-center py-1 max-h-11">
        <div class="text-blue-300 underline"><span><a href="{item.url}" target="_blank">{item.id}</a></span></div>
      </div>
    </div>
  </div>    
  {/each}
  {#each items as item}
    <div class="flex flex-col rounded-lg border-solid border-2 mx-1 border-slate-800 bg-slate-300/70 dark:bg-slate-500/70">
      <div class="h-20 w-20 xs:h-28 xs:w-28 cursor-pointer">
        <img id={item.id} src="{item.image}" alt="An Orb" class="object-cover w-full h-full rounded-t-lg">
      </div>
      <div class="text-s flex flex-col justify-center items-center py-1">
        <div class="text-blue-300 underline"><span><a href="{item.url}" target="_blank">{item.id}</a></span></div>
      </div>
    </div>
  {/each}
  {#each other_items.slice(other_items.length / 2) as item}
  <div class="self-center {item.hidden ? 'hidden' : ''}">
    <div class="flex flex-col rounded-lg border-solid border-2 mx-1 border-slate-800 bg-slate-300/70 dark:bg-slate-500/70">
      <div class="h-24 w-24 cursor-pointer">
        <img id={item.id} src="{item.image}" alt="An Orb" class="object-cover w-full h-full rounded-t-lg">
      </div>
      <div class="text-xs flex flex-col justify-center items-center py-1 max-h-11">
        <div class="text-blue-300 underline"><span><a href="{item.url}" target="_blank">{item.id}</a></span></div>
      </div>
    </div>
  </div>
  {/each}
</div>
