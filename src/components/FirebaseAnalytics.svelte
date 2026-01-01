<script>
	import { onDestroy, onMount } from 'svelte';
	import { initAnalytics, trackPageView } from '../lib/analytics';
	import { hasAnalyticsConsentGranted } from '../lib/consent';

	onMount(() => {
		const start = () => {
			void initAnalytics().then(() => {
				trackPageView(window.location.pathname, document.title);
			});
		};

		const schedule = () => {
			// Run when the browser is idle (best for page speed / TBT)
			if (typeof requestIdleCallback !== 'undefined') {
				requestIdleCallback(start, { timeout: 2000 });
			} else {
				setTimeout(start, 1000);
			}
		};

		if (hasAnalyticsConsentGranted()) {
			schedule();
			return;
		}

		const onConsent = (event) => {
			if (event?.detail?.choice === 'granted') {
				schedule();
			}
		};

		window.addEventListener('mrc:analytics-consent', onConsent);
		onDestroy(() => window.removeEventListener('mrc:analytics-consent', onConsent));
	});
</script>

