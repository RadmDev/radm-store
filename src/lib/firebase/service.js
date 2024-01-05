import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

// get all data from firestore
export async function retrieveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// get data from firestore by id
export async function retrieveDataByField(collectionName, field, value) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function addData(collectionName, data) {
  try {
    await addDoc(collection(firestore, collectionName), data);

    return true;
  } catch (error) {
    return false;
  }
}

export async function updateData(collectionName, id, data) {
  try {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, data);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteData(collectionName, id) {
  try {
    const docRef = doc(firestore, collectionName, id);
    await deleteDoc(docRef);

    return true;
  } catch (error) {
    return false;
  }
}
