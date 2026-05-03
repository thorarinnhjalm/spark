const admin = require('firebase-admin');

// Load environment variables from .env.local

const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountStr) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT_KEY");
  process.exit(1);
}

const serviceAccount = JSON.parse(serviceAccountStr);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

async function makeAdmin(email) {
  try {
    const userRecord = await auth.getUserByEmail(email);
    console.log(`Found user: ${userRecord.uid}`);
    
    const parentRef = db.collection('parents').doc(userRecord.uid);
    const doc = await parentRef.get();
    
    if (!doc.exists) {
      console.log('Parent document does not exist, creating it...');
      await parentRef.set({
        email: email,
        uid: userRecord.uid,
        role: 'admin',
        plan: 'premium', // give premium to admin
        maxChildren: 10
      }, { merge: true });
    } else {
      console.log('Parent document exists, updating role...');
      await parentRef.update({ role: 'admin' });
    }
    
    // Set custom claim just in case we need it later
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });
    
    console.log(`Successfully made ${email} an admin!`);
  } catch (error) {
    console.error('Error making admin:', error);
  }
}

makeAdmin('thorarinnhjalmarsson@gmail.com');
