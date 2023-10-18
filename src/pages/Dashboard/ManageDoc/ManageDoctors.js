import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';

const ManageDoctors = () => {
    const [deleteDoctor,setDeleteDoctor]=useState(null)

    const closeModal=()=>
    {
        setDeleteDoctor(null)
    }

  

    const { data: doctors, isLoading,refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }

            catch (error) {

            }
        }
    })

    const handleDltDoctor=doctor=>
    {
        fetch(`http://localhost:5000/doctors/${doctor._id}`,{
            method:'DELETE',
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.deletedCount>0)
            {
                refetch();
                toast.success('Successfully Deleted')
            }
        })
    }

    if(isLoading)
    {
       return <Loading></Loading>
    }


    return (
        <div className=''>
            <div className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id} doctor={doctor}>


                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-16 rounded-full">
                                            <img src={doctor.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.speciality}</td>
                                {
                                <td>
                                    <label onClick={()=>setDeleteDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-xs btn-danger">Delete</label>
                                </td> 
                                }

                            </tr>)
                        }
                    </tbody>
                </table>

            </div>
            {
                deleteDoctor && <ConfirmationModal 
                title={`Are you sure?`}
                closeModal={closeModal}
                deleteConfirm={handleDltDoctor}
                modalData={deleteDoctor}
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;