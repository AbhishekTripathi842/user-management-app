import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { validateEmail, convertError } from "../utils";



export interface IObjectKeys {
    [key: string]: any;
}

export default function Forogtpassword() {

    interface LoginStateType extends IObjectKeys {
        email: string;
        emailError: string;
    }

    const [state, setState] = useState<LoginStateType>({
        email: "",
        emailError : ""
    });

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
        return !error;
      }
    

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let data = {
            "email": state.email
          }
        if(validate()){

            ForgotApi(data)
        }

    }


    const ForgotApi = async (data: any) => {
        fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then((data) => {
                return data
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }))
    }


    return (
        <>
            <section className="vh-50 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Forgot-Password</h2>
                                        <p className="text-white-50 mb-5">Please enter your Email!</p>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            <input name="email" type="email" id="typeEmailX" className="form-control form-control-lg"
                                                onChange={handleChange}
                                                onFocus={resetErrorMessage}
                                                onBlur={checkValidation}
                                            />
                                            {state && state.emailError !== '' ? (
                                                <p className="mt-1 ms-2 text-danger">{state.emailError}</p>
                                            ) : null}
                                        </div>

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Forgot</button>
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
