<script lang="js">
  export let orientation = 'horizontal';

  function isVertical() { return orientation === 'vertical' }

	function onChange(event) {
		orientation = event.currentTarget.value;
	}
</script>

<fieldset>
  <legend class="sr-only">orientation</legend>
  <div class="flex flex-row items-center justify-center">
    <div class="flex items-center w-full justify-center">
      <label for="orientation-option-1" class="block mr-2 text-sm font-medium">
        horizontal
      </label>
      <input checked={!isVertical()} on:change={onChange} id="orientation-option-1" type="radio" name="orientation" value="horizontal" class="w-4 h-4 focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 dark:focus:bg-slate-600 dark:bg-slate-700 dark:border-slate-600" aria-labelledby="orientation-option-1" aria-describedby="orientation-option-1">
    </div>
    <div class="flex items-center w-full justify-center">
      <input checked={isVertical()} on:change={onChange} id="orientation-option-2" type="radio" name="orientation" value="vertical" class="w-4 h-4 focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 dark:focus:bg-slate-600 dark:bg-slate-700 dark:border-slate-600" aria-labelledby="orientation-option-2" aria-describedby="orientation-option-2">
      <label for="orientation-option-2" class="block ml-2 text-sm font-medium">
        vertical
      </label>
    </div>    
  </div>
</fieldset>
