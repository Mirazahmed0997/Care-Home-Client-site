import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const imgHostKey=process.env.REACT_APP_imgbb_key;
    const navigate= useNavigate()

    const {data:specialities,isLoading}=useQuery({
        queryKey:['speciality'],
        queryFn: async()=>{
           const res= await fetch('http://localhost:5000/appointmentSpeciality')
           const data=await res.json();
           return data;
        }
    })

    const handleAddDoctor = data => {
        const image=data.img[0]
        const formData= new FormData()
        formData.append('image',image)
        const url=`https://api.imgbb.com/1/upload?&key=${imgHostKey}`
        fetch(url,{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(imgData=>{
            if(imgData.success){
                // console.log(imgData.data.url)
                const doctor={
                    name: data.name,
                    email:data.email,
                    speciality:data.speciality,
                    image:imgData.data.url
                }

                //send doctors info to DB
                fetch('http://localhost:5000/doctors',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json',
                        authorization:`bearer ${localStorage.getItem('accessToken')}`
                    },
                    body:JSON.stringify(doctor)
                })
                .then(res=>res.json())
                .then(result=>{
                    console.log(result);
                    toast.success(`Succesfully added ${data.name}`)
                    navigate('/dashboard/managedoctors')
                })

            }
        })
    }

    if(isLoading)
    {
       return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h2 className='text-2xl p-2 mb-2'>Add a Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)} >
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text text-black">Name</span></label>
                    <input type="text"
                        {...register("name", { required: "Name is required" })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text text-black">Email</span></label>
                    <input type="email"
                        {...register("email", { required: "Email is required" })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text text-black">Speciality</span></label>
                    <select 
                    {...register('speciality')}
                    className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select</option>
                        {
                            specialities.map(speciality=><option
                            
                                key={speciality._id}
                                value={speciality.name}

                            >{speciality.name}</option>)
                        }
                       
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text text-black">Photo</span></label>
                    <input type="file"
                        {...register("img", { required: "Photo is required" })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>

                <input className='btn btn-accent w-full mt-6' value='Add Doctor' type="submit" />
                {/* {
                    success ? <small className='text-success'>User successfully created</small> :
                        <small className='text-error'>{SignUpError && <p>{SignUpError}</p>}</small>
                } */}
            </form>
        </div>
    );
};

export default AddDoctor;