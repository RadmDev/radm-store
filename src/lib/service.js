import bcrypt from "bcrypt";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
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
export async function retrieveDataById(collectionName, id) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

// register user
export const signUp = async (userData) => {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const users = snapshot.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Email already exists",
    };
  } else {
    userData.role = "member";
    userData.password = await bcrypt.hash(userData.password, 10);

    try {
      await addDoc(collection(firestore, "users"), userData);
      return {
        status: true,
        statusCode: 200,
        message: "User created successfully",
      };
    } catch (error) {
      return {
        status: false,
        statusCode: 400,
        message: "Failed to register user",
      };
    }
  }
};
