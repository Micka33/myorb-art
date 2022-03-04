<script lang="ts">
  import Element from "./Element.svelte";
  export let htmlStringArray = [];
  export let nbColumns;
  export let orientation = 'horizontal';
  export let reverse = false; 
  export let showBorders = false;
  let grid_composition;

  function createComposition(nb_column, nb_elements, elements, reverse) {
    let composition = [];
    let nb_columns = nb_column;
    let nb_rows = Math.ceil(nb_elements / nb_columns);
    let middle_row_number = Math.ceil(nb_rows / 2) - 1;
    let middle_row_column_count = nb_elements % nb_columns;
    let middle_row_needed = middle_row_column_count > 0;
    while (nb_rows--) {
      let times = (middle_row_needed && nb_rows == middle_row_number) ? middle_row_column_count : nb_columns;
      let row = [];
      composition.push(row);
      while (times--) {
        row.push(elements.shift());
      }
    }
    if (reverse) composition.reverse();
    return composition;
  }

  $: {
    grid_composition = createComposition(nbColumns, htmlStringArray.length, [...htmlStringArray], reverse)
    console.log({ htmlStringArray })
  }
</script>

<div class="flex {orientation === 'horizontal' ? 'flex-col' : 'flex-row'} items-center w-full h-full">
  {#each grid_composition as row, col_num}
    <Element orientation={orientation} showBorders={showBorders}>
      {#each row as content, row_num}
        <Element orientation={orientation} showBorders={showBorders} >{@html (typeof content === 'function') ? content() : content}</Element>
      {/each}
    </Element>
  {/each}
</div>
