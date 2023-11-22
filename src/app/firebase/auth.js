import { signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider, microsoftProvider } from '../utils/mongodb_config';

import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

// ... other imports and configuration

const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = doc(db, 'Users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, displayName } = user;
    try {
      await setDoc(userRef, {
        email,
        name: displayName,
        // additional fields
      });
    } catch (error) {
      console.error("Error creating user document: ", error);
    }
  }
};

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await createUserDocument(user);
  } catch (error) {
    console.error("Error during Google sign-in: ", error);
  }
};

/*const signInWithMicrosoft = async () => {
  try {
    const result = await auth.signInWithPopup(microsoftProvider);
    const user = result.user;
    await createUserDocument(user);
  } catch (error) {
    console.error("Error during Microsoft sign-in: ", error);
  }
};
*/
export { signInWithGoogle };