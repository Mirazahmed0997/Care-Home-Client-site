import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { GoogleAuthProvider, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../Firebase/firebase.config';
import useToken from '../../Hooks/useToken';

const auth=getAuth(app)


const Login = () => {
    const [error,setError]=useState(null)
    // const [userEmail,setUserEmail]=useState('')
    const {signIn,user,GoogleSignIn}= useContext(AuthContext)
    const googleProvider =new GoogleAuthProvider()
    const navigate=useNavigate()
    const location=useLocation();
    const [loginUserEmail,setLoginUserEmail]=useState('')
    const [token]=useToken(loginUserEmail)
    const [success,setSuccess]=useState(false)
    const from= location.state?.from?.pathname || '/';
    const { register,formState:{errors}, handleSubmit } = useForm()


    if(token){
        navigate(from,{replace:true})
    }


    const handleGoogleSignIn=()=>
    {
      GoogleSignIn(googleProvider)
      .then(result=>
        {
            const user=result.user
            navigate(from,{replace:true})
  
  
        })
    
        .catch(error=>console.error(error))
    }


    const handleLogin=data=>
    {
        
       
            setError('')
            signIn(data.email,data.password)
            .then(result=>
                {
                    const user= result.user
                    setLoginUserEmail(data.email);
                    // setSuccess(true)
            // if(user.emailVerified && token)
            //     {
            //         navigate(from,{replace:true})
            //     }
            // else
            //     {
            //         alert('Email is not verified')
            //     }
        
                })
                .catch(error=>
                    {
                        console.error(error)
                        setError(error.message)
    
                    })
    }

    const handleBlurEmail=data=>
    {
        const email=data.email
        console.log(email)
    }

    const handleForgetPass=(data)=>
    {
        sendPasswordResetEmail(auth,data.email)
        .then(()=>
        {
            alert('Password Reset link sent, Check your email')
        })
        .catch(err=>{
            console.error(err)
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
                    <input name='email' onBlur={handleBlurEmail} type="email" 

                     {...register("email",{required:"Email is required"})} 
                     
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

                    <label className="label"><Link onClick={handleForgetPass} className="label-text">Forget Password?</Link></label>
                </div>   
                <input className='btn btn-accent w-full' value='Login' type="submit" />
            </form>
            <p>Don't Have Account? <Link className='text-secondary' to='/signup'>Create new account</Link></p>
            <p className='text-error'>{error}</p>
            <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline' >CONTINUE WITH GOOGLE</button>
           </div>
        </div>
    );
};

export default Login;