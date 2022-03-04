<script type="js">
  export let hidden = true;
  function onClick() {
    hidden = !hidden
  }
</script>

<div class="w-full text-center mt-8">
	<button on:click={onClick} class="px-5 py-2.5 inline-block box-border bg-white border border-slate-300 hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center  dark:bg-slate-600 dark:text-white dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:border-slate-700 dark:focus:ring-slate-800">
		SETUP MY ORB(S)
  </button>
  <div class="{hidden ? 'hidden' : ''} w-full">
    <slot></slot>
  </div>
</div>