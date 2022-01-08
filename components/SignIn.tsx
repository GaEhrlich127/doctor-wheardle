import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebase';

const SignIn = () => {
    const router = useRouter();


    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm({mode:'onChange'});
    const { errors } = formState;

    const onSubmit = ({ email, password }) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

    return (
        <div className='p-4'>
          <div className='container'>
            <div className="card">
                <h4 className="card-header">Login</h4>
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
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        <a href="/signup" className="btn btn-link">Register</a>
                    </form>
                </div>
            </div>
          </div>
        </div>
    );
}

export default SignIn;