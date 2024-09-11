import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../Components/Firebase'
const CreatePost = () => {
    const [File, SetFiles] = useState([]);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    // const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    // console.log(File)
    // const FileRef = useRef()

    const HandelUploadImage = async () => {
        // const res = await fetch("http://localhost:3000/api/post/create")
        try {
            if (!File) {
                setImageFileUploadError("Please select an image")
                return;
            }
            setImageFileUploadError(null)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + File.name;
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, File);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    setImageFileUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageFileUploadError(
                        'Could not upload image (File must be less than 2MB)', error
                    );
                    setImageFileUploadProgress(null);
                    setImageFile(null);
                    setImageFileUrl(null);
                    setImageFileUploading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageFileUrl(downloadURL);
                        setFormData({ ...formData, profilePicture: downloadURL });
                        setImageFileUploading(false);
                    });
                }
            );
        } catch (error) {
            setImageFileUploadError(
                'image upload failed', error
            );
            console.log(error)
        }
    }
    return (
        <div className="p-3 min-h-screen max-w-3xl mx-auto">
            <h1 className="text-center text-3xl my-7 font-semibold">Create Post </h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <TextInput type="text" placeholder="Title" id="title" required className="flex-1" />
                    <Select id="countries" className="flex-1">
                        <option value="uncategorized">Select a category</option>
                        <option>JavaScript</option>
                        <option>React.Js</option>
                        <option>Node.Js</option>
                    </Select>
                </div>
                <div className="border-4 items-center border-cyan-500 border-dotted p-3 flex justify-between">
                    <FileInput type="file" accept="image/*" onChange={(e) => SetFiles(e.target.files[0])} />
                    <Button type="Button" gradientDuoTone={"purpleToBlue"} outline
                        onClick={HandelUploadImage}>Upload Image</Button>
                </div>
                {imageFileUploadError && (
                    <Alert color='failure' >{imageFileUploadError} </Alert>
                )}
                {formData.image && (
                    <img src={formData.image} alt="uload" className="w-full h-72 object-cover" />
                )}
                <ReactQuill theme="snow" placeholder="Type ..." className="h-72 mb-12" required />
                <Button type="Submit" gradientDuoTone={"purpleToBlue"} outline> Publish </Button>
            </form>
        </div>
    )
}

export default CreatePost