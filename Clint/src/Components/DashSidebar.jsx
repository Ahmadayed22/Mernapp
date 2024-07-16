
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Sidebar } from "flowbite-react";
import { HiTable, HiUser, } from "react-icons/hi";
import { Link } from "react-router-dom";
const DashSidebar = () => {
    const location = useLocation()
    const [tab, setTab] = useState("")
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFormUrl = urlParams.get("tab")
        // console.log(tabFormUrl)
        if (tabFormUrl) {
            setTab(tabFormUrl)
        }
    }, [location.search])



    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item href="#" active={tab === "profile"} icon={HiUser} label={"User"} labelColor="dark" as={"div"}>
                            Users
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item icon={HiTable} className="cursor-pointer">
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}



export default DashSidebar