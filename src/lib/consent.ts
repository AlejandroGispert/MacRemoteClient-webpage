export type AnalyticsConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'mrc_analytics_consent';

export function getAnalyticsConsent(): AnalyticsConsentChoice | null {
	if (typeof window === 'undefined') return null;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw === 'granted' || raw === 'denied') return raw;
		return null;
	} catch {
		return null;
	}
}

export function hasAnalyticsConsentGranted(): boolean {
	return getAnalyticsConsent() === 'granted';
}

export function setAnalyticsConsent(choice: AnalyticsConsentChoice) {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, choice);
	} catch {
		// ignore storage failures (private mode, etc.)
	}
}


