import 'boxicons'
import React from 'react'
import { useForm } from "react-hook-form"
import { FormStepIndicator } from '../components/Auth/FormStepIndicator';
import { FormField } from '../components/Auth/FormField';
import { postRequest } from '../utils/apiRequests';
import { Password } from '../components/Auth/Password';

function Step1({setSelectedForm}){
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      

    async function nextFormPage(data){
        console.log(data)
        try{
          console.log("sendint the request")
          const response = await postRequest("http://localhost:3000/signup", data);
          console.log(response)
        }catch(e){
          console.log(e)
        }
        // setSelectedForm(s => Math.min(s+1,3));
    }
    return(<>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Personal info</h1>
            <p className="text-gray-500 mb-6">Please provide your name, email address, and phone number.</p>
            <form action="#" method="POST" className="flex flex-col gap-6">
                {/* <!-- Name Field --> */}
                <FormField
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="e.g. Stephen King"
                    {...register("name",{required : false})}
                    error={errors.name}
                    />
                
                <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="e.g. stephenking@lorem.com"
                    {...register("email",{required : false})}
                    error = {errors.email}
                    />
                
                <Password 
                  register={register}
                  error={errors.password}
                />

                {/* <!-- Next Step Button --> */}
                <div className="flex justify-end">
                <button
                    onClick={handleSubmit(nextFormPage)}
                    type="submit"
                    className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Next Step
                </button>
                </div>
            </form>
    </>);
}

function Step2({ setSelectedForm }) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    async function nextFormPage(data) {
      console.log(data);
      const response = await postRequest("http://localhost:3000/signup", data);
      console.log(response)
      setSelectedForm((s) => Math.min(s + 1, 3));
    }
  
    return (
      <>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Verification</h1>
        <p className="text-gray-500 mb-6">Please verify your email or phone number.</p>
        <form action="#" method="POST" className="flex flex-col gap-6">
          <FormField
            label="Verification Code"
            id="verificationCode"
            type="text"
            placeholder="Enter the code sent to your email or phone"
            {...register("verificationCode", { required: false })}
            error={errors.verificationCode}
          />
  
          <div className="flex justify-end">
            <button
              onClick={handleSubmit(nextFormPage)}
              type="submit"
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Next Step
            </button>
          </div>
        </form>
      </>
    );
  }
  
  function Step3({ setSelectedForm }) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    async function nextFormPage(data) {
      console.log(data);
      const response = await postRequest("http://localhost:3000/signup", data);
      console.log(response)
      setSelectedForm((s) => Math.min(s + 1, 3));
    }
  
    return (
      <>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Backup Contact</h1>
        <p className="text-gray-500 mb-6">Please provide a backup email or phone number.</p>
        <form action="#" method="POST" className="flex flex-col gap-6 ">
          <FormField
            label="Backup Email"
            id="backupEmail"
            type="email"
            placeholder="e.g. backup@domain.com"
            {...register("backupEmail", { required: false })}
            error={errors.backupEmail}
          />
  
          <FormField
            label="Backup Phone"
            id="backupPhone"
            type="text"
            placeholder="e.g. +1 987 654 321"
            {...register("backupPhone", { required: false })}
            error={errors.backupPhone}
          />
  
          <div className="flex justify-end">
            
            <button
              onClick={handleSubmit(nextFormPage)}
              type="submit"
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </>
    );
  }
  

export default function SignUp() {
    const [selectedForm, setSelectedForm] = React.useState(1);
  return (
    <main className="bg-slate-100 flex items-center justify-center min-h-screen">

        {/* <!-- Outer Container --> */}
        <div className="bg-white w-[920px] rounded-lg shadow-xl flex flex-col md:flex-row p-4 md:p-8">
            
            {/* <!-- Left Panel (Step indicators) --> */}
            <div className="hidden md:flex flex-col w-1/3 p-8 rounded-lg text-white bg-[#483EFF]">
                <div className="flex flex-col gap-8">
                    <FormStepIndicator step = "1" title = "Your info" isSelected = {selectedForm === 1}/>
                    <FormStepIndicator step = "2" title = "Verification" isSelected = {selectedForm === 2}/>
                    <FormStepIndicator step = "3" title = "Backup" isSelected = {selectedForm === 3}/>
                </div>
            </div>

            {/* <!-- Right Panel (Form) --> */}
            <div className="w-full md:w-2/3 px-4 py-8 md:px-8 md:py-12">
                {selectedForm === 1 && <Step1 setSelectedForm = {setSelectedForm}/>}
                {selectedForm === 2 && <Step2 setSelectedForm = {setSelectedForm}/>}
                {selectedForm === 3 && <Step3 setSelectedForm = {setSelectedForm}/>}
            </div>
        </div>

        </main>
  )
}
