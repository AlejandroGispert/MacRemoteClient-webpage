<script>
	import { onDestroy, onMount } from 'svelte';
	import { hasAnalyticsConsentGranted } from '../lib/consent';

	onMount(() => {
		const loadUmami = () => {
			// Check if script already exists
			if (document.querySelector('script[data-website-id="5075dacd-5a43-4c1b-a32e-e2ea2e6c9058"]')) {
				return;
			}

			const script = document.createElement('script');
			script.defer = true;
			script.src = 'https://cloud.umami.is/script.js';
			script.setAttribute('data-website-id', '5075dacd-5a43-4c1b-a32e-e2ea2e6c9058');
			document.head.appendChild(script);
		};

		const schedule = () => {
			// Run when the browser is idle (best for page speed / TBT)
			if (typeof requestIdleCallback !== 'undefined') {
				requestIdleCallback(loadUmami, { timeout: 2000 });
			} else {
				setTimeout(loadUmami, 1000);
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
