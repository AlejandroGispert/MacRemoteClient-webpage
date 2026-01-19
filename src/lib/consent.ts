export type AnalyticsConsentChoice = 'all' | 'necessary' | 'denied';

const STORAGE_KEY = 'mrc_analytics_consent';

export function getAnalyticsConsent(): AnalyticsConsentChoice | null {
	if (typeof window === 'undefined') return null;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw === 'all' || raw === 'necessary' || raw === 'denied') return raw;
		// Legacy support: 'granted' maps to 'all'
		if (raw === 'granted') return 'all';
		return null;
	} catch {
		return null;
	}
}

// Check if user has granted consent for necessary analytics (Umami)
export function hasNecessaryAnalyticsConsent(): boolean {
	const consent = getAnalyticsConsent();
	return consent === 'necessary' || consent === 'all';
}

// Check if user has granted consent for all analytics (Firebase + Umami)
export function hasAnalyticsConsentGranted(): boolean {
	return getAnalyticsConsent() === 'all';
}

export function setAnalyticsConsent(choice: AnalyticsConsentChoice) {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, choice);
	} catch {
		// ignore storage failures (private mode, etc.)
	}
}


