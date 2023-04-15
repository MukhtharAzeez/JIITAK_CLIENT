import React from 'react'

function Navbar() {
    return (
        <div className='w-full h-28 bg-gray-300 shadow-lg flex items-center justify-around fixed'>
            <div>
                <p className="text-center text-xl text-gray-500 font-light">
                    <span className='uppercase font-bold text-3xl'>Mukhthar Azeez</span>
                </p>
            </div>
            <div>
                <p className="text-center text-xl text-gray-500 font-light cursor-pointer hover:underline underline-offset-8">
                    Logout
                </p>
            </div>
        </div>
    )
}

export default Navbar
    