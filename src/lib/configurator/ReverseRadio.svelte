<script lang="js">
  export let reverse = false;

  function isReversed() { return reverse == true }

	function onChange(event) {
    let value = event.currentTarget.value;
		reverse = (value === 'false') ? false : true;
	}
</script>

<fieldset>
  <legend class="sr-only">reversed order</legend>
  <div class="flex flex-row items-center justify-center">
    <div class="flex items-center w-full justify-center">
      <label for="reversed-option-1" class="block mr-2 text-sm font-medium">
        Standard
      </label>
      <input checked={!isReversed()} on:change={onChange} id="reversed-option-1" type="radio" name="reversed" value="false" class="w-4 h-4 focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 dark:focus:bg-slate-600 dark:bg-slate-700 dark:border-slate-600" aria-labelledby="reversed-option-1" aria-describedby="reversed-option-1">
    </div>
    <div class="flex items-center w-full justify-center">
      <input checked={isReversed()} on:change={onChange} id="reversed-option-2" type="radio" name="reversed" value="true" class="w-4 h-4 focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 dark:focus:bg-slate-600 dark:bg-slate-700 dark:border-slate-600" aria-labelledby="reversed-option-2" aria-describedby="reversed-option-2">
      <label for="reversed-option-2" class="block ml-2 text-sm font-medium">
        Reversed
      </label>
    </div>    
  </div>
</fieldset>
