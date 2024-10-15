import { Button } from 'flowbite-react';
import profileImage from '../assets/photo.png';
export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    This will go to my portofolio in future
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout my portofolio
                </p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href="" target='_blank' rel='noopener noreferrer'>
                        portofolio
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1 ">
                <img className='rounded h-96' src={profileImage} alt="Profile" />
            </div>
        </div>
    )
}