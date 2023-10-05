import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import app from '../../Firebase/firebase.config';
import toast from 'react-hot-toast';

const auth=getAuth(app)

const SignUp = () => {
    const {createUser,updateUser}=useContext(AuthContext)
    const[SignUpError,setSignUpError]=useState(null)
    const [success,setSuccess]=useState(false);

    const {register,formState:{errors}, handleSubmit}=useForm()

    const handleSignUp=data=>
    {
        setSignUpError('')
        if(data.password!==data.confirmPassword)
        {
            setSignUpError("Password didn't match")
            return;
        }
        console.log(data)


        createUser(data.email,data.password)
        .then(result=>{
            const user=result.user;
            toast('User created successfully')
            const userInfo={
                displayName:data.name
            }
            updateUser(userInfo)
            .then(()=>{})
            .catch(err=>console.log(err))
            varifyEmail()
            setSuccess(true)
            return;
        })
        .catch(error=>{
            setSignUpError(error.message)
            // console.log(err)
        })

        
        const varifyEmail=()=>
            {
                
              sendEmailVerification(auth.currentUser)
             .then(result=>
                     {
                          alert('Please varify your email')
                     })
            }  
    }

    return (
        <div className='flex justify-center items-center text-black p-6'>
        <div className='card w-96 bg-base-100 shadow-xl p-7'>
         <div className='text-center'>
         <h2 className='text-2xl'>Sign Up</h2>
         </div>
         <form onSubmit={handleSubmit(handleSignUp)} >
             <div className="form-control w-full max-w-xs">
                 <label className="label"><span className="label-text">Name</span></label>
                 <input type="text" 
                 {...register("name", {required:"Name is required"})}   
                  className="input input-bordered w-full max-w-xs"/>
                 {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
             </div>
             <div className="form-control w-full max-w-xs">
                 <label className="label"><span className="label-text">Email</span></label>
                 <input type="email" 
                 {...register("email", {required:"Email is required"})}  
                  className="input input-bordered w-full max-w-xs"/>
                  {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
             </div>

             <div className="form-control w-full max-w-xs">
                 <label className="label"><span className="label-text">Password</span></label>
                 <input type="password"
                 {...register("password",
                  {required:"Password is required",
                  minLength:{value:6,message:"Password should atleast 6 characters"},
                  pattern:{value:/^(?=.*[A-Z])(?=.*[!@#$&*/])/,message:'Ensure string has one uppercase letters and one special'},
                })}      
                 className="input input-bordered w-full max-w-xs"/>
                 {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
             </div> 
             <div className="form-control w-full max-w-xs">
                 <label className="label"><span className="label-text">Confirm Password</span></label>
                 <input type="password"
                 {...register("confirmPassword", {required:"Confirm Your Password"})}      
                 className="input input-bordered w-full max-w-xs"/>
                 {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
             </div>     
             <input className='btn btn-accent w-full mt-6' value='Sign up' type="submit" />
             {
            success?<small className='text-success'>User successfully created</small>:
            <small className='text-error'>{SignUpError && <p>{SignUpError}</p>}</small> 
          }  
         </form>
         <p className='mt-2'>Already Have an Account? <Link className='text-secondary ' to='/login'>Login</Link></p>
         <div className="divider">OR</div>
             <button className='btn btn-outline' >CONTINUE WITH GOOGLE</button>
        </div>
     </div>
    );
};

export default SignUp;