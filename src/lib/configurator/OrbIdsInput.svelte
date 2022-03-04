<script lang="js">
	import { createEventDispatcher } from 'svelte';

  export let value;

	const dispatch = createEventDispatcher();
  let errors = [];
  let previous_ids = [];

  function different_ids(ids, ids2) {
    return  ids.toString() !== ids2.toString();
  }

  function isNumeric(num) {
    return !isNaN(num)
  }
  function correct_ids(ids) {
    const result = ids.filter(id => !(isNumeric(id) && (+id > 0 && +id <= 3333)));
    if (result.length > 0) {
      errors = result.map(id => '['+id+'] Wrong ID.');
      return false;
    }
    return true
  }

  function onInput(event) {
    const data = event?.target.value;
    let ids = data.split(',').map((id) => id.trim()).filter(id => id !== '');
    if (!correct_ids(ids)) {
      ids = []
    } else {
      errors = []
    }
    if (different_ids(ids, previous_ids)) {
      previous_ids = ids;
      dispatch('inputUpdated', {
        ids: ids
      });
    }
  }
</script>

<div>
  <label for="orbs_ids" class="block mb-2 text-sm font-medium">Your Orb(s) ID(s)</label>
  <input on:input={onInput} value={value} type="text" id="orbs_ids" class="bg-slate-50 border border-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1, 2, 3, 4">
  <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
    Separate each Orb's ID with a comma (,).
  </p>
  <p class="min-h-[1.25rem] text-sm text-red-500 dark:text-red-400">
    {#if errors && errors.length > 0}
      {#each errors as error, index}
        <span>{error}</span>
        {#if index < errors.length - 1}<span> </span>{/if}
      {/each}
    {/if}
  </p>
</div>
