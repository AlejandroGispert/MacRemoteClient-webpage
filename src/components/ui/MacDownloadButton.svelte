<script>
	import { toastInfo, toastSuccess } from '../../lib/toast';
	import { trackDownloadClick } from '../../lib/analytics';
	
	let { url = '#', size = 'large' } = $props();
	
	const sizeClasses = {
		large: 'px-8 py-4 text-lg',
		medium: 'px-6 py-3 text-base',
		small: 'px-4 py-2 text-sm'
	};
	
	function handleClick(event) {
		if (url === '#' || url === '') {
			event.preventDefault();
			toastInfo('Coming Soon', {
				description: 'The Mac companion app will be available for download soon!',
				duration: 4000,
			});
		} else {
			// Track download click in Firebase Analytics
			trackDownloadClick('mac');
			
			// Show success toast when download starts
			toastSuccess('Download Started', {
				description: 'Your Mac app download has begun. Check your Downloads folder.',
				duration: 4000,
			});
		}
	}
</script>

<a 
	href={url} 
	download={url !== '#' && url !== '' ? 'MacRCDesktop_v1.4.dmg' : undefined}
	target={url !== '#' && url !== '' ? '_blank' : undefined}
	rel={url !== '#' && url !== '' ? 'noopener noreferrer' : undefined}
	class="mac-download-button {size === 'large' ? 'large' : size === 'medium' ? 'medium' : 'small'}"
	aria-label="Download Mac Remote Controller Desktop app"
	onclick={handleClick}
>
	<svg class="mac-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.33 13,3.5Z" />
	</svg>
	<div class="download-text">
		<span class="download-label">Download</span>
		<span class="download-platform">Mac Desktop</span>
	</div>
</a>

<style>
	.mac-download-button {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
		color: white;
		text-decoration: none;
		border-radius: 0.75rem;
		font-weight: 600;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3), 0 0 0 0 rgba(99, 102, 241, 0.5);
		border: 1px solid rgba(99, 102, 241, 0.5);
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.mac-download-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}
	
	.mac-download-button:hover::before {
		left: 100%;
	}
	
	.mac-download-button:hover {
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3);
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%);
		border-color: rgba(99, 102, 241, 0.8);
	}
	
	.mac-download-button:active {
		transform: translateY(0);
	}
	
	.mac-download-button:focus-visible {
		outline: 3px solid rgba(255, 255, 255, 0.8);
		outline-offset: 3px;
	}
	
	.mac-download-button.large {
		padding: 1rem 2rem;
		font-size: 1.125rem;
	}
	
	.mac-download-button.medium {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
	}
	
	.mac-download-button.small {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	}
	
	.mac-icon {
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
		transition: transform 0.3s ease;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
	}
	
	.mac-download-button:hover .mac-icon {
		transform: scale(1.1) rotate(5deg);
	}
	
	.mac-download-button.small .mac-icon {
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
</style>

