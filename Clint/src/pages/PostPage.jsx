import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../Components/CallToAction";
import CommentSection from "../Components/CommentSection";
import PostCard from "../Components/PostCard";
import he from 'he'; // Import the he library
import DOMPurify from 'dompurify'; // Import DOMPurify

const PostPage = () => {
    const { postSlug } = useParams();
    const [loading, SetLoading] = useState(true);
    const [error, SetError] = useState(false);
    const [post, SetPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                SetLoading(true);
                const res = await fetch(`http://localhost:3000/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if (!res.ok) {
                    SetError(false);
                    SetLoading(false);
                    return;
                }
                if (res.ok) {
                    SetPost(data.posts[0]);
                    SetLoading(false);
                    SetError(null);
                }
            } catch (error) {
                SetError(error);
                SetLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`http://localhost:3000/api/post/getposts?limit=3`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            };
            fetchRecentPosts();
        } catch (error) {
            console.log(error);
        }
    }, []);

    // Decode and sanitize content
    const getSanitizedContent = (content) => {
        const decodedContent = he.decode(content); // Decode HTML entities
        return DOMPurify.sanitize(decodedContent); // Sanitize the decoded content
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen ">
            <Spinner size='xl' />
        </div>
    );

    return (
        <main className='p-3 flex flex-col max-w-6xl container mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                {post && post.title}
            </h1>
            <Link
                to={`/search?category=${post && post.category}`}
                className='self-center mt-5'
            >
                <Button color='gray' pill size='xs'>
                    {post && post.category}
                </Button>
            </Link>
            <img
                src={post && post.image}
                alt={post && post.title}
                className='mt-10 p-3 max-h-[600px] w-full object-cover rounded-2xl mb-5'
            />
            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>
                    {post && (post.content.length / 1000).toFixed(0)} mins read
                </span>
            </div>
            <div
                className='p-3 max-w-2xl mx-auto w-full post-content'
                dangerouslySetInnerHTML={{ __html: post && getSanitizedContent(post.content) }}
            ></div>
            <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div>
            <CommentSection postId={post._id} />

            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {recentPosts &&
                        recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
            </div>
            {error && (
                <div>{error}</div>
            )}
        </main>
    );
};

export default PostPage;
