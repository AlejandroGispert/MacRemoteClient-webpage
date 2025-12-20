<script>
	// Svelte uses reactive state - when these change, the UI updates automatically
	let iconSize = $state(128);
	let showInfo = $state(false);
	
	// Reactive function - runs when iconSize changes
	$effect(() => {
		console.log(`Icon size changed to: ${iconSize}px`);
	});
	
	function toggleInfo() {
		showInfo = !showInfo;
	}
	
	function increaseSize() {
		iconSize = Math.min(iconSize + 32, 512);
	}
	
	function decreaseSize() {
		iconSize = Math.max(iconSize - 32, 64);
	}
</script>

<div class="icon-display">
	<div class="icon-container">
		<img 
			src="/1024.png" 
			alt="MacRemoteClient Icon" 
			width={iconSize}
			height={iconSize}
			class="icon-image"
		/>
	</div>
	
	<div class="controls">
		<button onclick={decreaseSize} class="btn btn-secondary">-</button>
		<span class="size-display">{iconSize}px</span>
		<button onclick={increaseSize} class="btn btn-secondary">+</button>
		<button onclick={toggleInfo} class="btn btn-primary">
			{showInfo ? 'Hide' : 'Show'} Info
		</button>
	</div>
	
	{#if showInfo}
		<div class="info-panel">
			<p><strong>This is a Svelte component!</strong></p>
			<ul>
				<li>State is reactive - changes update automatically</li>
				<li>Uses <code>$state</code> for reactive variables</li>
				<li>Uses <code>$effect</code> for side effects</li>
				<li>Conditional rendering with <code>{'{#if}'}</code></li>
			</ul>
		</div>
	{/if}
</div>

<style>
	.icon-display {
		padding: 2rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 1rem;
		backdrop-filter: blur(4px);
	}
	
	.icon-container {
		display: flex;
		justify-content: center;
		margin-bottom: 1.5rem;
	}
	
	.icon-image {
		border-radius: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
		transition: transform 0.2s;
	}
	
	.icon-image:hover {
		transform: scale(1.05);
	}
	
	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	
	.btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s;
	}
	
	.btn-primary {
		background: #6366f1;
		color: white;
	}
	
	.btn-primary:hover {
		background: #4f46e5;
	}
	
	.btn-secondary {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	
	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.2);
	}
	
	.size-display {
		min-width: 80px;
		text-align: center;
		font-weight: 600;
	}
	
	.info-panel {
		margin-top: 1.5rem;
		padding: 1rem;
		background: rgba(99, 102, 241, 0.1);
		border-radius: 0.5rem;
		border: 1px solid rgba(99, 102, 241, 0.3);
	}
	
	.info-panel ul {
		margin-top: 0.5rem;
		padding-left: 1.5rem;
	}
	
	.info-panel code {
		background: rgba(0, 0, 0, 0.3);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-family: 'Courier New', monospace;
	}
</style>

