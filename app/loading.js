import React from 'react'

const loading = () => {
  return (
     <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>

          <div className="absolute inset-4 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">₹</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-slate-800">
            Loading...
          </p>
          <p className="text-sm text-slate-500">
            Getting broker information
          </p>
        </div>
      </div>
    </div>
  )
}

export default loading