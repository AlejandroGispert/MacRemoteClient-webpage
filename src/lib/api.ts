// API client for Railway backend

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'https://your-project.up.railway.app';

export interface VerificationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface CheckVerificationResponse {
  verified: boolean;
}

/**
 * Request email verification
 */
export async function requestEmailVerification(email: string): Promise<VerificationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || 'Failed to send verification email' };
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    console.error('Error requesting email verification:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

/**
 * Verify email token (called from verification page)
 */
export async function verifyEmailToken(token: string): Promise<VerificationResponse & { email?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verify/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || 'Invalid or expired token' };
    }

    const data = await response.json();
    return { success: true, email: data.email, message: data.message };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

/**
 * Check if email is verified
 */
export async function checkEmailVerification(email: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/check-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return false;
    }

    const data: CheckVerificationResponse = await response.json();
    return data.verified;
  } catch (error) {
    console.error('Error checking verification:', error);
    return false;
  }
}

/**
 * Track download
 */
export async function trackDownload(email: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/track-download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error tracking download:', error);
    return false;
  }
}
