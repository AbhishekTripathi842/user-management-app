import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { validateEmail, convertError } from "../utils";


export interface IObjectKeys {
  [key: string]: any;
}

export interface LoginStateType extends IObjectKeys {
  confirmPassword: string;
  password: string;
}

export default function Resetpassword() {
  const router = useRouter();
  const [state, setState] = useState<LoginStateType>({
    confirmPassword: "",
    password: "",
  });
  const token: any = router.query.token;


  const validate = () => {

    let error = false;

    if (state.password.length === 0) {
      setState(prevState => ({ ...prevState, passwordError: convertError('password.required') }));
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
    if (validate()) {
      loginApi(state.password)
    }
  }

  const loginApi = async (data: any) => {
    fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "string",
        "token": token
      },
      body: data,
    })
      .then(res => res.json())
      .then((data) => {
        router.push('/');
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

                    <h2 className="fw-bold mb-2 text-uppercase">Reset Password</h2>
                    <p className="text-white-50 mb-5">Please enter your new password here!</p>


                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                      <input name="password" type="password" id="typePasswordX" className="form-control form-control-lg"
                        onChange={handleChange}
                        onFocus={resetErrorMessage}
                        onBlur={checkValidation}
                      />
                      {state && state.passwordError !== '' ? (
                        <p className="mt-1 ms-2 text-danger">{state.passwordError}</p>
                      ) : null}
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typePasswordX">Confrim Password</label>
                      <input name="confirmPassword" type="password" id="typePasswordX" className="form-control form-control-lg"
                        onChange={handleChange}
                        onFocus={resetErrorMessage}
                        onBlur={checkValidation}
                      />
                      {state && state.confirmPasswordError !== '' ? (
                        <p className="mt-1 ms-2 text-danger">{state.confirmPasswordError}</p>
                      ) : null}
                    </div>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Update</button>
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
