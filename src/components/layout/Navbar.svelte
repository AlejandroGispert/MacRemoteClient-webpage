<script>
	let mobileMenuOpen = $state(false);
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="navbar">
	<div class="nav-container">
		<!-- Logo/Brand -->
		<a href="/" class="brand">
			<img src="/ic_launcher_round.png" alt="MacRemoteController" class="logo" />
			<span class="brand-text">MacRemoteController</span>
		</a>
		
		<!-- Desktop Navigation -->
		<ul class="nav-links">
			<li><a href="/" class="nav-link">Home</a></li>
			<li><a href="#features" class="nav-link">Features</a></li>
			<li><a href="#about" class="nav-link">About</a></li>
			<li><a href="#download" class="nav-link">Download</a></li>
			<li class="nav-dropdown">
				<span class="nav-link">Legal</span>
				<ul class="dropdown-menu">
					<li><a href="/privacy" class="dropdown-link">Privacy Policy</a></li>
					<li><a href="/terms" class="dropdown-link">Terms of Service</a></li>
				</ul>
			</li>
		</ul>
		
		<!-- Mobile Menu Button -->
		<button 
			class="mobile-menu-button"
			onclick={toggleMobileMenu}
			aria-label="Toggle menu"
		>
			<span class="hamburger-line {mobileMenuOpen ? 'open' : ''}"></span>
			<span class="hamburger-line {mobileMenuOpen ? 'open' : ''}"></span>
			<span class="hamburger-line {mobileMenuOpen ? 'open' : ''}"></span>
		</button>
	</div>
	
		<!-- Mobile Navigation Menu -->
	<div class="mobile-menu {mobileMenuOpen ? 'open' : ''}">
		<ul class="mobile-nav-links">
			<li><a href="/" class="mobile-nav-link" onclick={closeMobileMenu}>Home</a></li>
			<li><a href="#features" class="mobile-nav-link" onclick={closeMobileMenu}>Features</a></li>
			<li><a href="#about" class="mobile-nav-link" onclick={closeMobileMenu}>About</a></li>
			<li><a href="#download" class="mobile-nav-link" onclick={closeMobileMenu}>Download</a></li>
			<li><a href="/privacy" class="mobile-nav-link" onclick={closeMobileMenu}>Privacy Policy</a></li>
			<li><a href="/terms" class="mobile-nav-link" onclick={closeMobileMenu}>Terms of Service</a></li>
		</ul>
	</div>
</nav>

<style>
	.navbar {
		position: sticky;
		top: 0;
		z-index: 1000;
		background: rgba(15, 15, 35, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	}
	
	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: white;
		font-weight: 600;
		font-size: 1.25rem;
		transition: opacity 0.2s;
	}
	
	.brand:hover {
		opacity: 0.8;
	}
	
	.logo {
		width: 32px;
		height: 32px;
		border-radius: 8px;
	}
	
	.brand-text {
		font-weight: 600;
	}
	
	.nav-links {
		display: none;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 2rem;
		align-items: center;
	}
	
	@media (min-width: 768px) {
		.nav-links {
			display: flex;
		}
	}
	
	.nav-link {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-weight: 500;
		padding: 0.5rem 0;
		position: relative;
		transition: color 0.2s;
	}
	
	.nav-link:hover {
		color: white;
	}
	
	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: #6366f1;
		transition: width 0.3s;
	}
	
	.nav-link:hover::after {
		width: 100%;
	}
	
	.nav-dropdown {
		position: relative;
	}
	
	.nav-dropdown:hover .dropdown-menu {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}
	
	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%) translateY(-10px);
		background: rgba(15, 15, 35, 0.98);
		backdrop-filter: blur(10px);
		border-radius: 0.5rem;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		min-width: 180px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
		list-style: none;
	}
	
	.dropdown-link {
		display: block;
		padding: 0.75rem 1.5rem;
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-weight: 500;
		transition: background 0.2s, color 0.2s;
	}
	
	.dropdown-link:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}
	
	.mobile-menu-button {
		display: flex;
		flex-direction: column;
		gap: 4px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		z-index: 1001;
	}
	
	@media (min-width: 768px) {
		.mobile-menu-button {
			display: none;
		}
	}
	
	.hamburger-line {
		width: 24px;
		height: 2px;
		background: white;
		transition: all 0.3s;
		border-radius: 2px;
	}
	
	.hamburger-line.open:nth-child(1) {
		transform: rotate(45deg) translate(6px, 6px);
	}
	
	.hamburger-line.open:nth-child(2) {
		opacity: 0;
	}
	
	.hamburger-line.open:nth-child(3) {
		transform: rotate(-45deg) translate(6px, -6px);
	}
	
	.mobile-menu {
		display: block;
		max-height: 0;
		overflow: hidden;
		background: rgba(15, 15, 35, 0.98);
		backdrop-filter: blur(10px);
		transition: max-height 0.3s ease-out;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.mobile-menu.open {
		max-height: 300px;
	}
	
	@media (min-width: 768px) {
		.mobile-menu {
			display: none;
		}
	}
	
	.mobile-nav-links {
		list-style: none;
		margin: 0;
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.mobile-nav-link {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-weight: 500;
		padding: 0.75rem 0;
		display: block;
		transition: color 0.2s, padding-left 0.2s;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}
	
	.mobile-nav-link:hover {
		color: white;
		padding-left: 0.5rem;
	}
</style>

