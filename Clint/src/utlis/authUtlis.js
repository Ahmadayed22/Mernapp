  import { authActions } from '../store/auth';
// import { useDispatch } from 'react-redux';

export const HandelSignOut = async (dispatch,navigate) => {
        dispatch(authActions.SignOutStart())
        try {
            const res = await fetch("http://localhost:3000/api/user/signout", {
                method: "POST",
            })
            const data = await res.json()
            if (!res.ok) {
                dispatch(authActions.SignOutFailure(data.error))
                console.log(data.error)
            }
            else {
                dispatch(authActions.SignOutSuccess())
                navigate("/sign-in")
            }
        } catch (error) {
            dispatch(authActions.SignOutFailure(error))
            console.log(error)
        }
    }