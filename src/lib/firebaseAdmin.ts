import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK (server-side only)
// Uses FIREBASE_SERVICE_ACCOUNT_KEY env var (JSON string) or falls back to 
// GOOGLE_APPLICATION_CREDENTIALS file path
if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (serviceAccountKey) {
    const serviceAccount = JSON.parse(serviceAccountKey);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    // Fallback: uses GOOGLE_APPLICATION_CREDENTIALS env var if set
    admin.initializeApp();
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export default admin;
