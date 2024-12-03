import bcrypt from "bcrypt"
import { addData, retriveDataByField } from "@/lib/firebase/service";

export async function signUp(userData: {
    email: string,
    fullname: string,
    phone: string,
    password: string,
    role?: string,
    created_at?: Date,
    updated_at?: Date
}, callback: Function) {


    const data = await retriveDataByField('users', 'email', userData.email)

    // jika ada data (usah ada email yg digunakan)
    if (data.length > 0) {
        callback(false,'EmailonUse')
    } else {
        // jiak tidak ada

        // jika tidak punya role
        if (!userData.role) {
            userData.role = 'member'
        }

        // hash
        userData.password = await bcrypt.hash(userData.password,10);
        userData.created_at = new Date()
        userData.updated_at = new Date()

        // simpan
        addData('users',userData,(result:boolean) => {
            callback(result)
        })
    }
}

export async function signIn(
    email: string,
) {


    const data = await retriveDataByField('users', 'email', email);

    // jika ada data (usah ada email yg digunakan)
    if (data) {
        return data[0];
    }else{
        return null
    }
}

export async function loginWithGoogle(data:any, callback:Function) {
    const user = await retriveDataByField('users', 'email', data.email);

    if (user.length > 0) {
        callback(user[0])
    }else{
        data.role = 'member';

        await addData('users',data,(result:boolean) => {
            if (result) {
                callback(data)
            }
        })

    }
}