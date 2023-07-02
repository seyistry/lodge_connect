import React from 'react'

const Login = () => {
    return (
        <div className="w-full min-h-screen py-40 bg-gradient-to-b from-gray-800 to-black">
            <div className="container mx-auto">
                <div className='bg-white rounded-xl shadow-lg flex  w-10/12 mx-auto      overflow:hidden'>
                    <div className='w-1/2 border-2 border-red-400 py-12'>
                        <h2>Welcome</h2>
                    </div>
                    <div className='w-1/2 py-12 px-10 '>
                        <h2 className='font-bold text-2xl mb-4'>REGISTER</h2>
                        <p> Create your account. It’s free and only take a minute</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login