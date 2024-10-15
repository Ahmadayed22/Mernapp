import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
// import { authActions } from '../store/auth';
import { themeAction } from '../store/themeSlice';
import { HandelSignOut } from '../utlis/authUtlis';
import { useEffect, useState } from 'react';

export default function Header() {
    const navigate = useNavigate()
    const path = useLocation().pathname;
    const location = useLocation();
    const { userInfo } = useSelector((state) => state.auth)
    const { theme } = useSelector((state) => state.theme)
    const dispatch = useDispatch()
    const navagit = useNavigate();
    const [searchTerm, SetSearchTerm] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTemFromUrl = urlParams.get('searchTerm')
        if (searchTemFromUrl)
            SetSearchTerm(searchTemFromUrl)
    }, [location.search])


    const handelSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString();
        navagit(`/search?${searchQuery}`)
    }
    const SingOut = () => {
        HandelSignOut(dispatch, navigate)
    }
    return (
        <Navbar className='border-b-2 '>
            <Link
                to='/'
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
            >
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    Ayed
                </span>
                Blog
            </Link>
            <form onSubmit={handelSubmit}>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    value={searchTerm}
                    onChange={(e) => SetSearchTerm(e.target.value)}
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(themeAction.toggleTheme())}>
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </Button>
                {
                    userInfo ? (
                        <Dropdown arrowIcon={false} inline label={
                            <Avatar alt="user" img={userInfo.profilePicture} rounded bordered />
                        }>
                            <Dropdown.Header>
                                <span className="block text-sm">{userInfo.username}</span>
                                <span className="block truncate text-sm font-medium mt-1">{userInfo.email}</span>
                            </Dropdown.Header>


                            <Link to={'/dashboard?tab=profile'} >
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <DropdownDivider />
                            <Dropdown.Item onClick={SingOut}>Sign out</Dropdown.Item>
                        </Dropdown>
                    )
                        : (
                            <Link to='/sign-in'>

                                <Button gradientDuoTone='purpleToBlue'>Sign In</Button>
                            </Link>
                        )
                }

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}