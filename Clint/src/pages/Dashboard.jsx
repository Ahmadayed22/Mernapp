import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../Components/DashSidebar"
import DashProfile from "../Components/DashProfile"
import DashPosts from "../Components/DashPosts"

const Dashboard = () => {
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
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Side bar */}
            <div className="md:w-56">
                <DashSidebar />
            </div>
            {/* Profile */}
            <div className="flex-1">
                {tab === "profile" ? <DashProfile /> : (null)}
                {tab === 'posts' ? <DashPosts /> : (null)}
            </div>
        </div>
    )
}

export default Dashboard