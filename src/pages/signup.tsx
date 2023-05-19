import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { validateEmail, convertError } from "../utils";

export interface IObjectKeys {
    [key: string]: any;
}

export default function Signup() {

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
        confirmPassword: string;
        confirmPasswordError: string

    }

    const [state, setState] = useState<LoginStateType>({
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        email: '',
        emailError: "",
        address: '',
        addressError: '',
        password: '',
        passwordError: "",
        confirmPassword: '',
        confirmPasswordError: ''

    });

    const [isLoading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }))
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
        if (state.confirmPassword.length === 0) {
            setState(prevState => ({ ...prevState, confirmPasswordError: convertError('confirmPassword.required') }));
            error = true;
        }

        if (
            state.password.length &&
            state.confirmPassword.length &&
            state.password !== state.confirmPassword
          ) {
            setState((prevState) => ({
              ...prevState,
              confirmPasswordError: convertError('confirmPassword.not_matched'),
            }));
            error = true;
          }

        return !error;
    }


    const checkValidation = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (value.length === 0) {
            setState(prevState => ({...prevState, [`${name}Error`]: convertError(`${name}.required`)}));
        } else if (name === "email" && !validateEmail(value)) {
            setState(prevState => ({...prevState, [`${name}Error`]: convertError(`${name}.invalid`)}))
        }
      }
      
      const resetErrorMessage = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name} = e.target;
        setState(prevState => ({...prevState, [`${name}Error`]: ""}))
      }


    const handleSubmit = (event: any) => {
        event.preventDefault();
        let data = {
            "first_name": state.firstName,
            "last_name": state.lastName,
            "address": state.address,
            "email": state.email,
            "password": state.password
        }
        if (validate()) {
            SignUpApi(data)
        }

    }

    const SignUpApi = async (data: any) => {
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    push('/');
                }
            })
    }


    return (
        <>
            <section className="vh-50 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-2 mt-md-2 pb-2">

                                        <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                        <p className="text-white-50 mb-5">Please enter your signup details!</p>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typeEmailX">Firstname</label>
                                            <input name="firstName" className="form-control form-control-lg" onChange={handleChange} 
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                            />
                                            {state && state.firstNameError !== '' ? (
                                                <p className="mt-1 ms-2 text-danger">{state.firstNameError}</p>
                                            ) : null}
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Lastname</label>
                                            <input name="lastName" className="form-control form-control-lg" onChange={handleChange} 
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                            />
                                            {state && state.lastNameError !== '' ? (
                                                <p className="mt-1 ms-2 text-danger">{state.lastNameError}</p>
                                            ) : null}
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            <input name="email" type="email" className="form-control form-control-lg" onChange={handleChange}
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                             />
                                            {state && state.emailError !== '' ? (
                                                <p className="mt-1 ms-2 text-danger">{state.emailError}</p>
                                            ) : null}
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Address</label>
                                            <input name="address" className="form-control form-control-lg" onChange={handleChange} 
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                            />
                                            {state && state.addressError !== '' ? (
                                                <p className="mt-1 ms-2 text-danger">{state.addressError}</p>
                                            ) : null}
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typeEmailX">Password</label>
                                            <input name="password" type="email" className="form-control form-control-lg" onChange={handleChange} 
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                            />
                                            {state && state.passwordError !== '' ? (
                                                <p className="mt-1 ms-2 text-danger">{state.passwordError}</p>
                                            ) : null}
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Confirm Passowrd</label>
                                            <input name="confirmPassword" className="form-control form-control-lg" onChange={handleChange} 
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                            />
                                            {state && state.confirmPasswordError !== '' ? (
                                                <p className="mt-1 ms-2 text-danger">{state.confirmPasswordError}</p>
                                            ) : null}
                                        </div>

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit"
                                        onClick={handleSubmit}>{isLoading ? 'Loading...' : 'Sign-Up'}</button>

                                    </div>

                                    <div>
                                        <p className="mb-0">Back to login? <Link href="/" className="text-white-50 fw-bold">Sign-In</Link>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
