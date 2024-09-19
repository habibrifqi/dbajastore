
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const LoginViews = () => {
    const { data } = useSession()
    const { push, query } = useRouter();

    const [errors, setErrors] = useState(false);

    const callbackUrl: any = query.callbackUrl || '/';

    console.log(callbackUrl)

    if (data) {
        push(callbackUrl);
    }

    const handleSumbit = async (event: FormEvent<HTMLElement>) => {
        const form = event.target as HTMLFormElement;
        event.preventDefault();

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: form.email.value,
                password: form.password.value,
                callbackUrl
            })

            if (!res?.error) {
                form.reset();
                push(callbackUrl);
            } else {
                setErrors(!errors);
            }
        } catch (error) {
            console.log(error)

        }

    }
    return (
        <div className="">

            <form onSubmit={handleSumbit} className="max-w-sm mx-auto mt-64 border-collapse border-2 p-4">
                <h1 className="text-3xl font-bold mb-5 text-center w-full">login</h1>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="rifqierror.example.com" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password-error" className={` ${errors ? 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500' : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'}`}>Your password</label>
                    <input type="password" name="password" id="password" 
                    className={` ${errors ? 
                        'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' 
                        : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}`} />
                </div>
                {errors && <p className="mt-2 mb-2 text-center  text-sm text-red-600 dark:text-red-500" style={{ color: 'red' }}>{'gagal login periksa kembali password dan email'}</p>}



                <div className="flex justify-between items-center">
                    <Link href="/auth/register" className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-500">Create an account</Link>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </div>
                <div>

                </div>
            </form>

        </div>
    );
};

export default LoginViews;
