import { firebaseConfig } from './firebase';

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
}

// Track page views
export function trackPageView(pagePath: string, pageTitle?: string) {
	trackEvent('page_view', {
		page_path: pagePath,
		page_title: pageTitle || document.title
	});
}


