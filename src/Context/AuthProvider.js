import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../Firebase/firebase.config'

export const AuthContext=createContext();
const auth=getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>
    {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const GoogleSignIn=(provider)=>
    {
        setLoading(true)
        return signInWithPopup(auth,provider)
    }
    const signIn=(email,password)=>
    {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const updateUser=(userInfo)=>
    {
        // setLoading(true)
        return updateProfile(auth.currentUser,userInfo)
    }

    const logOut=()=>
    {   setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>
    {
       const unSubscribe= onAuthStateChanged(auth,CurrentUser =>
            {
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
       updateUser,
       GoogleSignIn
       
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;