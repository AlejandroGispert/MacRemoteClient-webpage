<script>
	import { onMount } from 'svelte';
	import { initAnalytics, trackPageView } from '../lib/analytics';

	onMount(() => {
		console.log('🚀 FirebaseAnalytics component mounted');
		
		// Small delay to ensure DOM is ready
		setTimeout(() => {
			// Initialize Firebase Analytics
			initAnalytics();
			
			// Track initial page view after a short delay
			setTimeout(() => {
				trackPageView(window.location.pathname, document.title);
			}, 500);
		}, 100);
	});
</script>

