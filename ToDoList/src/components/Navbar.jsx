import React from 'react'

function Navbar() {
  return (
   <nav className='flex justify-between bg-slate-600 text-white py-4'>
    <div className='logo'>
        <span className='font-bold text-xl mx-9'>iTask</span>
    </div>
    <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer'>Home</li>
        <li  className='cursor-pointer'>Your Tasks</li>
    </ul>
   </nav>
  )
}

export default Navbar
