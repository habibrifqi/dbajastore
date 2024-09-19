import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useFormState } from "react-dom";
import {z} from "zod"



const RegisterView = () => {

    const { push } = useRouter();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSumbit = async (event : FormEvent<HTMLElement>) => {
        const form = event.target as HTMLFormElement;
        event.preventDefault();
        const data ={
            email : form.email.value,
            username : form.username.value,
            numberphone : form.phoneNumber.value,
            password : form.password.value
        }

        // Manual validation rules
        const newErrors: { [key: string]: string } = {};
        if (!data.email.includes('@')) {
            newErrors.email = 'Invalid email address';
        }
        if (data.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            data.password = ''; // Reset password if validation fails
            form.password.value = ''; // Clear the password field in the form
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

      


        const result = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (result.status === 200) {
            form.reset();
            push('/auth/login');
        }else{

        }

    }


  return (
    <div className="">
      <form onSubmit={handleSumbit} className="max-w-sm mx-auto mt-20 border-collapse border-2 p-4">
        <h1 className="text-3xl font-bold mb-5 text-center w-full">Register</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="rifqierror.example.com"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
             Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
             Phone 
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div className="flex justify-between items-center">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-500"
          >
            Already have an account? Login
          </Link>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </div>
        <div></div>
      </form>
    </div>
  );
};

export default RegisterView;
