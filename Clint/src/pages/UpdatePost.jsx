import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
// import { app } from '../Components/Firebase'
const UpdatePost = () => {
    // const [File, SetFiles] = useState([]);
    // console.log(File)
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()
    const { postId } = useParams();
    const [PublishError, SetPublishError] = useState(null)
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {

                    SetPublishError(data.error);
                    return;
                }

                SetPublishError(null);
                setFormData(data.posts[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPostData();
    }, [postId]);



    const HandelUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/post/updatepost/${postId}/${userInfo._id}`, {
                method: "PUT",
                body: JSON.stringify(formData),
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${userInfo.token}`
                }
            });
            const data = await res.json()
            if (!res.ok) {
                SetPublishError(data.error);
                return;
            }
            else {
                SetPublishError("Publish is Done")
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            SetPublishError(error);
        }
    }
    return (
        <div className="p-3 min-h-screen max-w-3xl mx-auto">
            <h1 className="text-center text-3xl my-7 font-semibold">Update Post </h1>
            <form className="flex flex-col gap-4" onSubmit={HandelUpdate}>
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <TextInput type="text" placeholder="Title" id="title" required className="flex-1"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} />
                    <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        id="countries" className="flex-1" value={formData.category}>
                        <option value="uncategorized">Select a category</option>
                        <option>JavaScript</option>
                        <option>React.Js</option>
                        <option>Node.Js</option>
                    </Select>
                </div>
                <div className="border-4 items-center border-cyan-500 border-dotted p-3 flex justify-between">
                    <FileInput type="file" accept="image/*" />
                    <Button type="Button" gradientDuoTone={"purpleToBlue"} outline
                    >Upload Image</Button>
                </div>
                {/* {imageFileUploadError && (
                    <Alert color='failure' >{imageFileUploadError} </Alert>
                )} */}
                {formData.image && (
                    <img src={formData.image} alt="uload" className="w-full h-72 object-cover" />
                )}
                <ReactQuill theme="snow" placeholder="Type ..." className="h-72 mb-12" required
                    onChange={(value) => setFormData({ ...formData, content: value })} value={formData.content} />
                <Button type="Submit" gradientDuoTone={"purpleToBlue"} outline> Update </Button>
            </form>
            <div>
                {
                    PublishError && (
                        <Alert color='failure' >{PublishError} </Alert>
                    )
                }

            </div>
        </div>
    )
}

export default UpdatePost


// const [imageFileUploadError, setImageFileUploadError] = useState(null);
// const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
// const [imageFileUploading, setImageFileUploading] = useState(false);
// const [imageFile, setImageFile] = useState(null);
// const [imageFileUrl, setImageFileUrl] = useState(null);


// const HandelUploadImage = async () => {
//     try {
//         if (!File) {
//             setImageFileUploadError("Please select an image")
//             return;
//         }
//         setImageFileUploadError(null)
//         const storage = getStorage(app)
//         const fileName = new Date().getTime() + '-' + File.name;
//         const storageRef = ref(storage, fileName)
//         const uploadTask = uploadBytesResumable(storageRef, File);
//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progress =
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

//                 setImageFileUploadProgress(progress.toFixed(0));
//             },
//             (error) => {
//                 setImageFileUploadError(
//                     'Could not upload image (File must be less than 2MB)', error
//                 );
//                 setImageFileUploadProgress(null);
//                 setImageFile(null);
//                 setImageFileUrl(null);
//                 setImageFileUploading(false);
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     setImageFileUrl(downloadURL);
//                     setFormData({ ...formData, profilePicture: downloadURL });
//                     setImageFileUploading(false);
//                 });
//             }
//         );
//     } catch (error) {
//         setImageFileUploadError(
//             'image upload failed', error
//         );
//         console.log(error)
//     }
// }