<script lang="js">
	import { writable } from 'svelte/store';
  import { browser } from '$app/env';

  function updateClass(theme) {
    const classList = document.documentElement.classList;
    const themeToApply = theme === 'system' ? systemTheme : theme;
    if (themeToApply === 'dark') {
      classList.add('dark');
      themeApplied = 'dark';
    } else {
      classList.remove('dark');
      themeApplied = 'light';
    }
  }
  let themeLoop;
  let themeValue;
  let systemTheme;
  let userPickedTheme;
  let themeApplied;
  const theme = writable('dark');

  if (browser) {
    systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    userPickedTheme = ('theme' in localStorage);
    let value = userPickedTheme ? localStorage.theme : 'system';
    themeLoop = ['dark', 'light', 'system']
      .filter(el => el !== value);
    themeLoop.unshift(value);
    theme.set(value);
  }
  theme.subscribe(value => {
    themeValue = value;
  });

  function switchTheme() {
    console.log(themeLoop);
    let currentIndex = themeLoop.indexOf(themeValue);
    let index = currentIndex === themeLoop.length - 1 ? 0 : currentIndex + 1;
    themeValue =themeLoop[index];
    if (browser) {
      localStorage.theme = themeValue;
    }
  }
  $: {
    theme.set(themeValue);
    if (browser) {
      updateClass(themeValue);
    }

  }
</script>

<button on:click={switchTheme}
  type="button"
  class="hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 rounded-lg text-sm p-2.5"
>
{#if themeValue === 'dark'}
  <svg
    class="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
    ></path>
  </svg>
{:else if themeValue === 'light'}
  <svg
    class="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
{:else if themeValue === 'system'}
  <svg
    class="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 21"
  >
    <path
      d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
      stroke-width="1"
      stroke-linejoin="round"
      class="stroke-slate-900 dark:stroke-slate-200"
    ></path>
    <path
      d="M14 15c0 3 2 5 2 5H8s2-2 2-5"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="stroke-slate-900 dark:stroke-slate-200"
    ></path>
  </svg>
{/if}
</button>
