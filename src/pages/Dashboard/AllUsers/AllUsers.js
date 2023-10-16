import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

const AllUsers = () => {

    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users')
            const data = await res.json();
            return data;
        }
    })


    const handleMakeAdmin=id=>
    {
        fetch(`http://localhost:5000/users/admin/${id}`,{
            method:'PUT',
            headers:{
                authorization : `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0)
            {
                toast.success('Admin successfully done')
                refetch();
            }
            console.log(data)
        })
    }

    return (
        <div>
            <h2>users</h2>
            <div className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,i) => <tr key={user._id} user={user}>


                                <th>{i+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{ user?.role!=='admin' && <button onClick={()=>handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                                <td><button className='btn btn-xs btn-danger'>Delete</button></td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;