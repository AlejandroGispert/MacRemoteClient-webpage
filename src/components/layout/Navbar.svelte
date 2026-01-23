<script>
	let mobileMenuOpen = $state(false);
	let dropdownOpen = $state(false);
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
	
	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			if (mobileMenuOpen) {
				closeMobileMenu();
			}
			if (dropdownOpen) {
				dropdownOpen = false;
			}
		}
	}
	
	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}
	
	function handleHomeClick(event) {
		// Check if we're already on the home page
		if (typeof window !== 'undefined' && window.location.pathname === '/') {
			event.preventDefault();
			closeMobileMenu();
			// Smooth scroll to top
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		} else {
			// If on a different page, let the link navigate normally
			closeMobileMenu();
		}
	}
	
	function handleHashClick(event) {
		// Just close mobile menu - let browser handle navigation naturally
		// The Layout script will handle scrolling to hash on page load
		closeMobileMenu();
	}
</script>

<nav class="navbar" role="navigation" aria-label="Main navigation">
	<div class="nav-container">
		<!-- Logo/Brand -->
		<a href="/" class="brand" aria-label="Mac Remote Controller - Home" onclick={handleHomeClick}>
			<img src="/ic_launcher_round.png" alt="" class="logo" aria-hidden="true" />
			<span class="brand-text">Mac Remote Controller</span>
		</a>
		
		<!-- Desktop Navigation -->
		<ul class="nav-links" role="menubar">
			<li role="none"><a href="/" class="nav-link" role="menuitem" onclick={handleHomeClick}>Home</a></li>
			<li role="none"><a href="/#features" class="nav-link" role="menuitem" onclick={handleHashClick}>Features</a></li>
			<li role="none"><a href="/#about" class="nav-link" role="menuitem" onclick={handleHashClick}>About</a></li>
			<li role="none"><a href="/#download" class="nav-link" role="menuitem" onclick={handleHashClick}>Download</a></li>
			<li class="nav-dropdown" role="none">
				<button 
					class="nav-link dropdown-trigger"
					aria-expanded={dropdownOpen}
					aria-haspopup="true"
					aria-label="Legal menu"
					role="menuitem"
					onclick={toggleDropdown}
					onkeydown={handleKeyDown}
				>
					Legal
				</button>
				<ul 
					class="dropdown-menu {dropdownOpen ? 'open' : ''}" 
					role="menu" 
					aria-label="Legal submenu"
					aria-hidden={!dropdownOpen}
				>
					<li role="none"><a href="/privacy" class="dropdown-link" role="menuitem" tabindex={dropdownOpen ? 0 : -1}>Privacy Policy</a></li>
					<li role="none"><a href="/terms" class="dropdown-link" role="menuitem" tabindex={dropdownOpen ? 0 : -1}>Terms of Service</a></li>
				</ul>
			</li>
			<li role="none">
				<a href="/donate" class="donate-button" role="menuitem">
					Donate
				</a>
			</li>
		</ul>
		
		<!-- Mobile Menu Button -->
		<button 
			class="mobile-menu-button"
			onclick={toggleMobileMenu}
			onkeydown={handleKeyDown}
			aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileMenuOpen}
			aria-controls="mobile-menu"
		>
			<span class="hamburger-line {mobileMenuOpen ? 'open' : ''}" aria-hidden="true"></span>
			<span class="hamburger-line {mobileMenuOpen ? 'open' : ''}" aria-hidden="true"></span>
			<span class="hamburger-line {mobileMenuOpen ? 'open' : ''}" aria-hidden="true"></span>
		</button>
	</div>
	
	<!-- Mobile Navigation Menu -->
	<div 
		id="mobile-menu"
		class="mobile-menu {mobileMenuOpen ? 'open' : ''}"
		aria-hidden={!mobileMenuOpen}
		role="menu"
		aria-label="Mobile navigation menu"
	>
		<ul class="mobile-nav-links" role="none">
			<li role="none"><a href="/" class="mobile-nav-link" onclick={handleHomeClick} role="menuitem" tabindex={mobileMenuOpen ? 0 : -1}>Home</a></li>
			<li role="none"><a href="/#features" class="mobile-nav-link" onclick={handleHashClick} role="menuitem" tabindex={mobileMenuOpen ? 0 : -1}>Features</a></li>
			<li role="none"><a href="/#about" class="mobile-nav-link" onclick={handleHashClick} role="menuitem" tabindex={mobileMenuOpen ? 0 : -1}>About</a></li>
			<li role="none"><a href="/#download" class="mobile-nav-link" onclick={handleHashClick} role="menuitem" tabindex={mobileMenuOpen ? 0 : -1}>Download</a></li>
			<li role="none"><a href="/privacy" class="mobile-nav-link" onclick={closeMobileMenu} role="menuitem" tabindex={mobileMenuOpen ? 0 : -1}>Privacy Policy</a></li>
			<li role="none"><a href="/terms" class="mobile-nav-link" onclick={closeMobileMenu} role="menuitem" tabindex={mobileMenuOpen ? 0 : -1}>Terms of Service</a></li>
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
		will-change: transform;
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
		display: inline-block;
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
	}
	
	.nav-link:hover {
		color: white;
	}
	
	.nav-link:focus-visible {
		outline: 2px solid #6366f1;
		outline-offset: 4px;
		border-radius: 0.25rem;
	}
	
	.dropdown-trigger {
		width: 100%;
		text-align: left;
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
	
	.nav-dropdown:hover .dropdown-menu,
	.nav-dropdown:focus-within .dropdown-menu,
	.dropdown-menu.open {
		opacity: 1;
		visibility: visible;
		transform: translateX(-50%) translateY(0);
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
		border-radius: 0.25rem;
	}
	
	.mobile-menu-button:focus-visible {
		outline: 2px solid #6366f1;
		outline-offset: 2px;
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
		border-radius: 0.25rem;
	}
	
	.mobile-nav-link:hover {
		color: white;
		padding-left: 0.5rem;
	}
	
	.mobile-nav-link:focus-visible {
		outline: 2px solid #6366f1;
		outline-offset: 2px;
		padding-left: 0.5rem;
	}

	.donate-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem 1rem;
		border-radius: 999px;
		background: linear-gradient(135deg, #facc15, #f97316);
		color: #111827;
		font-weight: 600;
		text-decoration: none;
		font-size: 0.9rem;
		box-shadow: 0 4px 12px rgba(250, 204, 21, 0.15);
		border: 1px solid rgba(250, 204, 21, 0.9);
		transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
		white-space: nowrap;
	}

	.donate-button:hover {
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(250, 204, 21, 0.2);
		filter: brightness(1.05);
	}

	.donate-button:focus-visible {
		outline: 2px solid #facc15;
		outline-offset: 3px;
	}

	/* Mobile perf: backdrop-filter is expensive (often causes scroll jank) */
	@media (max-width: 768px) {
		.navbar,
		.dropdown-menu,
		.mobile-menu {
			backdrop-filter: none;
		}
	}
</style>

