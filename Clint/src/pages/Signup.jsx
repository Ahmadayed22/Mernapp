import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import Gauth from "../Components/Gauth";

const Signup = () => {
    const Navigate = useNavigate();
    const [isLoading, SetIsLoading] = useState(null)
    const [Form, SetForm] = useState({})
    const [Error, SetError] = useState(null)
    const HandelForm = (e) => {
        SetForm({ ...Form, [e.target.id]: e.target.value.trim() })

    }
    const HandelSubmit = async (e) => {
        e.preventDefault()
        try {
            SetIsLoading(true)
            SetError(null)
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Form),
                credentials: "include",
            })
            const data = await res.json()
            if (!res.ok) {
                SetIsLoading(false)
                SetError(data.error)

            }
            if (res.ok) {
                Navigate('/sign-in')
                SetError(null)
            }
        } catch (error) {
            SetError(error.message)
            SetIsLoading(false)
        }

    }
    // console.log(Form)
    return (
        <div className=" mt-20  min-h-screen   ">
            <div className="flex gap-5 flex-col md:flex-row md:items-center max-w-3xl mx-auto">
                <div className=" flex-1 ">
                    <Link
                        to='/'
                        className=' text-4xl  font-bold dark:text-white '
                    >
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            Ayed
                        </span>
                        Blog
                    </Link >
                    <p className="mt-5">This is a demo project. You can sign up with your email and password or with Google.</p>
                </div >
                <div className="flex-1 ">
                    <form className=" flex flex-col gap-4" onSubmit={HandelSubmit}>
                        <div>
                            <Label>Your Username</Label>
                            <TextInput type="text" placeholder="username" className="w-full" id="username" onChange={HandelForm} />
                        </div>
                        <div>
                            <Label>Your Email</Label>
                            <TextInput type="Email" placeholder="email" id="email" onChange={HandelForm} />
                        </div>
                        <div>
                            <Label>Your Password</Label>
                            <TextInput type="password" placeholder="password" id="password" onChange={HandelForm} />
                        </div>
                        <Button className="" gradientDuoTone="purpleToPink" outline type="Submit"
                        > {isLoading ? (
                            <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                            </>
                        ) : (
                            'Sign Up'
                        )}</Button>
                        <Gauth />
                    </form>
                    <div className="flex gap-5 my-2 text-sm">
                        <span className="">Have an account?</span>
                        <Link to="/sign-in" className="text-blue-600">Sign in</Link>

                    </div>
                    <div>
                        {Error && (
                            <Alert className='mt-5' color='failure'>
                                {Error}
                            </Alert>
                        )}
                    </div>
                </div>
            </div>



        </div >
    )
}

export default Signup