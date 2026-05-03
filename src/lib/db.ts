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

export async function createParentDocument(uid: string, email: string | null, gdprConsentAt?: ReturnType<typeof Timestamp.now>) {
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
      createdAt: Timestamp.now(),
      ...(gdprConsentAt ? { gdprConsentAt } : {})
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

// Thresholds scaled for 24 missions × 50 XP = 1,200 max
function calculateRank(xp: number): string {
  if (xp >= 1000) return 'Elite Agent';
  if (xp >= 600) return 'Senior Agent';
  if (xp >= 150) return 'Agent';
  return 'Recruit';
}

export async function saveMissionProgress(childUid: string, missionId: string, xpEarned: number, reflectionAnswer: string) {
  const progressRef = doc(collection(db, `children/${childUid}/mission_progress`));
  
  await setDoc(progressRef, {
    missionId,
    status: 'completed',
    xpEarned,
    reflectionAnswer,
    completedAt: Timestamp.now(),
    expiresAt: new Timestamp(Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), 0) // 30 daga TTL (GDPR-K)
  });

  // Uppfæra heildar XP og rank hjá barni
  const childRef = doc(db, 'children', childUid);
  const childSnap = await getDoc(childRef);
  if (childSnap.exists()) {
    const currentXp = childSnap.data().xp || 0;
    const newXp = currentXp + xpEarned;
    const newRank = calculateRank(newXp);
    await setDoc(childRef, { xp: newXp, rank: newRank }, { merge: true });
  }
}
