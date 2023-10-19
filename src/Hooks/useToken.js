import { useEffect, useState } from "react";

const useToken=email=>
{
    const [token,setToken]=useState('');
    useEffect(()=>
    {
      if(email)
      {
        fetch(`https://care-home-server-site-qhfxnw12d-mirazahmed0997.vercel.app/jwt?email=${email}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.accessToken)
            {
                localStorage.setItem('accessToken',data.accessToken)
                setToken(data.accessToken)
            }
        })
      }
    },[email]);
    return[token]
}

export default useToken;