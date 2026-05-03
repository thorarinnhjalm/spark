import { db } from './firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

// Býr til slembi-kóða fyrir foreldra, t.d. SPARK-A1B2
function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'SPARK-';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createParentDocument(uid: string, email: string | null) {
  const parentRef = doc(db, 'parents', uid);
  const parentSnap = await getDoc(parentRef);

  if (!parentSnap.exists()) {
    const inviteCode = generateInviteCode();
    await setDoc(parentRef, {
      uid,
      email: email || '',
      inviteCode,
      plan: 'free',
      maxChildren: 1,
      createdAt: Timestamp.now()
    });
    return inviteCode;
  }
  
  return parentSnap.data().inviteCode;
}

export async function verifyInviteCode(inviteCode: string): Promise<string | null> {
  const parentsRef = collection(db, 'parents');
  const q = query(parentsRef, where("inviteCode", "==", inviteCode.toUpperCase()));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null; // Kóði fannst ekki
  }

  // Skilum parentUid af fyrsta foreldrinu sem á þennan kóða
  return querySnapshot.docs[0].id;
}

export async function createChildDocument(uid: string, parentUid: string, displayName: string) {
  const childRef = doc(db, 'children', uid);
  const childSnap = await getDoc(childRef);

  if (!childSnap.exists()) {
    await setDoc(childRef, {
      uid,
      parentUid,
      displayName,
      age: 10, // Default gildi, foreldrar geta breytt seinna eða við spyrjum
      language: 'is',
      xp: 0,
      rank: 'Recruit',
      createdAt: Timestamp.now()
    });
  }
}
