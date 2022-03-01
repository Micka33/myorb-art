<script lang="ts">
	import { page } from '$app/stores';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="flex justify-center">
	<!-- <div class="w-12 h-12">
		<a class="flex items-center justify-center w-full h-full" href="https://github.com/Micka33/myorb-art">
			<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true">
				<path
					class="fill-slate-200"
					fill-rule="evenodd"
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
			</svg>
		</a>
	</div> -->

	<nav class="flex justify-center">
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path class="fill-slate-300/70 dark:fill-slate-500/70" d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul class="bg-slate-300/70 dark:bg-slate-500/70">
			<li class="active:before:border-t-slate-900 dark:active:before:border-t-slate-200 {$page.url.pathname === '/about' ? 'active': ''}">
				<a class="hover:text-slate-900 dark:hover:text-slate-200" href="https://www.theorbs.io/" target="_blank">The Orbs.io</a>
			</li>
			<!-- <li class="active:before:border-t-slate-900 dark:active:before:border-t-slate-200 {$page.url.pathname === '/' ? 'active': ''}">
        <a class="hover:text-slate-900 dark:hover:text-slate-200" sveltekit:prefetch href="/">Home</a>
      </li> -->
			<li class="active:before:border-t-slate-900 dark:active:before:border-t-slate-200 {$page.url.pathname === '/about' ? 'active': ''}">
				<a class="hover:text-slate-900 dark:hover:text-slate-200" href="https://opensea.io/collection/theorbsbybt" target="_blank">Opensea.io</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path class="fill-slate-300/70 dark:fill-slate-500/70" d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<!-- <div class="w-12 h-12">
		<ThemeToggle/>
	</div> -->
</header>

<style>
  svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid ;
	}

  nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

</style>
