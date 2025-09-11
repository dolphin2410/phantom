import "dotenv/config"
import { initializeApp } from "firebase/app"
import { Database, DatabaseReference, get, getDatabase, push, ref, set } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "illusion-phantom.firebaseapp.com",
  databaseURL: "https://illusion-phantom-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "illusion-phantom",
  storageBucket: "illusion-phantom.firebasestorage.app",
  messagingSenderId: "611503276264",
  appId: "1:611503276264:web:0b15fe1a8cc7a195dd495d",
  measurementId: "G-0E4R8DYD2P"
};

export const get_phantom_database = () => {
	const app = initializeApp(firebaseConfig)
	return getDatabase(app, 'https://illusion-phantom-default-rtdb.asia-southeast1.firebasedatabase.app')	
}

export const get_secret_ref = (database: Database, ref_string: string) => {
    return ref(database, `/${process.env.FIREBASE_SECRET_PATH}${ref_string}`)
}

export const set_item = async (reference: DatabaseReference, item: any) => {
    await set(reference, item)
}

export const get_as_string = async (reference: DatabaseReference): Promise<string> => {
    const snapshot = await get(reference)

    if (snapshot.exists()) {
        return String(snapshot.val())
    } else {
        return ""
    }
}

export const get_as_list = async (reference: DatabaseReference) => {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
        const dataObj = snapshot.val()
        console.log(dataObj)
        return Object.entries(dataObj).map(([id, value]) => value)
    } else {
        return []
    }
}

export const set_as_list = async (reference: DatabaseReference, items: any[]) => {
    await set(reference, null)
    for (const item of items) {
        await append_list(reference, item)
    }
}

export const append_list = async (reference: DatabaseReference, item: any) => {
    await push(reference, item)
}