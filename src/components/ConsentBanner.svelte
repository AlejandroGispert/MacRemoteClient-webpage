<script>
	import { onMount, onDestroy } from 'svelte';
	import { getAnalyticsConsent, setAnalyticsConsent } from '../lib/consent';

	let visible = $state(false);

	function dispatch(choice) {
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new CustomEvent('mrc:analytics-consent', { detail: { choice } }));
		}
	}

	function acceptAll() {
		setAnalyticsConsent('all');
		visible = false;
		dispatch('all');
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function acceptNecessary() {
		setAnalyticsConsent('necessary');
		visible = false;
		dispatch('necessary');
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	onMount(() => {
		visible = getAnalyticsConsent() === null;
		if (visible && typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	});
</script>

{#if visible}
	<!-- Overlay that blocks the page -->
	<div class="overlay" role="presentation" aria-hidden="true"></div>
	
	<!-- Consent banner -->
	<div class="consent" role="dialog" aria-modal="true" aria-label="Cookie consent">
		<div class="card">
			<div class="text">
				<div class="title">Cookies & analytics</div>
				<div class="desc">
					We use analytics cookies to understand usage and improve the website.
					<ul class="cookie-list">
						<li><strong>Necessary:</strong> Umami Analytics (privacy-focused)</li>
						<li><strong>Optional:</strong> Firebase Analytics</li>
					</ul>
					See our <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.
				</div>
			</div>
			<div class="actions">
				<button class="btn secondary" type="button" onclick={acceptNecessary}>Only Necessary</button>
				<button class="btn primary" type="button" onclick={acceptAll}>Allow All</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(4px);
		z-index: 10999;
		pointer-events: auto;
	}

	.consent {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 11000;
		padding: 1rem;
		display: flex;
		justify-content: center;
		pointer-events: none;
	}

	.card {
		pointer-events: auto;
		width: min(900px, 100%);
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.5rem;
		border-radius: 0.9rem;
		background: rgba(15, 15, 35, 0.98);
		border: 1px solid rgba(255, 255, 255, 0.12);
		box-shadow: 0 16px 50px rgba(0, 0, 0, 0.55);
	}

	.title {
		font-weight: 700;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
	}

	.desc {
		color: rgba(255, 255, 255, 0.75);
		line-height: 1.5;
		font-size: 0.95rem;
	}

	.desc a {
		color: rgba(102, 126, 234, 1);
		text-decoration: underline;
	}

	.cookie-list {
		margin: 0.75rem 0;
		padding-left: 1.25rem;
		color: rgba(255, 255, 255, 0.85);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	.cookie-list li {
		margin: 0.25rem 0;
	}

	.cookie-list strong {
		color: rgba(255, 255, 255, 0.95);
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		flex-shrink: 0;
	}

	.btn {
		border: none;
		cursor: pointer;
		border-radius: 0.75rem;
		padding: 0.75rem 1.25rem;
		font-weight: 700;
		color: white;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.btn:hover {
		transform: translateY(-1px);
	}

	.btn:active {
		transform: translateY(0);
	}

	.btn.primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
	}

	.btn.primary:hover {
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
	}

	.btn.secondary {
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.btn.secondary:hover {
		background: rgba(255, 255, 255, 0.18);
	}

	.btn:focus-visible {
		outline: 3px solid rgba(255, 255, 255, 0.75);
		outline-offset: 3px;
	}

	@media (max-width: 520px) {
		.card {
			flex-direction: column;
			align-items: stretch;
			padding: 1rem 1.25rem;
		}

		.actions {
			width: 100%;
		}

		.actions .btn {
			flex: 1;
		}
	}
</style>


