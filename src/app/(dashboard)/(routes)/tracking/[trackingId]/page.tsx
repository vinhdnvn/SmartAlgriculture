'use client'
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import getTrackingById from "@/app/actions/getTrackingById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { FullTrackingType } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import Form from "../components/Form";
import axios from "axios";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { cn } from "@/app/libs/utils";
import Body from "./components/Body";

interface IParams {
  id: string;
}

const Tracking= async({ params }: { params: IParams }) => {
  
  const tracking = await getTrackingById(params.id);
  const [isModelDetectOpen, setIsModalDetectOpen] = useState(false);
  // const currentUser = await getCurrentUser();
     
  if(!tracking) {
      return <div>Tracking not found</div>
  }


  function getCurrentTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}`;
    return time;
  }
  function getDate(){
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateStr = `${day}/${month}/${year}`;
    return dateStr;
  }
  // const [time, setTime] = useState(getCurrentTime());
  // const [weather, setWeather] = useState(getWeatherAndTime());
  // const [date, setDate] = useState(getDate());
  const [image, setImage] = useState<File>();
    const [result, setResult] = useState<string>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isHealthy, setIsHealthy] = useState(true);

    const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files![0]);
        if (e.target.files) setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

   
      const [isModelOpen, setIsModalOpen] = useState(false);



    const detectImage = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('file', image);

        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:5000/predict', formData);

            setResult(response.data);
            console.log("Predicted class: ", response.data)
            if (result !== 'Apple___healthy') {
                setIsHealthy(false);
                // print type of trackingId
           


                try {
                     const response = await axios.post(`/api/tracking/${params.id}`, { haveDiseasePlant: false })
                      if (response)  console.log("Update tracking success", response)
                } catch (error) {
                    console.error("Update tracking error", error)

                }


            }
            setTimeout(() => {
                setLoading(false);
            }, 1500); // sau 2 giây mới tắt loading

        } catch (error) {
            console.error("Predcit error", error);
        }
    }



  


    return (
    
      
      <div className="border-t-2 mt-6 ">
 
          <div className="bg-[#64BC73]/20 p-3 w-[20%] flex flex-col items-center justify-center mt-7 rounded-xl ml-[75%]">
                    {/* <p className="text-xl font-bold">Weather : {weather}</p>
                    <p className=" text-xl font-bold">Time : {time}</p> */}
            
          </div>
          {/* content of plant  */}
         
 <div className="flex flex-row gap-16 justify-center items-center m-4">
 {/* image */}
    <div className="flex flex-col gap-7 justify-center items-center">
       
         <Image width={420} height={260} className="rounded-2xl" src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />
         <div className=" bg-green-400 rounded-xl px-9 py-3 text-xl text-white font-bold"> ???</div>
    </div>
 {/* content, informatin of plants */}
    <div className="flex flex-col justify-center items-start gap-8">
       <div className="flex flex-row items-center gap-3">
         <Image width={30} height={30} src="/iconsPlant/calenderIcon.png" alt="calender" />
         <a className="font-bold text-3xl">Ngày trồng:  </a>
         <a className=" text-3xl">{}</a>
       </div>
       <div className="flex flex-col justify-start items-start gap-3">
         <div className="flex flex-row">
         <Image width={30} height={30} className="mr-3" src="/iconsPlant/featureIcon.png" alt="calender" />
         <a className="font-bold text-3xl"> Đặc điểm : </a>
         </div>
        
         <a className="ml-8 text-3xl">Cao : 1m4 <br/> Loại lá : Lá đơn <br/> Thời gian trồng phù hợp: Mùa thu</a>
       </div>
       <div className="flex flex-row items-center gap-3">
         <Image width={30} height={30} src="/iconsPlant/leafIcon.png" alt="calender" />
         <a className="font-bold text-3xl">Tình trạng: </a>
         <a className=" text-3xl">Phát triển tốt</a>
       </div>
       <div className="flex flex-row items-center gap-3">
         <Image width={30} height={30} src="/iconsPlant/appleIcon.png" alt="calender" />
         <a className="font-bold text-3xl">Chất lượng quả: </a>
         <a className=" text-3xl">Tốt</a>
       </div>
       <div className="flex flex-col justify-start items-start gap-3">
         <div className="flex flex-row">
         <Image width={30} height={30} className="mr-3" src="/iconsPlant/featureIcon.png" alt="calender" />
         <a className="font-bold text-3xl"> Yêu cầu chăm sóc </a>
         </div>
        
         <a className="ml-8 text-3xl">Tiếp tục kế hoạch bón phân tưới nước như thường ngày</a>
       </div>
       <button key="id"  onClick={() => setIsModalDetectOpen(true)} className="bg-orange-300 rounded-xl px-14 text-xl font-medium cursor-pointer transition duration-150 hover:bg-green-300 py-4 flex items-center justify-center ">Trợ giúp cây trồng</button>
       <Transition.Root
                show={isModelDetectOpen} as={Fragment}
            >
                <Dialog as="div" className="fixed inset-0 flex w-screen ml-20 items-center justify-center p-4  " onClose={() => setIsModalOpen(false)} >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />

                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                            className="
                                w-full p-4 max-w-4xl rounded-xl z-10 bg-white flex flex-col justify-between items-center
                            "
                        >
                            <div className="
                    absolute 
                    right-0 
                    top-0 
                    hidden 
                    pr-4 
                    pt-4 
                    sm:block
                    z-10
                  ">    <button type="button"
                                    className="
                    rounded-md 
                    bg-white 
                    text-gray-400 
                    hover:text-gray-500 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-indigo-500 
                    focus:ring-offset-2
                  "
                                    onClick={() => setIsModalDetectOpen(false)}>
                                    <span className="sr-only"> Close</span>
                                    <IoClose className="h-6 w-6" aria-hidden="true" />

                                </button>

                            </div>

                            <div className='flex flex-row justify-center items-center'>
            <div className='flex flex-col items-center justify-center gap-6'>
                {imagePreview && (
                    <img width={400} src={imagePreview} alt="preview" />
                )}
                <input type="file" onChange={onImageSelect} />
                <div className='flex justify-center items-center'>
                    <button className='p-3 bg-green-200 hover:cursor-pointer rounded-lg' onClick={()=>detectImage()}>Detect</button>
                </div>
            </div>

            <div className={cn("flex ml-[50px] flex-col justify-center items-center gap-8  rounded-2xl py-28 px-40", isHealthy ? 'bg-green-400' : 'bg-red-500')}>
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
                    {!isHealthy && <p className='text-xl  font-medium'> Your plant have diseased !!!</p>}
                </a>
            </div>

        </div>



                        </Dialog.Panel>

                    </Transition.Child>

                </Dialog>
            </Transition.Root>

    </div>
</div>
      
         

    </div>

    )
  }

  export default Tracking;