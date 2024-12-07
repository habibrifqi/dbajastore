import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import  authServices  from "@/services/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useFormState } from "react-dom";
import {z} from "zod"



const RegisterView = () => {

    const { push } = useRouter();
    const [loading, setLoading] = useState(false);


    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSumbit = async (event : FormEvent<HTMLElement>) => {
        const form = event.target as HTMLFormElement;
        event.preventDefault();
        setLoading(true);
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
            setLoading(false);
            return;
        }

      


        // const result = await fetch('/api/user/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });
     

          // Jalankan fungsi register account dari service auth
          try {
            const result = await authServices.registerAccount(data);
            // Jika berhasil maka reset form dan redirect ke halaman login
            if (result.status === 200) {
              form.reset();
              push('/auth/login');
            }
          } catch (error) {
            // Jika terjadi error maka tangani error tersebut
            if (axios.isAxiosError(error)) {
              // Ambil pesan error dari response server
              const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
              // Reset password jika terjadi error
              data.password = '';
              // Reset value input password di form
              form.password.value = '';
              // Set error di state errors
              setErrors({ password: errorMessage });
            } else {
              // Jika error tidak terduga maka log error tersebut
              console.error('Error tidak terduga:', error);
            }
          } finally {
            // Set loading menjadi false setelah selesai menjalankan fungsi
            setLoading(false);
          }



    }


  return (
    <div className="">
      <form onSubmit={handleSumbit} className="max-w-sm mx-auto mt-20 border-collapse border-2 p-4">
        <h1 className="text-3xl font-bold mb-5 text-center w-full">Register</h1>
        {/* <div className="mb-5">
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
        </div> */}
        {/* <div className="mb-5">
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
        </div> */}
        {/* <div className="mb-5">
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
        </div> */}
        {/* <div className="mb-5">
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
       
        </div> */}
        <Input label="Email Address" name="email" type="email" placeholder="Yourmail@example.com" />
        <Input label="Username" name="username" type="text" placeholder="Username" />
        <Input label="Phone Number" name="phoneNumber" type="number" placeholder="Phone Number" />
        <Input label="Password" name="password" type="password" placeholder="Your Password" />
        {errors.password && <p className="text-center" style={{ color: 'red' }}>{errors.password}</p>}
        <div className="flex justify-between items-center">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-500"
          >
            Already have an account? Login
          </Link>
          <Button 
          type="submit"
          className="text-white">
             {loading ? 'Loading...' : 'Register'}
          </Button>

        </div>
        <div></div>
      </form>
    </div>
  );
};

export default RegisterView;
