import { Alert, Button, Textarea } from 'flowbite-react';
// import { set } from 'mongoose';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types"

const CommentSection = ({ postId }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: userInfo._id,
                }),
                credentials: 'include',
            });
            const data = await res.json();
            // console.log(data)
            if (res.ok) {
                setComment('');
                setCommentError(null);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {userInfo ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as:</p>
                    <img
                        className='h-5 w-5 object-cover rounded-full'
                        src={userInfo.profilePicture}
                        alt=''
                    />
                    <Link
                        to={'/dashboard?tab=profile'}
                        className='text-xs text-cyan-600 hover:underline'
                    >
                        @{userInfo.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                        Sign In
                    </Link>
                </div>
            )}
            {userInfo && (
                <form
                    onSubmit={handleSubmit}
                    className='border border-teal-500 rounded-md p-3'
                >
                    <Textarea
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs'>
                            {200 - comment.length} characters remaining
                        </p>
                        <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                            Submit
                        </Button>
                    </div>
                    {commentError && (
                        <Alert color='failure' className='mt-5'>
                            {commentError}
                        </Alert>
                    )}
                </form>
            )}
        </div>
    );
}

CommentSection.propTypes = {
    postId: PropTypes.string.isRequired,
}
export default CommentSection