import React from 'react'
import { useRef, useState, useEffect } from "react";
import "./reg.css"
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

// regex function
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;





const Register = () => {
 


    // stating the useSates for input fields
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [redirect, sectRedirect] =useState(false)
    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        
    }, [pwd])

   

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post("/",
                JSON.stringify({ user, pwd: password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUser(data)
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            sectRedirect(true)
            //clear state and controlled inputs
            //need value attrib on inputs for this
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }

    }

    if(redirect){
        return <Navigate to ={"/"} />
    }

    return (

        <div className="w-full min-h-screen py-40 bg-gradient-to-b from-gray-800 to-black">
            <div className="container mx-auto">
                <div className='bg-white rounded-xl shadow-lg flex flex-col lg:flex-row w-10/12 lg:w-8/12 mx-auto overflow:hidden'>
                    {/* style the left image */}
                    <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-regback" >
                        <h1 class="text-white text-3xl mb-3">Welcome</h1>
                        <div>
                            <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac <a href="#" class="text-purple-500 font-semibold">Learn more</a></p>
                        </div>
                    </div>
                    <div className=' w-full lg:w-1/2 py-12 px-10 '>
                        <h2 className='font-bold text-2xl mb-4'>REGISTER</h2>
                        <p className='mb-4'> Create your account. It’s free and only take a minute</p>

                        {/* create the input forms */}
                        <form onSubmit={handleLoginSubmit} action='#' >

                            <div className='mb-4'>
                                <input type='text' placeholder='Firstname'
                                    required

                                    onChange={(e) => setUser(e.target.value)}

                                    value={user} className="border border-gray-400 py-1 px-2 w-full rounded-sm" />
                                <p className={user && !validName ? "instructions" : "offscreen"}>

                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>

                            </div>


                            {/* Password input */}
                            <div className='mt-5'>
                                <input type='password'
                                    placeholder='Password'
                                    value={pwd}
                                    required

                                    onChange={(e) => setPwd(e.target.value)} className='border border-gray-400 py-1
                                 px-2 w-full rounded-sm' />

                                <p className={pwd && !validPwd ? "instructions" : "offscreen"}>

                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>


                            </div>


                            <div class="mt-5">
                                <input type="checkbox" required className="border border-gray-400" />
                                <span>
                                    I accept the <a href="#" class="text-purple-500 font-semibold">Terms of Use</a> &  <a href="#" class="text-purple-500 font-semibold">Privacy Policy</a>
                                </span>

                            </div>
                            <div class="mt-5">
                                <button class="w-full bg-purple-500 py-3 text-center text-white">Register Now</button>
                            </div>

                            <div className="text-center py-2 text-gray-500">
                             Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
                            </div>
                        
                        </form>
                       
                    </div>

                </div>
            </div>
        </div>
    )

}
export default Register