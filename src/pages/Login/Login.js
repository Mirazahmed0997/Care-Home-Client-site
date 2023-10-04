import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
    const [error,setError]=useState(null)
    const {signIn,user}= useContext(AuthContext)
    const navigate=useNavigate()
    const location=useLocation();
    const [success,setSuccess]=useState(false)
    const from= location.state?.from?.pathname || '/';
    const { register,formState:{errors}, handleSubmit } = useForm()
    const handleLogin=data=>
    {
        
       
            setError('')
            signIn(data.email,data.password)
            .then(result=>
                {
                    const user= result.user
                    setSuccess(true)
                    console.log(user)
            if(user.emailVerified)
                {
                    navigate(from,{replace:true})
                }
            else
                {
                    alert('Email is not verified')
                }
        
                })
                .catch(error=>
                    {
                        console.error(error)
                        setError(error.message)
    
                    })
    }
    return (
        <div className='flex justify-center items-center text-black p-6'>
           <div className='card w-96 bg-base-100 shadow-xl p-7'>
            <div className='text-center'>
            <h2 className='text-2xl'>Login</h2>
            </div>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type="text" 

                     {...register("email",{required:"Password is required"})} 
                     
                     className="input input-bordered w-full max-w-xs"/>
                           {errors.email && <p className='text-red-600' role="alert">{errors.email.message}</p>}

                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Password</span></label>
                    <input type="password"  

                    {...register("password",{
                        required:"Password is required",
                        minLength:{value:8,message: 'Password should atleast 8 characters'}
                    })} 
                    
                    className="input input-bordered w-full max-w-xs"/>
                          {errors.password && <p className='text-red-600' role="alert">{errors.password.message}</p>}

                    <label className="label"><span className="label-text">Forget Password?</span></label>
                </div>   
                <input className='btn btn-accent w-full' value='Login' type="submit" />
            </form>
            <p>Don't Have Account? <Link className='text-secondary' to='/signup'>Create new account</Link></p>
            <p className='text-error'>{error}</p>
            <div className="divider">OR</div>
                <button className='btn btn-outline' >CONTINUE WITH GOOGLE</button>
           </div>
        </div>
    );
};

export default Login;