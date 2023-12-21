import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '@/app/libs/utils';


function Form() {
  const [image, setImage] = useState<File>();
  const [result, setResult] = useState<string>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHealthy, setIsHealthy] = useState(true);

  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
    if (e.target.files) setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const detectImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);

    try {
        setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
   
      setResult(response.data);
      console.log("Predicted class: ", response.data)
      if(result !== 'Apple___healthy') {
        setIsHealthy(false); 
      }
      else{
        setIsHealthy(true);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500); // sau 2 giây mới tắt loading

    } catch(error) {
      console.error("Predcit error",error);
    }
  }

// useEffect(()=>{
//   try {
//     const res = axios.patch
//   } catch (error) {
    
//   }
// }, [!isHealthy])

  return (
    <div className='flex flex-row justify-center items-center gap-3'>
     <div className='flex flex-col items-center justify-center gap-6'>
     {imagePreview && (
        <img width={400} src={imagePreview} alt="preview" />  
      )}
      <input type="file" onChange={onImageSelect} />
      <div className='flex justify-center items-center'>
      <button className='p-3 bg-green-200 hover:cursor-pointer rounded-lg' onClick={detectImage}>Detect</button>
      </div>
     </div>
      
      <div className={cn("flex flex-col justify-center items-center gap-8  rounded-2xl py-32 px-40", isHealthy ? 'bg-green-400' : 'bg-red-500')}>
                    <a className="text-3xl font-semibold">
                        Result
                    </a>
                    {/* Loading effect spining*/}
                    {loading && (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    )}
                    
                    <a className="text-xl font-semibold">
                    {result && !loading && <p className='text-xl font-medium'> {result}</p>}
                    </a>
                    <a className="">
                    { !isHealthy ? ( <p className=' font-medium'> Your plant have diseased !!!</p>) : ( <p className=' font-medium'> Your plant is healthy !!!</p>)}
                   
                    </a>
                </div>
     
    </div>
  );
}

export default Form;