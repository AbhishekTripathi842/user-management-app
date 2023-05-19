import React from 'react'
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import Loader from '@/Components/Loader';
import Form from 'react-bootstrap/Form';
// import Withauth from '../../../lib/front-end/withAuth';
import { validateEmail, convertError } from "../../../utils";
import Footer from '@/Components/Footer';


export interface IObjectKeys {
    [key: string]: any;
}

const Edituser = () => {

    const { push } = useRouter();

    interface LoginStateType extends IObjectKeys {
        firstName: string;
        lastName: string;
        email: string;
        Role: string;
        Address: string;
    }

    const [state, setState] = useState<LoginStateType>({
        firstName: '',
        lastName: '',
        email: '',
        Role: '',
        Address: '',
    });


    const [addUserShowModal, setAddUserShowModal] = useState(false)
    const [isLoading, setLoading] = useState(false)

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
                setState(
                    {
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        Role: data.role,
                        Address: data.address,
                    }
                )
                setLoading(false)
            })
    }, [id])




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let data = {
            "first_name": state.firstName,
            "last_name": state.lastName,
            "address": state.Address,
            "role": state.Role,
            "email": state.email
        }
        EditUserApi(data)


    }

    const EditUserApi = async (data: any) => {
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/user/edit/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    setLoading(false)
                    push('/users');
                }
            })
    }



    return (
        <>
            <Navbar openAddModel={openAddModel} />
            {
                !isLoading ?

                    <div className='container mt-3' style={{ backgroundColor: '#e0e0d4', padding: '40px' }}>
                        <form>
                            <div className="row mb-2">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example1">First name</label>
                                        <input name='firstName' type="text" id="form6Example1" className="form-control" value={state.firstName} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Last name</label>
                                        <input name='lastName' type="text" id="form6Example2" className="form-control" value={state.lastName} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example4">Email</label>
                                        <input style={{ backgroundColor: 'white' }} name='email' type="text" id="form6Example4" className="form-control" value={state.email} disabled onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example4">Role</label>

                                        <div>
                                            <div className="form-check form-check-inline ">
                                                <input className="form-check-input" type="radio" name="Role" id="exampleRadios1" value="ADMIN" onChange={handleChange} checked={state.Role === 'ADMIN' ? true : false} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">ADMIN</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="Role" id="exampleRadios2" value="USER" onChange={handleChange} checked={state.Role === 'USER' ? true : false} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox2">USER</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="form6Example4">Email</label>
                                <input style={{ backgroundColor: 'white' }} name='email' type="text" id="form6Example4" className="form-control" value={state.email} disabled onChange={handleChange} />
                            </div> */}

                            {/* <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="form6Example4">Role</label>

                                <div>
                                    <div className="form-check form-check-inline ">
                                        <input className="form-check-input" type="radio" name="Role" id="exampleRadios1" value="ADMIN" onChange={handleChange} checked={state.Role === 'ADMIN' ? true : false} />
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">ADMIN</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="Role" id="exampleRadios2" value="USER" onChange={handleChange} checked={state.Role === 'USER' ? true : false} />
                                        <label className="form-check-label" htmlFor="inlineCheckbox2">USER</label>
                                    </div>
                                </div>

                            </div> */}

                            {/* <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="form6Example7">Address</label>
                                <input name='Address' type="text" id="form6Example4" className="form-control" value={state.Address} onChange={handleChange} />
                            </div> */}

                            <div className="form-group mb-2">
                                <label htmlFor="exampleFormControlTextarea1 mb-2">Address</label>
                                <textarea name='Address' value={state.Address} onChange={(e) => handleChange(e)} className="form-control" id="exampleFormControlTextarea1" rows={4}></textarea>
                            </div>

                            <button type="submit" className="btn btn-dark btn-block mb-2" onClick={handleSubmit}>Update User</button>
                        </form>
                    </div>

                    : <Loader />
            }
            <Footer />
        </>
    )
}

// export default Withauth(Edituser);
export default Edituser;
