import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../lib/firebase'
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";


const SignUp = () => {
    const router = useRouter();


    // get functions to build form with useForm() hook
    const [captchaValidated, setCaptchaValidated] = useState(false);
    const { register, handleSubmit, formState } = useForm({mode:'onChange'});
    const { errors } = formState;

    const onSubmit = (user) => {
      if(captchaValidated){
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                alert("Account created and signed in!")
                // ...
            })
            .catch((error) => {
                alert("Could not create account at this time, sorry.")
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
      } else{
          alert('Please validate the captcha');
      }
    }

    return (
        <div className='p-4'>
          <div className='container'>
            <div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address"
                                }
                            })} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group mb-2">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password', {
                                required: 'Password is required'
                            })} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <ReCAPTCHA sitekey='6Lfz9gweAAAAAOCOc7489KbdsltxZDCDmxPbEdd7' onChange={()=>{setCaptchaValidated(!captchaValidated)}}/>
                        <button disabled={formState.isSubmitting} className="btn btn-primary mt-2">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        <a href="/signin" className="btn btn-link">Cancel</a>
                    </form>
                </div>
            </div>
          </div>
        </div>
    );
}

export default SignUp;