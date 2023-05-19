import React from 'react'
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Loader from '@/Components/Loader';
import moment from 'moment';
// import Withauth from '../../lib/front-end/withAuth';

import Image from 'next/image'
import Footer from '@/Components/Footer';
// import { useRouter } from 'next/navigation';

const Userinfomation = () => {
    const [addUserShowModal, setAddUserShowModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [users, setUsers] = useState<any>([])

    const { push } = useRouter();

    const openAddModel = () => {
        setAddUserShowModal(!addUserShowModal)
    }

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/user/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
                setLoading(false)
            })
    }, [id])

    // useEffect(() => {
    //     fetchData()
    // }, [])


    const handleDelete = async () => {
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/user/delete/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        })
            .then(res => res.text())
            .then((res) => {
                setLoading(false)
                push('/users')
            })
    }
    const handleEdit = () => {
        push(`edit/${id}`)
    }


    return (
        <>
            <Navbar openAddModel={openAddModel} />
            {
                !isLoading ?
                    <div>
                        <div className="page-content page-container" id="page-content">
                            <div className="padding">
                                <div className="row container d-flex justify-content-center">
                                    <div className="col-xl-6 col-md-12" style={{ width: '95%' }}>
                                        <div className="card user-card-full">
                                            <div className="row m-l-0 m-r-0">
                                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                                    <div className="card-block text-center text-white">
                                                        <div style={{ marginTop: '6rem' }}>
                                                            <h6 className="f-w-600">{users?.first_name + ' ' + users?.last_name}</h6>
                                                            <p>{users?.role}</p>
                                                        </div>

                                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="card-block">

                                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information
                                                            <div style={{ textAlign: 'end', marginTop: '-19px' }}>
                                                                <i data-toggle="tooltip" data-placement="top" title="Delete user" className="bi bi-trash me-1 cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => handleDelete()}></i>
                                                                <i data-toggle="tooltip" data-placement="top" title="Edit user" className="bi bi-pencil-square me-1" style={{ cursor: 'pointer' }} onClick={() => handleEdit()}></i>
                                                            </div>
                                                        </h6>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Email</p>
                                                                <h6 className="text-muted f-w-400">{users?.email}</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Address</p>
                                                                <h6 className="text-muted f-w-400">{users?.address}</h6>
                                                            </div>
                                                        </div>
                                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Others Info</h6>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">user id</p>
                                                                <h6 className="text-muted f-w-400">{users?.id}</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Created at</p>
                                                                <h6 className="text-muted f-w-400">{moment(users?.created_at).format('MMMM Do YYYY, h:mm a')}</h6>
                                                            </div>
                                                        </div>
                                                        <ul className="social-link list-unstyled m-t-40 m-b-10">
                                                            <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                                            <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                                            <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Loader />
            }
            <Footer />
        </>
    )
}

// export default Withauth(Userinfomation);
export default Userinfomation;
