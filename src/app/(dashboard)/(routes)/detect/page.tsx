'use client'
import Button from "@/app/components/Button";
import { useState, useEffect } from "react";
import { CldImage, CldUploadButton } from 'next-cloudinary';
import Image from "next/image";
import { useSession } from "next-auth/react";
import Custom404 from "../../error";
import axios from "axios";
import toast from "react-hot-toast";
import { DropzoneArea } from "material-ui-dropzone";
import Form from "./components/Form";



const DetectPage = () => {

    

    const uploadImage =  () => {
console.log(files);
        

    }

    const handleUpload = (result: any) => {
        setFiles(result.info.secure_url)
        console.log(files);
        // uploadImage(result.target.files[0])
    }
    const resetImage = () => {
        setFiles(null)
    }
   
    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState(null);

    const handleInputChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };
    const sendFile = async ()=>{
        if(!selectedFile) return toast.error('Please select a file');


        if(files){
            let formData = new FormData();
            formData.append('file', selectedFile);
             await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res.data);
                toast.success('Image uploaded successfully');
            }).catch((err) => {
                console.log(err);
                toast.error('Something went wrong in detect');
            });
            
        }
        console.log("ok");
    }

    
    const onSelectedFile = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };


    



    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState(null);
    useEffect(() => {
        if (!files) {
          return;
        }
       
        sendFile();
      }, [files]);

    // if (status === 'loading') return <Custom404 />
    return (
        < >

            <div className="p-10 w-full flex flex-row justify-evenly items-center gap-8">

                {/* image picker part */}
                <div className="flex flex-col justify-center items-center gap-8">

                    <a className="text-3xl font-semibold">
                        Detect Image | Disease on your plant
                    </a>
                    <a className="font-medium text-lg text-gray-500">
                        Select your Image from your device to detect !

                    </a>
                    <Form />

                    {/* showing image  */}
                    <div>
                        {
                            isLoading ? (
                                <div className=" inset-0 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                                </div>
                            ) : (
                                <div>
                                    {files && <Image src={files} alt="image" width={500} height={500} />}
                                
                                </div>

                            )
                        }

                    </div>


                    {/* Button upload and reset */}
                    {/* <div className="flex flex-row justify-center items-center gap-16 ">


                        <div className="p-3 bg-green-500 rounded-xl text-white font-bold">
                            <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} >
                                Upload Image
                            </CldUploadButton>
                        </div>


                        <Button  onClick={uploadImage}>Detect</Button>
                       <form>
                       <input
                            type="file"
                            onChange={onSelectedFile}
                        />
                        <button className="text-3xl" onClick={sendFile}>Send</button>
                       </form>
                    </div> */}
                </div>
                {/* result after detecting */}
             


            </div>


        </>
    )
}

export default DetectPage;

