// Simple toast notification system
export interface Toast {
	id: string;
	message: string;
	description?: string;
	type: 'info' | 'success' | 'error' | 'warning';
	duration: number;
}

let toasts: Toast[] = [];
let listeners: Array<() => void> = [];
let toastId = 0;

export function toast(message: string, options?: {
	description?: string;
	type?: 'info' | 'success' | 'error' | 'warning';
	duration?: number;
}) {
	const id = `toast-${toastId++}`;
	const newToast: Toast = {
		id,
		message,
		description: options?.description,
		type: options?.type || 'info',
		duration: options?.duration || 4000,
	};
	
	toasts = [...toasts, newToast];
	notifyListeners();
	
	// Auto remove after duration
	setTimeout(() => {
		removeToast(id);
	}, newToast.duration);
	
	return id;
}

export function toastInfo(message: string, options?: { description?: string; duration?: number }) {
	return toast(message, { ...options, type: 'info' });
}

export function toastSuccess(message: string, options?: { description?: string; duration?: number }) {
	return toast(message, { ...options, type: 'success' });
}

export function toastError(message: string, options?: { description?: string; duration?: number }) {
	return toast(message, { ...options, type: 'error' });
}

export function removeToast(id: string) {
	toasts = toasts.filter(t => t.id !== id);
	notifyListeners();
}

export function getToasts(): Toast[] {
	return toasts;
}

export function subscribe(callback: () => void) {
	listeners.push(callback);
	return () => {
		listeners = listeners.filter(l => l !== callback);
	};
}

function notifyListeners() {
	listeners.forEach(listener => listener());
}

