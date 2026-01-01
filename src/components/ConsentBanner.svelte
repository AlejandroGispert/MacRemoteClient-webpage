<script>
	import { onMount } from 'svelte';
	import { getAnalyticsConsent, setAnalyticsConsent } from '../lib/consent';

	let visible = $state(false);

	function dispatch(choice) {
		window.dispatchEvent(new CustomEvent('mrc:analytics-consent', { detail: { choice } }));
	}

	function accept() {
		setAnalyticsConsent('granted');
		visible = false;
		dispatch('granted');
	}

	function reject() {
		setAnalyticsConsent('denied');
		visible = false;
		dispatch('denied');
	}

	onMount(() => {
		visible = getAnalyticsConsent() === null;
	});
</script>

{#if visible}
	<div class="consent" role="dialog" aria-modal="true" aria-label="Cookie consent">
		<div class="card">
			<div class="text">
				<div class="title">Cookies & analytics</div>
				<div class="desc">
					We use analytics cookies (Firebase Analytics) to understand usage and improve the website.
					You can accept or reject. See our <a href="/privacy">Privacy Policy</a>.
				</div>
			</div>
			<div class="actions">
				<button class="btn secondary" type="button" onclick={reject}>Reject</button>
				<button class="btn primary" type="button" onclick={accept}>Accept</button>
			</div>
		</div>
	</div>
{/if}

<style>
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
		padding: 1rem 1.25rem;
		border-radius: 0.9rem;
		background: rgba(15, 15, 35, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.12);
		box-shadow: 0 16px 50px rgba(0, 0, 0, 0.55);
	}

	.title {
		font-weight: 700;
		margin-bottom: 0.25rem;
	}

	.desc {
		color: rgba(255, 255, 255, 0.75);
		line-height: 1.35;
		font-size: 0.95rem;
	}

	.desc a {
		color: rgba(102, 126, 234, 1);
		text-decoration: underline;
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
		padding: 0.75rem 1rem;
		font-weight: 700;
		color: white;
	}

	.btn.primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.btn.secondary {
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.btn:focus-visible {
		outline: 3px solid rgba(255, 255, 255, 0.75);
		outline-offset: 3px;
	}

	@media (max-width: 520px) {
		.card {
			flex-direction: column;
			align-items: stretch;
		}

		.actions {
			width: 100%;
		}

		.actions .btn {
			flex: 1;
		}
	}
</style>


