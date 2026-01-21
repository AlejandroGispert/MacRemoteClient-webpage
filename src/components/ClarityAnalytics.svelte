<script>
	import { onDestroy, onMount } from 'svelte';
	import { hasAnalyticsConsentGranted } from '../lib/consent';

	onMount(() => {
		const loadClarity = () => {
			// Check if script already exists
			if (document.querySelector('script[src*="clarity.ms/tag/v52im6iw2j"]')) {
				return;
			}

			// Microsoft Clarity tracking script
			(function(c,l,a,r,i,t,y){
				c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
				t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
				y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
			})(window, document, "clarity", "script", "v52im6iw2j");
		};

		const schedule = () => {
			// Run when the browser is idle (best for page speed / TBT)
			if (typeof requestIdleCallback !== 'undefined') {
				requestIdleCallback(loadClarity, { timeout: 2000 });
			} else {
				setTimeout(loadClarity, 1000);
			}
		};

		if (hasAnalyticsConsentGranted()) {
			schedule();
			return;
		}

		const onConsent = (event) => {
			if (event?.detail?.choice === 'all') {
				schedule();
			}
		};

		window.addEventListener('mrc:analytics-consent', onConsent);
		onDestroy(() => window.removeEventListener('mrc:analytics-consent', onConsent));
	});
</script>
