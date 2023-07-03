import React from 'react'
import { useRef, useState, useEffect } from "react";
import "./reg.css"
import { Link } from 'react-router-dom';




// regex function
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;




const Register = () => {
    // const userRef = useRef();
    // const errRef = useRef();



    // stating the useSates for input fields
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd)
    }, [pwd, matchPwd])

    useEffect(() => {
        setValidEmail(emailRegex.test(email));
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/",
                JSON.stringify({ user, pwd:password, email, }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }

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
                        <form onSubmit={handleSubmit} action='#' >

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
                            {/* Surname input */}
                            <div className='mt-5'>
                                <input type='text'
                                    placeholder='Surname'

                                    required

                                    className='border border-gray-400 py-1
                                 px-2 w-full rounded-sm' />




                            </div>
                            {/* email input */}
                            <div className='mt-5'>
                                <input type='email' placeholder='Email'
                                    required
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className='border border-gray-400 py-1 px-2 w-full rounded-sm' />

                                <p className={email && !validEmail ? "instructions" : "offscreen"}>

                                    Please input a correct Email address
                                </p>
                            </div>

                            <div className='mt-5'>
                                <input type='text' placeholder='Address' className='border border-gray-400 py-1 px-2 w-full rounded-sm' />
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
                            {/* confirm password */}
                            <div className='mt-5'>
                                <input type='password'
                                    placeholder='Confirm Password'
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    className='border border-gray-400 py-1 px-2 w-full rounded-sm' />

                                <p className={matchPwd && !validMatch ? "instructions" : "offscreen"}>

                                    Must match the first password input field.
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


                        </form>
                        <p className='mt-2 text-center text-sm'> Already registered?<Link to ="/login">Login here</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default Register