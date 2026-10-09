"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import Login from "./Login";
const Header = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL|| null;
  const [mobileMenu, setMobileMenu] = useState(false);
  const[search,setSearch]=useState("")
 const [login,setlogin]=useState(false);
 const [user,setuser]=useState(false);

useEffect(()=>{
  async function verify(){
     const responce=await fetch(`${API_URL}/auth/verify`,{
      method:"GET",
      credentials:"include",
     })
     const data=await responce.json();
     console.log(data)
       setuser(data);
  }
verify();
},[])
async function out(){
  const responce= await fetch(`${API_URL}/auth/logout`,{
    method:"GET",
    credentials:"include",
  })
  const data=await responce.json();
 try{
  if(responce.ok){
    
    setTimeout(() => {
        setuser(false)
    },1000);
  
  }
}catch(error){
  console.log("something went wrong")
}
 

}

  return (
    <>
    {login &&(   <Login name={true} onClose={() => setlogin(false)}/>)}
    {user.verified===true ?<>
    <header className="sticky top-0 z-50 border-b  border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[90px] items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-lg font-bold text-white shadow-md">
              N
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                NextGen<span className="text-blue-700">Deals</span>
              </h1>

              <p className="text-[9px] font-semibold tracking-[2px] text-slate-400">
                SMART INVESTING
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="ml-8 hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Home
            </Link>

            <Link
              href="/brokers"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Brokers
            </Link>

            <Link
              href="/compare"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Compare
            </Link>

            <Link
              href="/calculators"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Calculators
            </Link>
          </nav>

          {/* Right Side */}
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <input
              type="text"
              placeholder="Search"
               value={search}
                 onChange={(e) => setSearch(e.target.value)}
              className="mx-2 w-100 rounded-3xl border border-slate-300 px-4 py-1 outline-none focus:border-blue-500"
            />

            <button 
              type="button"
              className="flex h-10 w-25 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
            >
              Search
            </button>

            <button onClick={out}
              type="button"
              className="px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
            >
              Logout 
            </button>
            </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMobileMenu((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xl md:hidden"
          >
            {mobileMenu ? "×" : "☰"}
          </button>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="absolute left-0 top-full w-full border-t border-slate-200 bg-white shadow-md md:hidden">
              <div className="space-y-1 px-4 py-4">

                <Link
                  href="/"
                  onClick={() => setMobileMenu(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium"
                >
                  Home
                </Link>

                <Link
                  href="/brokers"
                  onClick={() => setMobileMenu(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium"
                >
                  Brokers
                </Link>

                <Link
                  href="/compare"
                  onClick={() => setMobileMenu(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium"
                >
                  Compare Brokers
                </Link>

                <Link
                  href="/calculators"
                  onClick={() => setMobileMenu(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium"
                >
                  Calculators
                </Link>

                <div className="mt-3 border-t pt-3">
                  <button
                    type="button"
                    className="mb-3 w-full rounded-xl bg-slate-100 px-4 py-3"
                  >
                    Login
                  </button>

                  <Link
                    href="/open-account"
                    className="flex w-full justify-center rounded-xl bg-blue-700 px-4 py-3 text-white"
                  >
                    Open Account
                  </Link>
                </div>

              </div>
            </div>
          )}
             
        </div>
         <div className="-mt-5 text-end text-red-400">User: {user.message}</div>
      </div>
    </header>

 </>:<> <header className="sticky top-0 z-50 border-b  border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[90px] items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-lg font-bold text-white shadow-md">
              N
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                NextGen<span className="text-blue-700">Deals</span>
              </h1>

              <p className="text-[9px] font-semibold tracking-[2px] text-slate-400">
                SMART INVESTING
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="ml-8 hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Home
            </Link>

            <Link
              href="/brokers"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Brokers
            </Link>

            <Link
              href="/compare"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Compare
            </Link>

            <Link
              href="/calculators"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Calculators
            </Link>
          </nav>

          {/* Right Side */}
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <input
              type="text"
              placeholder="Search"
               value={search}
                 onChange={(e) => setSearch(e.target.value)}
              className="mx-2 w-100 rounded-3xl border border-slate-300 px-4 py-1 outline-none focus:border-blue-500"
            />

            <button 
              type="button"
              className="flex h-10 w-25 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
            >
              Search
            </button>

            <button onClick={()=>setlogin(true)}
              type="button"
              className="px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
            >
              Login / SignUp
            </button>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMobileMenu((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xl md:hidden"
          >
            {mobileMenu ? "×" : "☰"}
          </button>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="absolute left-0 top-full w-full border-t border-slate-200 bg-white shadow-md md:hidden">
              <div className="space-y-1 px-4 py-4">

                <Link
                  href="/"
                  onClick={() => setMobileMenu(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium"
                >
                  Home
                </Link>

                <Link
                  href="/brokers"
                  onClick={() => setMobileMenu(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium"
                >
                  Brokers
                </Link>

                <Link
                  href="/compare"
                  onClick={() => setMobileMenu(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium"
                >
                  Compare Brokers
                </Link>

                <Link
                  href="/calculators"
                  onClick={() => setMobileMenu(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium"
                >
                  Calculators
                </Link>

                <div className="mt-3 border-t pt-3">
                  <button
                    type="button"
                    className="mb-3 w-full rounded-xl bg-slate-100 px-4 py-3"
                  >
                    Login
                  </button>

                  <Link
                    href="/open-account"
                    className="flex w-full justify-center rounded-xl bg-blue-700 px-4 py-3 text-white"
                  >
                    Open Account
                  </Link>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </header></>}
    </>
  );
};

export default Header;