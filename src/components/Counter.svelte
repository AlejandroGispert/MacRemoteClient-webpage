<script>
	let count = $state(0);
	
	function increment() {
		count++;
	}
</script>

<div class="counter">
	<button onclick={increment}>Count: {count}</button>
</div>

<style>
	.counter {
		margin: 2rem 0;
	}
	
	button {
		background: #6366f1;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background 0.2s;
	}
	
	button:hover {
		background: #4f46e5;
	}
</style>

