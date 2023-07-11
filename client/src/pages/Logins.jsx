import React, { useContext } from 'react'
import { useRef, useState, useEffect } from "react";
import "./reg.css"
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { userContext } from './UserContext';
import {users} from "./data.js"
// import { data } from 'autoprefixer';


const Logins = () => {
       const {user,setUser} = useContext(userContext)
      


    // stating the useSates for input fields
    const [email, setEmail] = useState('')
    // const [validName, setValidName] = useState(false);
    

    const [pwd, setPwd] = useState('');
    // const [validPwd, setValidPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [redirect, sectRedirect] =useState(false)
   
  

    // useEffect(() => {
    //     setErrMsg('');
    // }, [email, pwd])
    useEffect(()=>{
        const userE = users.filter(items =>  items.email === email)
        setUser(userE[0])
        },
        [email])

    const handleLoginSubmit =  (e) => {
        e.preventDefault();
        try{
        
        //     const data = await axios.post("/",
        //         JSON.stringify({ email, pwd: password}),
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         }
        //     );
       
        //     console.log(response?.name);
        //     console.log(response?.accessToken);
        //     console.log(JSON.stringify(response))
        //     setSuccess(true);
        //     sectRedirect(true)
        //     //clear state and controlled inputs
        //     //need value attrib on inputs for this
        
        // setUser(userE)
//    console.log(userE)



console.log(user)

console.log(typeof(user))
console.log(`user in even ${user.email}`)
        }catch(err){console.log(err)}

    }
   
console.log(user)
    // if(user){
      
            
    //         return    <Navigate to ={"/account"} />
          
    // }
 

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
                                <input type='email' placeholder='Email'
                                    required

                                    onChange={(e) => setEmail(e.target.value)}

                                    value={email} className="border border-gray-400 py-1 px-2 w-full rounded-sm" />
               

                            </div>


                            {/* Password input */}
                            <div className='mt-5'>
                                <input type='password'
                                    placeholder='Password'
                                    value={pwd}
                                    required

                                    onChange={(e) => setPwd(e.target.value)} className='border border-gray-400 py-1
                                 px-2 w-full rounded-sm' />


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

export default Logins





// regex function
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;





// const Logins = () => {
//    const [setUser] = useContext(userContext)


//     // stating the useSates for input fields
//     const [email, setEmail] = useState('');
//     // const [validName, setValidName] = useState(false);
    

//     const [pwd, setPwd] = useState('');
//     // const [validPwd, setValidPwd] = useState(false);

//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);
//     const [redirect, sectRedirect] =useState(false)
//     // useEffect(() => {
//     //     userRef.current.focus();
//     // }, [])

//     // useEffect(() => {
//     //     setValidName(USER_REGEX.test(user));
//     // }, [user])

//     // useEffect(() => {
//     //     setValidPwd(PWD_REGEX.test(pwd));
        
//     // }, [pwd])

   

//     useEffect(() => {
//         setErrMsg('');
//     }, [user, pwd])

//     const handleLoginSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const data = await axios.post("/",
//                 JSON.stringify({ email, pwd: password}),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );
//             setUser(data)
//             console.log(response?.data);
//             console.log(response?.accessToken);
//             console.log(JSON.stringify(response))
//             setSuccess(true);
//             sectRedirect(true)
//             //clear state and controlled inputs
//             //need value attrib on inputs for this
            
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else {
//                 setErrMsg('Login Failed')
//             }
//             errRef.current.focus();
//         }

//     }

//     if(redirect){
//         return <Navigate to ={"/"} />
//     }

//     return (

//         <div className="w-full min-h-screen py-40 bg-gradient-to-b from-gray-800 to-black">
//             <div className="container mx-auto">
//                 <div className='bg-white rounded-xl shadow-lg flex flex-col lg:flex-row w-10/12 lg:w-8/12 mx-auto overflow:hidden'>
//                     {/* style the left image */}
//                     <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-regback" >
//                         <h1 class="text-white text-3xl mb-3">Welcome</h1>
//                         <div>
//                             <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac <a href="#" class="text-purple-500 font-semibold">Learn more</a></p>
//                         </div>
//                     </div>
//                     <div className=' w-full lg:w-1/2 py-12 px-10 '>
//                         <h2 className='font-bold text-2xl mb-4'>REGISTER</h2>
//                         <p className='mb-4'> Create your account. It’s free and only take a minute</p>

//                         {/* create the input forms */}
//                         <form onSubmit={handleLoginSubmit} action='#' >

//                             <div className='mb-4'>
//                                 <input type='email' placeholder='Email'
//                                     required

//                                     onChange={(e) => setEmail(e.target.value)}

//                                     value={user} className="border border-gray-400 py-1 px-2 w-full rounded-sm" />
               

//                             </div>


//                             {/* Password input */}
//                             <div className='mt-5'>
//                                 <input type='password'
//                                     placeholder='Password'
//                                     value={pwd}
//                                     required

//                                     onChange={(e) => setPwd(e.target.value)} className='border border-gray-400 py-1
//                                  px-2 w-full rounded-sm' />


//                             </div>


                           
//                             <div class="mt-5">
//                                 <button class="w-full bg-purple-500 py-3 text-center text-white">Register Now</button>
//                             </div>

//                             <div className="text-center py-2 text-gray-500">
//                              Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
//                             </div>
                        
//                         </form>
                       
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )

// }
// export default Logins