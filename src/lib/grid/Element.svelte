<script lang="ts">
  export let orientation = 'horizontal';
  export let showBorders = false;
</script>

<div class="flex {orientation === 'horizontal' ? 'flex-row' : 'flex-col'} items-center justify-center w-full h-full {showBorders ? 'box-border border-slate-700 border-solid border-[1px]' : ''}">
  <slot>test</slot>
</div>
