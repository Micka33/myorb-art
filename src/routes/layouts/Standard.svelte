<script>
	import Header from '$lib/header/Header.svelte';
	import '../../app.css';
	let year = new Date().getFullYear();
</script>

<div class="flex flex-col h-full">
	<Header />

	<main class="flex-grow flex-shrink-0">
		<slot />
	</main>

	<footer class="flex-shrink-0 p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-slate-800">
		<span class="text-sm text-slate-500 sm:text-center dark:text-slate-400">
			© { year } <a href="https://myorb.art" class="hover:underline">MyOrb.Art</a>. All Rights Reserved.
		</span>
		<ul class="flex flex-wrap items-center mt-3 text-sm text-slate-500 dark:text-slate-400 sm:mt-0">
				<li>
						<a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
				</li>
				<li>
						<a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
				</li>
				<li>
						<a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
				</li>
				<li>
						<a href="#" class="hover:underline">Contact</a>
				</li>
		</ul>
	</footer>
</div>