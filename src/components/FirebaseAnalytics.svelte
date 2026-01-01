<script>
	import { onMount } from 'svelte';
	import { initAnalytics, trackPageView } from '../lib/analytics';

	onMount(() => {
		const start = () => {
			void initAnalytics().then(() => {
				trackPageView(window.location.pathname, document.title);
			});
		};

		// Run when the browser is idle (best for page speed / TBT)
		if (typeof requestIdleCallback !== 'undefined') {
			requestIdleCallback(start, { timeout: 2000 });
		} else {
			setTimeout(start, 1000);
		}
	});
</script>

