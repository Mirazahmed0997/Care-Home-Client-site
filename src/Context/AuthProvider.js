import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import app from '../Firebase/firebase.config'

export const AuthContext=createContext();
const auth=getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>
    {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn=(email,password)=>
    {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const updateUser=(userInfo)=>
    {
        return updateProfile(user,userInfo)
    }

    const logOut=()=>
    {   setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>
    {
       const unSubscribe= onAuthStateChanged(auth,CurrentUser =>
            {
                console.log(CurrentUser)
                setUser(CurrentUser)
                setLoading(false)
            })
            return ()=> unSubscribe();
       
    },[])

   
    const authInfo={
       createUser,
       signIn,
       logOut,
       loading,
       user,
       updateUser
       
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;