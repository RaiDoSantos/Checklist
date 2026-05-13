import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const DOC_REF = () => doc(db, "checklist", "data");

export async function saveData(frota, carretas, agregados) {
  await setDoc(DOC_REF(), { frota, carretas, agregados });
}

export async function loadData() {
  const snap = await getDoc(DOC_REF());
  if (!snap.exists()) return null;
  return snap.data();
}
