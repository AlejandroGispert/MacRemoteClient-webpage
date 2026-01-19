import { firebaseConfig } from './firebase';
import { hasAnalyticsConsentGranted, hasNecessaryAnalyticsConsent } from './consent';

let app: any = null;
let analytics: any = null;
let initPromise: Promise<any> | null = null;

function hasValidFirebaseConfig() {
	const values = Object.values(firebaseConfig);
	const hasPlaceholders = values.some(
		(val) => typeof val === 'string' && (val.includes('YOUR_') || val === '')
	);
	return !hasPlaceholders && !!firebaseConfig.measurementId && !String(firebaseConfig.measurementId).includes('YOUR_');
}

// Initialize Firebase Analytics
export function initAnalytics() {
	if (typeof window === 'undefined') {
		return Promise.resolve(null); // Server-side rendering, skip
	}

	if (!hasAnalyticsConsentGranted()) {
		return Promise.resolve(null);
	}

	if (!hasValidFirebaseConfig()) {
		// Avoid pulling Firebase into the bundle when config isn't set
		if (import.meta.env.DEV) {
			console.warn('⚠️ Firebase analytics disabled: missing/placeholder config.');
		}
		return Promise.resolve(null);
	}

	if (analytics) return Promise.resolve(analytics);
	if (initPromise) return initPromise;

	initPromise = (async () => {
		try {
			// Dynamic imports to keep Firebase out of the initial JS bundle
			const appMod = await import('firebase/app');
			const analyticsMod = await import('firebase/analytics');

			if (!app) {
				app = appMod.initializeApp(firebaseConfig);
			}

			if (!analytics && app) {
				analytics = analyticsMod.getAnalytics(app);
			}

			return analytics;
		} catch (error) {
			if (import.meta.env.DEV) {
				console.error('❌ Firebase Analytics initialization error:', error);
			}
			return null;
		} finally {
			// allow retry after failures
			initPromise = null;
		}
	})();

	return initPromise;
}

// Track custom events
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
	if (typeof window === 'undefined') {
		return;
	}

	if (!hasAnalyticsConsentGranted()) {
		return;
	}

	void initAnalytics().then(async (a) => {
		if (!a) return;
		try {
			const { logEvent } = await import('firebase/analytics');
			logEvent(a, eventName, eventParams);
		} catch (error) {
			if (import.meta.env.DEV) {
				console.error('❌ Firebase Analytics event tracking error:', error);
			}
		}
	});
}

// Track download button clicks
export function trackDownloadClick(platform: 'android' | 'mac') {
	trackEvent('download_button_click', {
		platform: platform,
		button_type: platform === 'android' ? 'google_play' : 'mac_app',
		timestamp: new Date().toISOString()
	});
	
	// Also track with Umami for download monitoring
	trackUmamiEvent('download_click', {
		platform: platform,
		button_type: platform === 'android' ? 'google_play' : 'mac_app'
	});
}

// Track page views
export function trackPageView(pagePath: string, pageTitle?: string) {
	trackEvent('page_view', {
		page_path: pagePath,
		page_title: pageTitle || document.title
	});
}

// Umami Analytics Functions
declare global {
	interface Window {
		umami?: {
			track: (eventName: string, eventData?: Record<string, string | number>) => void;
		};
	}
}

// Track custom events with Umami
export function trackUmamiEvent(eventName: string, eventData?: Record<string, string | number>) {
	if (typeof window === 'undefined') {
		return;
	}

	if (!hasNecessaryAnalyticsConsent()) {
		return;
	}

	// Convert eventData to string values (Umami prefers string values)
	const umamiData = eventData ? Object.fromEntries(
		Object.entries(eventData).map(([key, value]) => [key, String(value)])
	) : undefined;

	const track = () => {
		if (window.umami && typeof window.umami.track === 'function') {
			try {
				window.umami.track(eventName, umamiData);
				if (import.meta.env.DEV) {
					console.log('✅ Umami event tracked:', eventName, umamiData);
				}
			} catch (error) {
				if (import.meta.env.DEV) {
					console.error('❌ Umami Analytics event tracking error:', error);
				}
			}
			return true;
		}
		return false;
	};

	// Try to track immediately
	if (track()) {
		return;
	}

	// If Umami isn't loaded yet, retry with exponential backoff
	let attempts = 0;
	const maxAttempts = 5;
	const retry = () => {
		attempts++;
		if (track()) {
			return;
		}
		if (attempts < maxAttempts) {
			setTimeout(retry, Math.min(500 * attempts, 2000));
		} else if (import.meta.env.DEV) {
			console.warn('⚠️ Umami not loaded after', maxAttempts, 'attempts');
		}
	};

	setTimeout(retry, 100);
}

// Track download attempts (including blocked ones for monitoring)
export function trackDownloadAttempt(platform: 'android' | 'mac', success: boolean, reason?: string) {
	trackUmamiEvent('download_attempt', {
		platform: platform,
		success: success ? 1 : 0,
		reason: reason || 'none',
		timestamp: Date.now()
	});
}

// Track download blocked due to platform mismatch
export function trackDownloadBlocked(platform: 'mac', reason: 'not_mac' | 'ios_device') {
	trackUmamiEvent('download_blocked', {
		platform: platform,
		reason: reason
	});
}


