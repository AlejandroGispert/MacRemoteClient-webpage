<script>
	let { url = '#', size = 'large' } = $props();
	
	const sizeClasses = {
		large: 'px-8 py-4 text-lg',
		medium: 'px-6 py-3 text-base',
		small: 'px-4 py-2 text-sm'
	};
</script>

<a 
	href={url} 
	target="_blank" 
	rel="noopener noreferrer"
	class="mac-download-button {size === 'large' ? 'large' : size === 'medium' ? 'medium' : 'small'}"
>
	<svg class="mac-icon" viewBox="0 0 24 24" fill="currentColor">
		<path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.33 13,3.5Z" />
	</svg>
	<div class="download-text">
		<span class="download-label">Download</span>
		<span class="download-platform">Mac App</span>
	</div>
</a>

<style>
	.mac-download-button {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		text-decoration: none;
		border-radius: 0.75rem;
		font-weight: 600;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.2);
		cursor: pointer;
	}
	
	.mac-download-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
	}
	
	.mac-download-button:active {
		transform: translateY(0);
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

