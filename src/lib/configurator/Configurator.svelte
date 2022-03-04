<script lang="js">
  import Grid from "$lib/grid/Grid.svelte";
  import OrbIdsInput from "./OrbIdsInput.svelte";
  import OrientationRadio from "./OrientationRadio.svelte";
  import ReverseRadio from "./ReverseRadio.svelte";
  import { browser } from '$app/env';

  const nbColumnsSuggestor = (n) => {
    const value = {1:1, 2:2, 3:3, 4:2, 5:2, 6:3, 7:3, 8:4, 9:3, 10:4}[n];
    return value || Math.floor(n / 2);
  }

  export let ids = [];
  export let nbColumns = nbColumnsSuggestor(ids.length);
  export let orientation;
  export let reverse;
  let final_url;
  let default_values = ids.join(', ')

  function inputUpdated(event) {
    const values = event?.detail?.ids;
    ids = values;
    nbColumns = nbColumnsSuggestor(ids.length);
  }

  function rangeUpdated(event) {
    const value = event?.target?.value;
    nbColumns = value;
  }

  function buildUrl(ids, nbColumns, orientation, reverse) {
    final_url = window.location.origin + '/display?ids=' + encodeURIComponent(ids.join(',')) +
      '&col=' + nbColumns + '&o=' + orientation + '&r=' + reverse;
    return final_url
  }

  $: {
    if (browser) {
      final_url = buildUrl(ids, nbColumns, orientation, reverse);
    }
  }
</script>

<div class="flex flex-col items-center justify-center mt-8">
  <div class="max-w-2xl w-full">
    <OrbIdsInput on:inputUpdated={inputUpdated} value={default_values}/>
    {#if ids.length > 0}
      <div class="mb-2 mt-2">
        <ReverseRadio bind:reverse={reverse} />
      </div>
      <OrientationRadio bind:orientation={orientation} />
      <label for="nbColumns" class="block mb-2 mt-4 text-sm font-medium">Number of {orientation === 'horizontal' ? 'columns' : 'rows'} ({nbColumns})</label>
      <input id="nbColumns" type="range" min="1" max={ids.length} value={nbColumns} on:input={rangeUpdated} class="w-full">
      <div class="h-56">
        <Grid htmlStringArray={ids} nbColumns={nbColumns} orientation={orientation} reverse={reverse} showBorders={true}/>
      </div>
      <div class="my-4">
        <input disabled id="final_url" value={final_url} type="text" class="bg-slate-50 border border-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-slate-400 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="my-4">
        <a href={final_url} target="_blank" class="px-5 py-2.5 inline-block box-border bg-white border border-slate-300 hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center  dark:bg-slate-600 dark:text-white dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:border-slate-700 dark:focus:ring-slate-800">
          RUN
        </a>    
      </div>
    {/if}
  </div>
</div>
