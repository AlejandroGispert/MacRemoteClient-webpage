import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

let app: ReturnType<typeof initializeApp> | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;

// Initialize Firebase Analytics
export function initAnalytics() {
	if (typeof window === 'undefined') {
		return; // Server-side rendering, skip
	}

	try {
		// Debug: Log config (without sensitive data)
		console.log('🔍 Initializing Firebase Analytics...', {
			projectId: firebaseConfig.projectId,
			hasApiKey: !!firebaseConfig.apiKey,
			hasMeasurementId: !!firebaseConfig.measurementId
		});

		// Check if Firebase is already initialized
		if (!app) {
			app = initializeApp(firebaseConfig);
			console.log('✅ Firebase app initialized');
		}

		// Initialize Analytics if not already done
		if (!analytics && app) {
			analytics = getAnalytics(app);
			console.log('✅ Firebase Analytics initialized');
		}
	} catch (error) {
		console.error('❌ Firebase Analytics initialization error:', error);
	}
}

// Track custom events
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
	if (typeof window === 'undefined') {
		console.warn('⚠️ trackEvent called on server-side, skipping');
		return;
	}

	if (!analytics) {
		console.warn('⚠️ Analytics not initialized yet, attempting to initialize...');
		initAnalytics();
		if (!analytics) {
			console.error('❌ Analytics still not initialized after retry');
			return;
		}
	}

	try {
		console.log('📊 Tracking event:', eventName, eventParams);
		logEvent(analytics, eventName, eventParams);
		console.log('✅ Event tracked successfully');
	} catch (error) {
		console.error('❌ Firebase Analytics event tracking error:', error);
	}
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

