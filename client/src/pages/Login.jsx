import React from 'react'
import { FormField } from '../components/Auth/FormField'
import { useForm } from 'react-hook-form'
export default function Login() {
    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm();

    function submitForm(data){
        console.log(data);
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-slate-800 mb-4 text-center">Login</h1>
            <p className="text-gray-500 mb-6 text-center">Enter your credentials to access your account.</p>
            <form action="#" method="POST" className="flex flex-col gap-6">



                <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="e.g. user@domain.com"
                    {...register("email", { required: false })}
                />
                
                <FormField
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: false })}
                />
                
                <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id="rememberMe" 
                            className="text-blue-600 focus:ring-blue-500" 
                            {...register("rememberMe", { required: false })}
                        />
                        <span className="text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:underline disabled:text-gray-400" >Forgot password?</a>
                </div>
                
                <button 
                    type="submit" 
                    className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors shadow-md text-lg font-medium"
                    onClick={handleSubmit(submitForm)}
                >
                    Login
                </button>
            </form>
        </div>
    </div>

  )
}
