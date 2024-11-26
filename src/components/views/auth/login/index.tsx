
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
        <div>
            <div className="formlogin max-w-sm mx-auto mt-44 border-collapse border-2 p-4 ">
            <form onSubmit={handleSumbit} className="">
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



                <div className="flex justify-between items-center mb-2">
                    <Link href="/auth/register" className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-500">Create an account</Link>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </div>
            

            </form>
            <div className="flex justify-between items-center mt-4 ">
                    <button className="flex justify-center items-center text-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none min-w-full" onClick={() => signIn('google', { callbackUrl, redirect: false })}>
                    {/* <button className="flex items-center text-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none min-w-full" onClick={() => signIn('google', { callbackUrl, redirect: false })}> */}
                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>
            </div>
            {/* <hr /> */}
           
        </div>
    );
};

export default LoginViews;
