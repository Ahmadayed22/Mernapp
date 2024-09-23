
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Sidebar } from "flowbite-react";
import { HiDocumentText, HiTable, HiUser, } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HandelSignOut } from "../utlis/authUtlis";
const DashSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [tab, setTab] = useState("")
    const { userInfo } = useSelector((state) => state.auth);
    // console.log(userInfo.IsAdmin)
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFormUrl = urlParams.get("tab")
        // console.log(tabFormUrl)
        if (tabFormUrl) {
            setTab(tabFormUrl)
        }
    }, [location.search])

    const SingOut = () => {
        HandelSignOut(dispatch, navigate)
    }

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item href="#" active={tab === "profile"} icon={HiUser} label={userInfo.IsAdmin ? "Admin" : "User"} labelColor="dark" as={"div"}>
                            Users
                        </Sidebar.Item>
                    </Link>
                    {userInfo.IsAdmin && (

                        <Link to={'/dashboard?tab=posts'}>
                            <Sidebar.Item
                                active={tab === 'posts'}
                                icon={HiDocumentText}
                                as='div'>
                                posts
                            </Sidebar.Item>

                        </Link>
                    )}


                    <Sidebar.Item onClick={SingOut} icon={HiTable} className="cursor-pointer">
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}



export default DashSidebar