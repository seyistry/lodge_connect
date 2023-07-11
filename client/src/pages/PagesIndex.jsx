import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

 const PagesIndex = () => {
    const { action } = useParams()
    const [title,setTitle] = useState()
    const [addedPhotos, setAddedPhotos ] = useState([])
    const [address,SetAddress] = useState()
    const [photoByLink, setPhotoByLink] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    // Upload pictures
   
      const uploadPhotos =(e)=>{
        
        const files =  e.target.files
        const {name} = files[0]
        console.log({files})
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
            console.log(data)}
        axios.post("/uploads",data,{
            headers: {'Content-type':'multipart/form-data'}
          } ).then(res =>{
            const {data:filename} = res
            setAddedPhotos(prev => {
                return [...prev, ...filename]
            })
          })

      }
   
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        const dataPlace = {
            title,location,addedPhotos,location,
            description
        }
        
    }


    console.log(action)
    return (
        <div>



            {action !== "new" && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-red-500 text-white py-2 px-6 rounded-full" to={'/account/places/new'} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Add new place
                    </Link>
                    <p>last page</p>
                </div>
            )}
            {action === "new" && (
                <div className='flex justify-center '>
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <h2 className='text-xl mt-2'>Title</h2>
                        <input type='text' placeholder='Title' value={title}
                        onChange={e=>{setTitle(e.target.value)}} className="border border-gray-400 py-1 px-2 
                w-full rounded-sm"/>
                        {/* Address */}
                        <h2 className='text-xl mt-2'>Address</h2>
                        <input type='text' value={address} onChange={e=>{SetAddress(e.target.value)}}placeholder='Address' className="border border-gray-400 py-1 px-2 
                            w-full rounded-sm"/>

                            {/* Add pictures by Link */}
                        <h2 className='text-xl mt-2'>Photos</h2>
                        <div className='flex mt-2  gap-2'>
                        <input className='border py-2 px-1 border-gray-400  w-full flex-2 rounded-2xl' type='text' placeholder='Add using addistonal link' />
                        <button className='flex-1 bg-gray-100 px-3 rounded-md'>Add&nbsp;Pictures</button>

                        </div>
                        {/* Upload button */}
                        <div className='grid mt-2 grid-cols-3 md:grid-cols-6 lg:grid-cols-8'>
                            {addedPhotos.length > 0 && addedPhotos.map(photo =>{
                                <div>
                                        <img  className='rounded-2xl' src={photo}/>
                                </div>
                            })
                        }
                            <label className='border bg-transparent rounded-2xl p-4 flex justify-center'>
                                <input type='file' onChange={uploadPhotos} multiple className='hidden'/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>


                                Upload</label>
                           
                        </div>
                        {/* Description */}
                        <h2>Description</h2>
                        <textarea />

                       

                        {/* price */}
                        <h2 className='text-xl mt-2'>Price</h2>
                        <input type='number' placeholder='Price' className="border border-gray-400 py-1 px-2 
                            w-full rounded-sm"/>
                        {/* House Location */}
                        <h2 className='text-xl mt-2'>Location</h2>
                        <input type='text'value={location} onChange={e=>setLocation(e.target.value)} placeholder='Price' className="border border-gray-400 py-1 px-2 
                            w-full rounded-sm"/>
                        <div  className='flex justify-center '>
                        <button className="border mt-2 px-6 py-2  bg-red-200 text-white rounded-2xl">Upload </button>
                        </div>
                    </form>
                </div>
            )}

           
        </div>
    )



}

export default PagesIndex;