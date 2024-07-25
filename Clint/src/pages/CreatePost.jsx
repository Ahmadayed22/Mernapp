import { Button, FileInput, Select, TextInput } from "flowbite-react"
import { useRef } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const FileRef = useRef()
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
                    <FileInput type="file" accept="image/*" ref={FileRef} />
                    <Button type="Button" gradientDuoTone={"purpleToBlue"} outline
                        onClick={() => FileRef.current.click()}>Upload Image</Button>
                </div>
                <ReactQuill theme="snow" placeholder="Type ..." className="h-72 mb-12" required />
                <Button type="Submit" gradientDuoTone={"purpleToBlue"} outline> Publish </Button>
            </form>
        </div>
    )
}

export default CreatePost