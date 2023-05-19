import React from 'react'
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Loader from '@/Components/Loader';
import Form from 'react-bootstrap/Form';
import { validateEmail, convertError } from "../../utils";
import Footer from '@/Components/Footer';

// import Withauth from '../../lib/front-end/withAuth';


export interface IObjectKeys {
    [key: string]: any;
}

const Adduser = () => {

    const { push } = useRouter();

    interface LoginStateType extends IObjectKeys {
        firstName: string;
        firstNameError: string;
        lastName: string;
        lastNameError: string;
        email: string;
        emailError: string;
        address: string;
        addressError: string;
        password: string;
        passwordError: string;
        Role: string;
    }

    const [state, setState] = useState<LoginStateType>({
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        email: '',
        emailError: '',
        address: '',
        addressError: '',
        password: '',
        passwordError: '',
        Role: ''
    });


    const [addUserShowModal, setAddUserShowModal] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const openAddModel = () => {
        setAddUserShowModal(!addUserShowModal)
    }



    const validate = () => {
        let error = false;
        if (state.email.length === 0) {
            setState(prevState => ({ ...prevState, emailError: "Email is required" }));
            setState(prevState => ({ ...prevState, emailError: convertError('email.required') }));
            error = true;
        } else if (!validateEmail(state.email)) {
            setState(prevState => ({ ...prevState, emailError: convertError('email.invalid') }));
            error = true;
        }
        if (state.password.length === 0) {
            setState(prevState => ({ ...prevState, passwordError: convertError('password.required') }));
            error = true;
        }



        if (state.firstName.length === 0) {
            setState(prevState => ({ ...prevState, firstNameError: convertError('firstName.required') }));
            error = true;
        }
        if (state.lastName.length === 0) {
            setState(prevState => ({ ...prevState, lastNameError: convertError('lastName.required') }));
            error = true;
        }
        if (state.address.length === 0) {
            setState(prevState => ({ ...prevState, addressError: convertError('address.required') }));
            error = true;
        }

        return !error;
    }


    const checkValidation = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value.length === 0) {
            setState(prevState => ({ ...prevState, [`${name}Error`]: convertError(`${name}.required`) }));
        } else if (name === "email" && !validateEmail(value)) {
            setState(prevState => ({ ...prevState, [`${name}Error`]: convertError(`${name}.invalid`) }))
        }
    }

    const resetErrorMessage = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setState(prevState => ({ ...prevState, [`${name}Error`]: "" }))
    }




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()

        let data = {
            "first_name": state.firstName,
            "last_name": state.lastName,
            "address": state.address,
            "role": state.Role,
            "email": state.email,
            "password": state.password
        }
        if (validate()) {
            AddUserApi(data)
        }
    }


    const AddUserApi = async (data: any) => {



        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/user/add`, {
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

                    <div className='container mt-2' style={{ backgroundColor: '#e0e0d4', padding: '40px' }}>
                        <form>
                            <div className="row mb-1">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example1">First name</label>
                                        <input name='firstName' type="text" id="form6Example1" className="form-control"
                                            value={state.firstName} onChange={handleChange}
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                        />
                                        {state && state.firstNameError !== '' ? (
                                            <p className="mt-1 ms-2 text-danger">{state.firstNameError}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Last name</label>
                                        <input name='lastName' type="text" id="form6Example2" className="form-control"
                                            value={state.lastName} onChange={handleChange}
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                        />
                                        {state && state.lastNameError !== '' ? (
                                            <p className="mt-1 ms-2 text-danger">{state.lastNameError}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col">
                                    <div className="form-outline">

                                        <label className="form-label" htmlFor="form6Example1">Email</label>
                                        <input style={{ backgroundColor: 'white' }} name='email' type="text" id="form6Example1" className="form-control"
                                            value={state.email} onChange={handleChange}
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                        />
                                        {state && state.emailError !== '' ? (
                                            <p className="mt-1 ms-2 text-danger">{state.emailError}</p>
                                        ) : null}


                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="form6Example2">Role</label>

                                        <div>
                                            <div className="form-check form-check-inline ">
                                                <input className="form-check-input" type="radio" name="Role" id="exampleRadios1"
                                                    value="ADMIN" onChange={handleChange} checked={state.Role === 'ADMIN' ? true : false} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">ADMIN</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="Role" id="exampleRadios2"
                                                    value="USER" onChange={handleChange} checked={state.Role === 'USER' ? true : false} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox2">USER</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="form-outline mb-1">
                                <label className="form-label" htmlFor="form6Example4">Email</label>
                                <input style={{ backgroundColor: 'white' }} name='email' type="text" id="form6Example4" className="form-control"
                                    value={state.email} onChange={handleChange}
                                    onFocus={resetErrorMessage}
                                    onBlur={checkValidation}
                                />
                                {state && state.emailError !== '' ? (
                                    <p className="mt-1 ms-2 text-danger">{state.emailError}</p>
                                ) : null}
                            </div>

                            <div className="form-outline mb-1">
                                <label className="form-label" htmlFor="form6Example4">Role</label>

                                <div>
                                    <div className="form-check form-check-inline ">
                                        <input className="form-check-input" type="radio" name="Role" id="exampleRadios1"
                                            value="ADMIN" onChange={handleChange} checked={state.Role === 'ADMIN' ? true : false} />
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">ADMIN</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="Role" id="exampleRadios2"
                                            value="USER" onChange={handleChange} checked={state.Role === 'USER' ? true : false} />
                                        <label className="form-check-label" htmlFor="inlineCheckbox2">USER</label>
                                    </div>
                                </div>

                            </div> */}

                            <div className="form-outline mb-1">
                                <label className="form-label" htmlFor="form6Example7">Address</label>
                                <input name='address' type="text" id="form6Example4" className="form-control"
                                    value={state.address} onChange={handleChange}
                                    onFocus={resetErrorMessage}
                                    onBlur={checkValidation}
                                />
                                {state && state.addressError !== '' ? (
                                    <p className="mt-1 ms-2 text-danger">{state.addressError}</p>
                                ) : null}
                            </div>

                            {/* <div className="form-group mb-2">
                                <label htmlFor="exampleFormControlTextarea1 mb-2">Address</label>
                                <textarea name='Address'  onFocus={resetErrorMessage} onBlur={checkValidation} value={state.Address} onChange={(e) => handleChange(e)} className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                                {state && state.addressError !== '' ? (
                                    <p className="mt-1 ms-2 text-danger">{state.addressError}</p>
                                ) : null}
                            </div> */}

                            <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="form6Example7">Password</label>
                                <input name='password' type="password" id="form6Example4" className="form-control"
                                    value={state.password} onChange={handleChange}
                                    onFocus={resetErrorMessage}
                                    onBlur={checkValidation}
                                />
                                {state && state.passwordError !== '' ? (
                                    <p className="mt-1 ms-2 text-danger">{state.passwordError}</p>
                                ) : null}
                            </div>

                            <button type="submit" className="btn btn-dark btn-block mb-2" onClick={handleSubmit}>Add User</button>
                        </form>
                    </div>

                    : <Loader />
            }
            <Footer />
        </>
    )
}

// export default Withauth(Adduser);
export default Adduser;
