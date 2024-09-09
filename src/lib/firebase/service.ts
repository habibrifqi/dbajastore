import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt"

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}

export async function retriveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();

    return data;
}

export async function signUp(userData: {
    email: string,
    fullname: string,
    phone: string,
    password: string,
    role?: string
}, callback: Function) {


    const q = query(
        collection(firestore, 'users'),
        where('email', '==', userData.email),
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => (
        {
            id: doc.id,
            ...doc.data(),  
        }
    ));

    // jika ada data (usah ada email yg digunakan)
    if (data.length > 0) {
        callback(false)
    } else {
        // jiak tidak ada

        // jika tidak punya role
        if (!userData.role) {
            userData.role = 'member'
        }

        // hash
        userData.password = await bcrypt.hash(userData.password,10);

        // simpan
        await addDoc(collection(firestore, 'users'), userData)
            .then(() => {
                callback(true);
            })
            .catch((error) => {
                callback(false)
                console.log(error)
            });
    }
}