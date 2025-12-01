import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

export const useArticles = () => {
  const { $firebase } = useNuxtApp();
  const db = $firebase.db;

  const articlesCollection = collection(db, "articles");

  const getAll = async () => {
    const snapshot = await getDocs(articlesCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const create = async (data: any) => {
    await addDoc(articlesCollection, { ...data, createdAt: serverTimestamp() });
  };

  const update = async (id: string, data: any) => {
    const ref = doc(db, "articles", id);
    await updateDoc(ref, data);
  };

  const remove = async (id: string) => {
    const ref = doc(db, "articles", id);
    await deleteDoc(ref);
  };

  return { getAll, create, update, remove };
};
