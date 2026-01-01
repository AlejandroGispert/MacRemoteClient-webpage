<script>
	import { trackDownloadClick } from '../../lib/analytics';
	
	let { url = '#', size = 'large' } = $props();
	
	const sizeClasses = {
		large: 'px-8 py-4 text-lg',
		medium: 'px-6 py-3 text-base',
		small: 'px-4 py-2 text-sm'
	};
	
	function handleClick() {
		trackDownloadClick('android');
	}
</script>

<a 
	href={url} 
	target="_blank" 
	rel="noopener noreferrer"
	class="download-button {size === 'large' ? 'large' : size === 'medium' ? 'medium' : 'small'}"
	aria-label="Download Mac Remote Controller from Google Play Store (opens in new tab)"
	onclick={handleClick}
>
	<svg class="google-play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.11L13.69,12L3.84,21.89C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
	</svg>
	<div class="download-text">
		<span class="download-label">GET IT ON</span>
		<span class="download-platform">Google Play</span>
	</div>
</a>

<style>
	.download-button {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		text-decoration: none;
		border-radius: 0.75rem;
		font-weight: 600;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
		border: none;
		cursor: pointer;
	}
	
	.download-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
		background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
	}
	
	.download-button:active {
		transform: translateY(0);
	}
	
	.download-button:focus-visible {
		outline: 3px solid rgba(255, 255, 255, 0.8);
		outline-offset: 3px;
	}
	
	.download-button.large {
		padding: 1rem 2rem;
		font-size: 1.125rem;
	}
	
	.download-button.medium {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
	}
	
	.download-button.small {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	}
	
	.google-play-icon {
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
	}
	
	.download-button.small .google-play-icon {
		width: 1.5rem;
		height: 1.5rem;
	}
	
	.download-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		line-height: 1.2;
	}
	
	.download-label {
		font-size: 0.625em;
		opacity: 0.9;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	
	.download-platform {
		font-size: 1em;
		font-weight: 700;
	}

	/* Better stacking + no overflow on very small screens (~345px wide) */
	@media (max-width: 420px) {
		.download-button.large {
			width: 100%;
			max-width: 320px;
			justify-content: center;
		}
	}
</style>

