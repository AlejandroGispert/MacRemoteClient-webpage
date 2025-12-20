// Firebase configuration
// Replace these values with your Firebase project configuration
export const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket:
    import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId:
    import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId:
    import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID",
};

// Validate config in development
if (import.meta.env.DEV && typeof window !== "undefined") {
  const hasPlaceholders = Object.values(firebaseConfig).some(
    (val) => typeof val === "string" && (val.includes("YOUR_") || val === "")
  );

  if (hasPlaceholders) {
    console.warn(
      "⚠️ Firebase config contains placeholder values. Check your .env file."
    );
  } else {
    console.log("✅ Firebase config loaded successfully");
  }
}
