   "use client";
   import React, { useState } from 'react'
   import Signup from './Signup';
   import Link from "next/link";
   const Login = (props) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
         const [isVisible, setIsVisible] = useState(false);
            const [loading, setLoading] = useState(false);
               const [form,setform]=useState({ email:'', password:'',otp:'' })
               const [datas,setdatas]=useState('');
               const [forgets,setforget]=useState(false);
   const [data,setdata]=useState(false)
   const [verify,setverify]=useState(false);
   const [beta,setbeta]=useState(false);
   const [pass,setpass]=useState(false)
            const [errors, setErrors] = useState({});
         const toggleVisibility = () => {
            setIsVisible((prevState) => !prevState);
         };
      
               function handleChange(e){
                  setdatas('')
                  const {name,value}=e.target
                  setform({...form,[name]: value})
                  setErrors({...errors,[name]:"",})
               }

 function validate(){
   let newErrors={};
   if (!form.email.trim()) { newErrors.email = "Email is required"; } 
else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {newErrors.email = "Enter a valid email"; }
if (!form.password.trim()) { newErrors.password = "Password is required"; } 
 else if (form.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(form.password)) {
    newErrors.password = "Password must contain one uppercase letter";
  } else if (!/[a-z]/.test(form.password)) {
    newErrors.password = "Password must contain one lowercase letter";
  } else if (!/[0-9]/.test(form.password)) {
    newErrors.password = "Password must contain one number";
  } else if (!/[!@#$%^&*]/.test(form.password)) {
    newErrors.password = "Password must contain one special character";
  }
  setErrors(newErrors); 

return Object.keys(newErrors).length === 0;
 }

   async function handelSubmit(e){
         e.preventDefault()
             if(!validate(e)){
         return;
      }
         const responce=await fetch(`${API_URL}/auth/login`,{
               method:"POST",
         headers:{"Content-Type":"application/json"},
         credentials: "include",
            body:JSON.stringify(form)
      })
      const data=await responce.json();
      console.log(data.data)
      if(data.data){
         return setdatas(data.data)
      }
         setLoading(true)
            setTimeout(() => {
               props.onClose()
              window.location.reload();
            },1000);
      }

   async function handel(e){
   
      e.preventDefault();
   const responce=await fetch(`${API_URL}/auth/sendotp`,{
      method:"POST",
         headers: {"Content-Type": "application/json",
      },
   body: JSON.stringify({email: form.email, })   
      })
   const data=await responce.json(); 
      alert(data.message)
       setLoading(true)
      setTimeout(() => {
            setverify(true)

      }, 2000);

   }

     async  function password1(e){
             if(!validate(e)){
         return;
      } 
            const responce=await fetch(`${API_URL}/auth/newpassword`,{
      method:"POST",
         headers: {"Content-Type": "application/json",
      },
   body: JSON.stringify({form})   
      }) 
      const data=await responce.json();
      console.log(data)
      alert(data.message)
         setTimeout(() => {
              setforget(false)
              setform("")
            },1000);
        }


   async function otpsubmit(){
   
      const responce=await fetch(`${API_URL}/auth/otpverify`,{
      method:"POST",
         headers: {"Content-Type": "application/json",
      },
   body: JSON.stringify({otp:form.otp,email:form.email})   
      }) 
      const data=await responce.json(); 
      setbeta(data)
      setTimeout(() => {
            setLoading(false)
             setpass(true)
                  setform(prev => ({...prev,password:""}));
              
      }, 2000);
   }
   return (<>
   {props.name && !data && (
      <section className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4 py-4 backdrop-blur-sm md:px-8">
            <div
               className="max-w-4xl border relative border-slate-200 bg-white shadow-sm p-4 rounded-lg lg:p-6 dark:border-neutral-700 dark:bg-neutral-800">
               <img onClick={props.onClose} className='absolute -right-5 -top-5'  src="https://img.icons8.com/emoji/48/cross-mark-button-emoji.png"/>
               <div className="grid md:grid-cols-1 items-center gap-x-8 gap-y-12">
                  <div className="max-w-md mx-auto w-full p-2 md:p-4">
                     <div className="inline-block mb-1">
                        <a href="#">
                           <img src="/nextgenlogo.png" alt="NextGenDeals"  
                              className="w-80 h-auto block dark:invert dark:brightness-100" />
                        </a>
                        {datas&&(<p className="mt-1 text-sm text-red-500"> {datas} </p>)}
                     </div>
                        {forgets ?<>
                        <form className="space-y-6" onSubmit={handel} >
                                    <div>
                              <div className="flex justify-between items-center">
                                 <label htmlFor="email"
                              className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Email</label>
{!pass && !loading && (
  <button
    type="submit"
    className="bg-blue-600 text-white px-5 py-2 mb-2 rounded"
  >
    Send OTP
  </button>
)}

{!pass && loading && (
  <button
    type="button"
    onClick={otpsubmit}
    className="bg-blue-400 text-white px-5 py-2 mb-2 rounded"
  >
    Verify OTP
  </button>
)}

{pass && (
  <button
    type="button"
     onClick={()=>password1()}
    className="bg-blue-600 text-white px-5 py-2 mb-2 rounded"
  >
    Update Password
  </button>
)}
                                 </div>        
                           <input type="email" id="email" name="email" placeholder="john@readymadeui.com"
                              value={form.email}
                              onChange={handleChange}
                              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
                              {errors.email && ( <p className="mt-1 text-sm text-red-500"> {errors.email} </p> )}
                        </div>
                        {verify&&<><div className="-mt-4">OTP
                           <div className='relative'>
                           <input  type="number"   inputMode="numeric" maxLength={6} name="otp" placeholder="Enter you otp"
                              value={form.otp}
                              onChange={handleChange}
                              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
                             <div className='absolute right-1 top-1'>{beta&&(<img src='https://img.icons8.com/?size=100&id=CIdgkSn4RFPP&format=png&color=000000'alt='tick' className='h-8 w-8'/>)}
                            </div>
                              </div>
                           </div></>}
                            {pass&& <>
                           <label className='relative'>New password</label>
                              
                           <button  
                              type="button"
                              id="togglePassword"
                              onClick={toggleVisibility}
                              aria-label={isVisible ? "Hide password" : "Show password"}
                              aria-pressed={isVisible}
                              className="absolute top-98 right-10 p-0.5 flex cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg"
                                 className="size-[18px] fill-slate-400 text-slate-400 overflow-visible" viewBox="0 0 128 128">
                                 <path
                                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z">
                                 </path>
                                 {!isVisible && (
                                    <path
                                       d="M15 15l98 98"
                                       stroke="currentColor"
                                       strokeWidth="10"
                                       strokeLinecap="round"
                                       className="stroke-slate-400"
                                    />
                                 )}
                              </svg>
                           </button>
                              <input type={isVisible ? "text" : "password"}
                              id="password"
                              name="password"
                              placeholder="••••••••"
                              value={form.password}
                              onChange={handleChange}
                              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                           /> 
                            {errors.password && ( <p className="-mt-3 text-sm text-red-500"> {errors.password} </p> )}
                           </>}  
                           </form>
                        </>:<>  <form className="space-y-6" onSubmit={handelSubmit} >
                        <div>
                           <label htmlFor="email"
                              className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Email</label>
                           <input type="email" id="email" name="email" placeholder="john@readymadeui.com"
                              value={form.email}
                              onChange={handleChange}
                              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
                     {errors.email && ( <p className="mt-1 text-sm text-red-500"> {errors.email} </p> )}
                        </div>

                        <div className="relative">
                           <label htmlFor="password"
                              className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Password</label>

                           <button  
                              type="button"
                              id="togglePassword"
                              onClick={toggleVisibility}
                              aria-label={isVisible ? "Hide password" : "Show password"}
                              aria-pressed={isVisible}
                              className="absolute top-1 right-2 p-0.5 flex cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg"
                                 className="size-[18px] fill-slate-400 text-slate-400 overflow-visible" viewBox="0 0 128 128">
                                 <path
                                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z">
                                 </path>
                                 {!isVisible && (
                                    <path
                                       d="M15 15l98 98"
                                       stroke="currentColor"
                                       strokeWidth="10"
                                       strokeLinecap="round"
                                       className="stroke-slate-400"
                                    />
                                 )}
                              </svg>
                           </button>

                           <input type={isVisible ? "text" : "password"}
                              id="password"
                              name="password"
                              placeholder="••••••••"
                              value={form.password}
                              onChange={handleChange}
                              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                           />
                           {errors.password && ( <p className="mt-1 text-sm text-red-500"> {errors.password} </p>)}
                        </div>

                        <div className="flex items-start flex-wrap gap-2">
                     

                           <div onClick={()=>{setforget(true),setdatas('')}}
                              className="text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                              Forgot password?
                           </div>
                        </div>

                        <button type="submit" 
                        disabled={loading}
                           className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                           {loading ? "Login..." : "Sign up"}
                        </button>
                     </form></>}
                     <div className="flex items-center gap-4 my-8">
                        <hr className="w-full border-slate-300 dark:border-neutral-700" />
                        <p className="text-sm text-slate-700 text-center dark:text-slate-300">or</p>
                        <hr className="w-full border-slate-300 dark:border-neutral-700" />
                     </div>

                     <div>
                  
                        <a href="#"
                           className="w-full flex items-center justify-center gap-2.5 py-2 px-3.5 text-sm rounded-md font-semibold text-slate-900 border border-slate-300 bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-50 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:bg-neutral-600">
                           <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px]" viewBox="0 0 512 512" aria-hidden="true">
                              <path fill="#fbbd00"
                                 d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                 data-original="#fbbd00" />
                              <path fill="#0f9d58"
                                 d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                 data-original="#0f9d58" />
                              <path fill="#31aa52"
                                 d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                 data-original="#31aa52" />
                              <path fill="#3c79e6"
                                 d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                 data-original="#3c79e6" />
                              <path fill="#cf2d48"
                                 d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                 data-original="#cf2d48" />
                              <path fill="#eb4132"
                                 d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                 data-original="#eb4132" />
                           </svg>
                           Sign in with Google
                        </a>
                     </div>

                     <div className="mt-6 text-slate-900 text-sm text-center dark:text-slate-50">Don't have an account? 
                     <button  onClick={()=>setdata(true)}
                        className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Sign  up</button>
                     </div>
                  </div>
               
               </div>
            </div>
            </section>
            )}
            {data &&(<Signup name={true} Close={props.onClose} show={()=>setdata(false)}  />)}


      </>)
   }

   export default Login