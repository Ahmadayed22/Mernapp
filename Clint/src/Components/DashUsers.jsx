import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from 'react-icons/fa'

const DashUsers = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [users, setusers] = useState([]);
    const [ShowMore, SetShowMore] = useState(true);
    const [showModal, SetShowModal] = useState(false);
    const [userIdToDelete, setuserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await res.json();
                console.log(data.users.length)
                if (res.ok) {
                    setusers(data.users);
                    if (data.users.length < 5) {
                        SetShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (userInfo.IsAdmin) {  // Ensure consistent casing
            fetchUsers();
        }
    }, [userInfo]);
    const handleShowMore = async () => {
        const startIndex = users.length
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();

            if (res.ok) {
                setusers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9) {
                    SetShowMore(false);
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    const HandelDelteUser = async () => {
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json();
            if (!res.ok) {
                console.log(data.error)
            }
            if (res.ok) {
                setusers((prev) => prev.filter((user) => user._id != userIdToDelete))
                SetShowModal(false)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {userInfo.IsAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date created</Table.HeadCell>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        {users.map((user) => (
                            <Table.Body key={user._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>

                                        <img
                                            src={user.profilePicture}
                                            alt={user.username}
                                            className='w-10 h-10 rounded-full object-cover bg-gray-500'
                                        />

                                    </Table.Cell>
                                    <Table.Cell>{user.username}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.IsAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}</Table.Cell>
                                    <Table.Cell>
                                        <span onClick={() => {
                                            SetShowModal(true);
                                            setuserIdToDelete(user._id)

                                        }}
                                            className='font-medium text-red-500 hover:underline cursor-pointer'>
                                            Delete
                                        </span>
                                    </Table.Cell>

                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {ShowMore && (
                        <button onClick={handleShowMore} className="w-full self-center text-teal-500 text-sm py-7">Show More</button>
                    )}
                </>
            ) : (
                <p>You have no users yet!</p>
            )}
            <Modal show={showModal} size="md" onClose={() => SetShowModal(false)} popup >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete Your user?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={HandelDelteUser} >
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => SetShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DashUsers;
