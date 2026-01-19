<script>
	import { toastError, toastSuccess, toastInfo } from '../lib/toast';
	import { requestEmailVerification, checkEmailVerification, trackDownload } from '../lib/api';
	import { trackDownloadClick, trackDownloadAttempt } from '../lib/analytics';

	let { isOpen = $bindable(), onVerified } = $props();
	let email = $state('');
	let isLoading = $state(false);
	let emailSent = $state(false);
	let errorMessage = $state('');

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	async function handleSubmit() {
		errorMessage = '';

		if (!email) {
			errorMessage = 'Please enter your email address';
			return;
		}

		if (!emailRegex.test(email)) {
			errorMessage = 'Please enter a valid email address';
			return;
		}

		isLoading = true;

		try {
			// Check if email is already verified
			const isVerified = await checkEmailVerification(email);

			if (isVerified) {
				// Already verified, proceed to download
				await handleVerified(email);
				return;
			}

			// Send verification email
			const result = await requestEmailVerification(email);

			if (result.success) {
				emailSent = true;
				toastSuccess('Verification Email Sent', {
					description: `Check your inbox at ${email} and click the verification link.`,
					duration: 5000,
				});
			} else {
				errorMessage = result.error || 'Failed to send verification email';
				toastError('Error', {
					description: errorMessage,
					duration: 4000,
				});
			}
		} catch (error) {
			errorMessage = 'An unexpected error occurred. Please try again.';
			toastError('Error', {
				description: errorMessage,
				duration: 4000,
			});
		} finally {
			isLoading = false;
		}
	}

	async function handleVerified(verifiedEmail) {
		// Track download
		trackDownloadClick('mac');
		trackDownloadAttempt('mac', true);
		await trackDownload(verifiedEmail);

		// Call callback
		if (onVerified) {
			onVerified(verifiedEmail);
		}

		// Close modal
		isOpen = false;
		emailSent = false;
		email = '';
		errorMessage = '';

		toastSuccess('Download Ready', {
			description: 'Starting download...',
			duration: 2000,
		});
	}

	function handleClose() {
		isOpen = false;
		emailSent = false;
		email = '';
		errorMessage = '';
	}

	function handleOverlayClick(event) {
		// Only close if clicking directly on the overlay, not on modal content
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			handleClose();
		}
		if (event.key === 'Enter' && !emailSent && !isLoading) {
			handleSubmit();
		}
		// Handle Enter/Space on overlay to close
		if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
			handleClose();
		}
	}
</script>

{#if isOpen}
	<div 
		class="modal-overlay" 
		role="dialog" 
		aria-modal="true" 
		aria-labelledby="modal-title"
		tabindex="-1"
		onclick={handleOverlayClick}
		onkeydown={handleKeydown}
	>
		<div class="modal-content">
			<button class="close-button" onclick={handleClose} aria-label="Close modal">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>

			<div class="modal-body">
				<h2 id="modal-title" class="modal-title">Verify Your Email</h2>

				{#if !emailSent}
					<p class="modal-description">
						Enter your email address to receive a verification link and download the Mac Remote Controller app.
					</p>

					<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
						<div class="input-group">
							<label for="email-input" class="sr-only">Email address</label>
							<input
								id="email-input"
								type="email"
								placeholder="your.email@example.com"
								bind:value={email}
								disabled={isLoading}
								class="email-input"
								autocomplete="email"
								required
							/>
							{#if errorMessage}
								<p class="error-message">{errorMessage}</p>
							{/if}
						</div>

						<button 
							type="submit" 
							class="submit-button"
							disabled={isLoading}
						>
							{#if isLoading}
								Sending...
							{:else}
								Send Verification Email
							{/if}
						</button>
					</form>
				{:else}
					<div class="email-sent">
						<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M20 6L9 17l-5-5" />
						</svg>
						<p class="modal-description">
							Verification email sent to <strong>{email}</strong>
						</p>
						<p class="modal-description">
							Please check your inbox and click the verification link. Once verified, you can download the app.
						</p>
						<p class="modal-description small">
							Didn't receive the email? Check your spam folder or try again.
						</p>
						<button 
							class="resend-button"
							onclick={() => { emailSent = false; errorMessage = ''; }}
							disabled={isLoading}
						>
							Try Different Email
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(4px);
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.modal-content {
		background: rgba(15, 15, 35, 0.98);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 1rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
		max-width: 500px;
		width: 100%;
		position: relative;
		animation: slideUp 0.3s ease;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: transparent;
		border: none;
		color: rgba(255, 255, 255, 0.7);
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 0.5rem;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-button:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	.modal-body {
		padding: 2rem;
	}

	.modal-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		margin-bottom: 1rem;
		text-align: center;
	}

	.modal-description {
		color: rgba(255, 255, 255, 0.75);
		line-height: 1.6;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.modal-description strong {
		color: white;
		font-weight: 600;
	}

	.modal-description.small {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.6);
		margin-top: 1rem;
	}

	.input-group {
		margin-bottom: 1.5rem;
	}

	.email-input {
		width: 100%;
		padding: 0.75rem 1rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		color: white;
		font-size: 1rem;
		transition: all 0.2s;
	}

	.email-input:focus {
		outline: none;
		border-color: rgba(102, 126, 234, 0.8);
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
	}

	.email-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.email-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error-message {
		color: #ef4444;
		font-size: 0.875rem;
		margin-top: 0.5rem;
	}

	.submit-button,
	.resend-button {
		width: 100%;
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.submit-button:hover:not(:disabled),
	.resend-button:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
	}

	.submit-button:disabled,
	.resend-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.email-sent {
		text-align: center;
	}

	.check-icon {
		width: 4rem;
		height: 4rem;
		color: #10b981;
		margin: 0 auto 1.5rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	@media (max-width: 520px) {
		.modal-body {
			padding: 1.5rem;
		}

		.modal-title {
			font-size: 1.25rem;
		}
	}
</style>
