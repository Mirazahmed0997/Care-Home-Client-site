import { useEffect, useState } from "react"

const useAdmin=email=>
{
    const [isAdmin, setIsAdmin]=useState(false)
    const [isAdminLoading, setIsAdminLoading]=useState(true)
    useEffect(()=>
    {
        if(email)
        {
            fetch(`https://care-home-server-site-qhfxnw12d-mirazahmed0997.vercel.app/users/admin/${email}`)
            .then(res=>res.json())
            .then(data=>
                {
                    setIsAdmin(data.isAdmin)
                    setIsAdminLoading(false)
                })
        }
    },[email])
    return [isAdmin,isAdminLoading]
}

export default useAdmin;