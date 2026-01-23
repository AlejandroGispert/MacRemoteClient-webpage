<script>
	let { isOpen = $bindable(), onVersionSelect } = $props();
	
	let showOldVersions = $state(false);
	
	const currentVersion = { version: '2.0', filename: 'MacRCDesktop_v2.0.dmg', label: 'v2.0 (Latest)', current: true };
	const oldVersions = [
		{ version: '1.5', filename: 'MacRCDesktop_v1.5.dmg', label: 'v1.5' },
		{ version: '1.4', filename: 'MacRCDesktop_v1.4.dmg', label: 'v1.4' },
		{ version: '1.3', filename: 'MacRCDesktop_v1.3.dmg', label: 'v1.3' },
		{ version: '1.0', filename: 'MacRemoteController-v1.dmg', label: 'v1.0' },
	];

	function handleVersionClick(version) {
		if (onVersionSelect) {
			onVersionSelect(version);
		}
		isOpen = false;
	}

	function handleClose() {
		isOpen = false;
	}

	function handleOverlayClick(event) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
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
				<h2 id="modal-title" class="modal-title">Select Version</h2>
				<p class="modal-description">Choose a version to download:</p>
				
				<div class="version-list">
					<!-- Current Version -->
					<button
						class="version-item current"
						onclick={() => handleVersionClick(currentVersion)}
						type="button"
					>
						<div class="version-info">
							<span class="version-label">{currentVersion.label}</span>
							<span class="current-badge">Current</span>
						</div>
						<svg class="download-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="7 10 12 15 17 10" />
							<line x1="12" y1="15" x2="12" y2="3" />
						</svg>
					</button>

					<!-- Older Versions Collapsible -->
					<button
						class="toggle-old-versions"
						onclick={() => showOldVersions = !showOldVersions}
						type="button"
					>
						<span>Previous Versions</span>
						<svg 
							class="chevron-icon" 
							class:rotated={showOldVersions}
							width="20" 
							height="20" 
							viewBox="0 0 24 24" 
							fill="none" 
							stroke="currentColor" 
							stroke-width="2"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</button>

					{#if showOldVersions}
						<div class="old-versions-list">
							{#each oldVersions as version}
								<button
									class="version-item old-version"
									onclick={() => handleVersionClick(version)}
									type="button"
								>
									<div class="version-info">
										<span class="version-label">{version.label}</span>
									</div>
									<svg class="download-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
										<polyline points="7 10 12 15 17 10" />
										<line x1="12" y1="15" x2="12" y2="3" />
									</svg>
								</button>
							{/each}
						</div>
					{/if}
				</div>
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
		/* backdrop-filter disabled for performance */
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
		max-height: 90vh;
		overflow-y: auto;
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
		transition: background-color 0.2s, color 0.2s;
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
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.modal-description {
		color: rgba(255, 255, 255, 0.75);
		line-height: 1.6;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.version-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.version-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		color: white;
		cursor: pointer;
		transition: background-color 0.2s, border-color 0.2s, transform 0.2s;
		text-align: left;
		width: 100%;
	}

	.version-item:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(102, 126, 234, 0.5);
		transform: translateX(4px);
	}

	.version-item.current {
		background: rgba(102, 126, 234, 0.15);
		border-color: rgba(102, 126, 234, 0.5);
	}

	.version-item.current:hover {
		background: rgba(102, 126, 234, 0.25);
	}

	.version-item.old-version {
		opacity: 0.8;
	}

	.version-item.old-version:hover {
		opacity: 1;
	}

	.toggle-old-versions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.25rem;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		color: rgba(255, 255, 255, 0.7);
		cursor: pointer;
		transition: background-color 0.2s, color 0.2s, border-color 0.2s;
		width: 100%;
		margin-top: 0.5rem;
		font-size: 0.875rem;
	}

	.toggle-old-versions:hover {
		background: rgba(255, 255, 255, 0.05);
		color: rgba(255, 255, 255, 0.9);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.chevron-icon {
		color: rgba(255, 255, 255, 0.6);
		transition: transform 0.3s ease;
	}

	.chevron-icon.rotated {
		transform: rotate(180deg);
	}

	.old-versions-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.75rem;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		animation: slideDown 0.3s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.version-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.version-label {
		font-weight: 600;
		font-size: 1rem;
	}

	.current-badge {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.download-icon {
		color: rgba(255, 255, 255, 0.6);
		transition: color 0.2s, transform 0.2s;
	}

	.version-item:hover .download-icon {
		color: #667eea;
		transform: translateY(2px);
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
