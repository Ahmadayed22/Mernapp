import moment from 'moment';
import { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const Comment = ({ comment, onLike }) => {
    const [user, setUser] = useState({});
    const { userInfo } = useSelector((state) => state.auth);
    console.log(comment.likes.includes(userInfo._id))
    // console.log(userInfo._id);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img
                    className='w-10 h-10 rounded-full bg-gray-200'
                    src={user.profilePicture}
                    alt={user.username}
                />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>
                        {user ? `@${user.username}` : 'anonymous user'}
                    </span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                <p className='text-gray-500 pb-2'>{comment.content}</p>
                <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                    <button
                        type='button'
                        onClick={() => onLike(comment._id)}
                        className={`text-gray-400 hover:text-blue-500 ${userInfo &&
                            comment.likes.includes(userInfo._id) &&
                            '!text-blue-500'}`}>
                        <FaThumbsUp className='text-sm' />
                    </button>
                    <p className='text-gray-400'>
                        {comment.numberOfLikes > 0 &&
                            comment.numberOfLikes +
                            ' ' +
                            (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                    </p>
                    {/*
                    {currentUser &&
                        (currentUser._id === comment.userId || currentUser.isAdmin) && (
                            <>
                                <button
                                    type='button'
                                    onClick={handleEdit}
                                    className='text-gray-400 hover:text-blue-500'
                                >
                                    Edit
                                </button>
                                <button
                                    type='button'
                                    onClick={() => onDelete(comment._id)}
                                    className='text-gray-400 hover:text-red-500'
                                >
                                    Delete
                                </button>
                            </>
                        )} */}
                </div>
            </div>
        </div>
    );
}
Comment.propTypes = {
    comment: PropTypes.string.isRequired,
    onLike: PropTypes.func.isRequired,
}

export default Comment;