<script>
	import { onMount, onDestroy } from 'svelte';
	import { getToasts, subscribe, removeToast } from '../lib/toast';
	
	let toasts = $state(getToasts());
	let unsubscribe = null;
	
	onMount(() => {
		unsubscribe = subscribe(() => {
			toasts = getToasts();
		});
	});
	
	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<div class="toaster-container">
	{#each toasts as toast (toast.id)}
		<div 
			class="toast toast-{toast.type}"
			role="alert"
			aria-live="polite"
		>
			<div class="toast-content">
				<div class="toast-message">{toast.message}</div>
				{#if toast.description}
					<div class="toast-description">{toast.description}</div>
				{/if}
			</div>
			<button 
				class="toast-close"
				onclick={() => removeToast(toast.id)}
				aria-label="Close notification"
			>
				×
			</button>
		</div>
	{/each}
</div>

<style>
	.toaster-container {
		position: fixed;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10000;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		pointer-events: none;
		max-width: 90vw;
		width: 100%;
		max-width: 420px;
	}
	
	.toast {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: rgba(15, 15, 35, 0.95);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
		pointer-events: auto;
		animation: slideIn 0.3s ease-out;
		color: rgba(255, 255, 255, 0.9);
	}
	
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.toast-info {
		border-left: 4px solid #3b82f6;
	}
	
	.toast-success {
		border-left: 4px solid #10b981;
	}
	
	.toast-error {
		border-left: 4px solid #ef4444;
	}
	
	.toast-warning {
		border-left: 4px solid #f59e0b;
	}
	
	.toast-content {
		flex: 1;
		min-width: 0;
	}
	
	.toast-message {
		font-weight: 600;
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}
	
	.toast-description {
		font-size: 0.8125rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.4;
	}
	
	.toast-close {
		background: transparent;
		border: none;
		color: rgba(255, 255, 255, 0.7);
		cursor: pointer;
		font-size: 1.5rem;
		line-height: 1;
		padding: 0;
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		transition: all 0.2s;
		flex-shrink: 0;
	}
	
	.toast-close:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}
	
	.toast-close:focus-visible {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: 2px;
	}
</style>
