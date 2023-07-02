import React from 'react'

const Login = () => {
    return (
        <div className="w-full min-h-screen py-40 bg-gradient-to-b from-gray-800 to-black">
            <div className="container mx-auto">
                <div className='bg-white rounded-xl shadow-lg flex  w-10/12 mx-auto      overflow:hidden'>
                    {/* style the left image */}
                    <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-reg-back" >
                        <h1 class="text-white text-3xl mb-3">Welcome</h1>
                        <div>
                            <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac <a href="#" class="text-purple-500 font-semibold">Learn more</a></p>
                        </div>
                    </div>
                    <div className='w-1/2 py-12 px-10 '>
                        <h2 className='font-bold text-2xl mb-4'>REGISTER</h2>
                        <p className='mb-4'> Create your account. It’s free and only take a minute</p>

                        {/* create the input forms */}
                        <form action='#' >
                            <div className='grid grid-cols-2 gap-3 mb-4'>
                                <input type='text' placeholder='Firstname' className="border border-gray-400 px-2" />

                                <input type='text' placeholder='Surname' className='border border-gray-400 py-1 px-2' />
                            </div>
                            {/* email input */}
                            <div className=''>
                                <input type='email' placeholder='Email' className='border border-gray-400 py-1 px-2 w-full rounded-sm' />
                            </div>
                            <div className='mt-5'>
                                <input type='text' placeholder='Address' className='border border-gray-400 py-1 px-2 w-full rounded-sm' />
                            </div>
                            <div className='mt-5'>
                                <input type='password' placeholder='Password' className='border border-gray-400 py-1 px-2 w-full rounded-sm' />
                            </div>
                            <div className='mt-5'>
                                <input type='password' placeholder='Confrim Password' className='border border-gray-400 py-1 px-2 w-full rounded-sm' />
                            </div>
                            <div class="mt-5">
                                <input type="checkbox" className="border border-gray-400" />
                                <span>
                                    I accept the <a href="#" class="text-purple-500 font-semibold">Terms of Use</a> &  <a href="#" class="text-purple-500 font-semibold">Privacy Policy</a>
                                </span>

                            </div>
                            <div class="mt-5">
                                <button class="w-full bg-purple-500 py-3 text-center text-white">Register Now</button>
                            </div>


                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login