import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store/auth';
import Gauth from "../Components/Gauth";

const SignIn = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [inputForm, setInputForm] = useState({});

    const handleForm = (e) => {
        setInputForm({ ...inputForm, [e.target.id]: e.target.value });
    };
    // console.log(useSelector((state) => state.auth))

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(authActions.SignInStart());
            const response = await fetch("http://localhost:3000/api/auth/signin", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputForm),
            });
            const data = await response.json();
            if (!response.ok) {
                dispatch(authActions.SignInFailure(data.error));
            } else {
                dispatch(authActions.SignInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            dispatch(authActions.SignInFailure(error.message));
        }
    };

    return (
        <div className="mt-20 min-h-screen">
            <div className="flex gap-5 flex-col md:flex-row md:items-center max-w-3xl mx-auto">
                <div className="flex-1">
                    <Link to='/' className='text-4xl font-bold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            Ayed
                        </span>
                        Blog
                    </Link>
                    <p className="mt-5">This is a demo project. You can sign up with your email and password or with Google.</p>
                </div>
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <Label>Your Email</Label>
                            <TextInput type="email" placeholder="email" id="email" onChange={handleForm} />
                        </div>
                        <div>
                            <Label>Your Password</Label>
                            <TextInput type="password" placeholder="password" id="password" onChange={handleForm} />
                        </div>
                        <Button className="" gradientDuoTone="purpleToPink" outline type="submit">
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                        <Gauth />
                    </form>
                    <div className="flex gap-5 my-2 text-sm">
                        <span>Have an account?</span>
                        <Link to="/sign-up" className="text-blue-600">Sign Up</Link>
                    </div>
                    <div>
                        {error && (
                            <Alert className='mt-5' color='failure'>
                                {error}
                            </Alert>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
