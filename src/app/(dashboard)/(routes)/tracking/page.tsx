'use client'
import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Plus, Leaf, ChevronDown } from "lucide-react";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import BeautySearch from "../../../components/ui/search"
import axios from "axios";
import toast from "react-hot-toast";

import { Switch } from "@headlessui/react";
import { CldUploadButton } from "next-cloudinary";
import Button from "@/app/components/Button";
import { useSession } from "next-auth/react";
import useUser from '@/hooks/useUser';
import getCurrentUser from "@/app/actions/getCurrentUser";


// visualize for me the data of tracking include title ,status,date,duration
const trackings = [
  {
    "title": "Plant 1",
    "namePlants": "Tomato",
    "status": "Healthy",
    "date": "12/12/2021",
    "duration": "2 weeks"
  },
  {
    "title": "Plant 2",
    "namePlants": "Tomato",
    "status": "Healthy",
    "date": "12/12/2021",
    "duration": "2 weeks"
  },
  {
    "title": "Plant 3",
    "namePlants": "Tomato",
    "status": "Healthy",
    "date": "12/12/2021",
    "duration": "2 weeks"
  }
]


const TrackingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [plantName, setPlantName] = useState('' as any);
  const [descriptionPlant, setDescriptionPlant] = useState('' as any);
  const [statusPlant, setStatusPlant] = useState('' as any);
  const [qualityPlant, setQualityPlant] = useState('' as any);
  const [isLoading, setIsLoading] = useState(false);
  const [haveDiseasePlant, setHaveDiseasePlant] = useState(false);
  const [imagePlant, setImagePlant] = useState<string>('');
  const [date, setDate] = useState('' as any);
  const {data:session} = useSession();
  const {userId} = useUser();
  const handleDeactive = (data: any) => {

    // console log namePlant
    // console.log(plantName)
  }

  // const currentUser = getCurrentUser(userId);


  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      // date:'',
      namePlant: '',
      descriptionPlant: '',
      statusPlant: '',
      qualityPlant: '',  
      haveDiseasePlant: false,
      // imagePlant: '',
    }
  });


  // useEffect(()=>{

  //   setImagePlant(imagePlant)
    
  // },[imagePlant])

  const handleUpload = (result: any) => {
    setImagePlant(result.info.secure_url)
    
  
    
    //  console.log(imagePlant.info.secure_url);
  }
  const resetImage = () => {
    setImagePlant('')
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post('/api/tracking', {
      ...data,
      imagePlant,
    }).then(() => {
        toast.success('Create tracking successfully');
      })
      .catch((err: any) => {
        toast.error('Something went wrong');

      })
      .finally(() => {
        setIsLoading(false);
      })

  // console.log(data)
  //   console.log(imagePlant)

  }


 


  return (
    <div className="flex flex-col  justify-center  items-center">

      {/* Bar add new Tracking */}
      <div className="w-[50%] px-5 py-6 flex flex-row justify-between border rounded-2xl h-auto">
        {/* button create new tracking */}
        <Transition
          show={isOpen}
          as={Fragment}
        >

          <Dialog className="fixed inset-0 flex w-screen ml-20 items-center justify-center p-4 " open={isOpen} onClose={() => setIsOpen(false)}>
            <Transition.Child

              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              as={Fragment}
            >

              <div className="fixed  inset-0 bg-black/30" aria-hidden="true" />
            </Transition.Child>

            <Transition.Child

              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              as={Fragment}
            >

              <Dialog.Panel className="w-full p-4 max-w-4xl rounded-xl z-10 bg-white flex flex-col justify-between items-center">
                <Dialog.Title className="text-2xl font-bold">Create New Tracking</Dialog.Title>
                <Dialog.Description className="text-gray-400 text-xl">Create a new tracking for your plant</Dialog.Description>
                <form className="mt-3  gap-4 flex flex-col justify-center items-center " onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-row gap-10 px-9 items-center">
                    <div className="flex flex-col gap-4">

                      <div className="flex flex-row gap-6 items-center">
                        <label className="text-xl"> Date:  </label>
                        <input className="hover:cursor-pointer" type="date" id="plantDate" onChange={(e)=> setDate(e.target.value)}></input>
                      </div>
                      <label>

                        <input type="text" id="namePlant" placeholder="Name of plant" className="w-full  border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-300" {...register('namePlant', { required: true })}
                          onChange={(e) => setPlantName(e.target.value)}
                        />
                      </label>
                      <label>

                        <input type="text" id="descriptionPlant" placeholder="Description" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-300" {...register('descriptionPlant', { required: true })}
                          onChange={(e) => setDescriptionPlant(e.target.value)}
                        />
                      </label>
                      <label>

                        <input type="text" id="statusPlant" placeholder="Status" defaultValue="Phát triển tốt" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-300" {...register('statusPlant', { required: true })}
                          onChange={(e) => setStatusPlant(e.target.value)}
                        />
                      </label>
                      <label>

                        <input type="text" id="qualityPlant" placeholder="Quality" defaultValue="Phát triển tốt" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-300" {...register('qualityPlant', { required: true })}
                          onChange={(e) => setQualityPlant(e.target.value)}
                        />
                      </label>
                      <div className="flex flex-row gap-3">
                        <label>On diseased :</label>
                        <label>No</label>
                        <Switch
                          checked={haveDiseasePlant}
                          onChange={setHaveDiseasePlant}
                          className={`${haveDiseasePlant ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            className={`${haveDiseasePlant ? 'translate-x-6' : 'translate-x-1'
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                        <label>Yes</label>
                      </div>
                    </div>

                    {/* image upload */}
                    <div className="flex flex-col gap-3 justify-center items-center ">
                      <a className="font-medium text-lg text-gray-500">
                        Select plant's image !

                      </a>

                      {/* showing image  */}
                      <div>
                        {
                          isLoading ? (
                            <div className=" inset-0 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                          ) : (
                            <div className="p-3 rounded-lg">
                              {imagePlant && <Image src={imagePlant}  alt="image" width={300} height={300} />}
                            </div>

                          )
                        }
                        {/* Button upload and reset */}
                        <div className="flex flex-row justify-center items-center gap-16 ">


                          <div className="p-3 bg-green-500 rounded-xl text-white font-bold">
                            <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload}  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} >
                              Upload Image
                            </CldUploadButton>
                          </div>


                          <button onClick={resetImage} className="bg-red-400 rounded-xl text-white font-bold p-3" >Reset Image</button>
                        </div>

                      </div>
                    </div>

                  </div>


                  <div>

                  </div>

                  <div className="flex flex-row justify-center items-center gap-24 my-4">

                    <button className="px-8 py-3 rounded-xl text-blue-500 font-medium hover:bg-blue-300 bg-[#dbeafe]" onClick={() => setIsOpen(false)}>Cancel</button>
                    <button type="submit" className="px-8 py-3 bg-green-300 rounded-xl text-blue-500 font-medium hover:bg-blue-300 " onClick={handleDeactive}>Create</button>
                  </div>

                </form>

              </Dialog.Panel>
            </Transition.Child>

          </Dialog>
        </Transition>
        <div className="flex flex-row items-center text-green-400 hover:cursor-pointer hover:underline duration-200 transition ">
          <Plus size={25} className="" />
          <div onClick={() => setIsOpen(true)} className="ml-2 font-bold text-2xl">New Tracking</div>
        </div>
        <div >

          <Leaf size={25} className="text-green-400" />
        </div>
      </div>
      {/* Board column of list tracking */}

      <div className="w-[90%] px-5 py-6 flex flex-row justify-between items-center  h-auto " >
        <h1 className="text-2xl font-bold">Tracking List</h1>
        <div className="border rounded-3xl py-4 px-8 text-xl font-medium text-gray-500"> Total tracking: 2</div>
      </div>

      <div className="w-[90%] px-5 py-6 flex flex-row border-b border-gray-200">
        <div className="w-[40%] flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
            <h1 >Project</h1>
            <ChevronDown />
          </div>
        </div>
        <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
            <h1 >Project</h1>
            <ChevronDown />
          </div>
        </div>
        <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
            <h1 >Date</h1>
            <ChevronDown />
          </div>
        </div>
        <div className=" flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
            <h1 >Status</h1>
            <ChevronDown />
          </div>
        </div>
      </div>

      {trackings.map((tracking) => {
        return (
          <div className="w-[90%] cursor-pointer hover:bg-slate-100  px-5 py-6 flex flex-row">

            <div className="w-[40%]  flex flex-row items-center  text-xl text-gray-400 ">
              <div className="flex gap-8 flex-row justify-start items-center">
                <div className="p-9 rounded-full bg-orange-300">
                  {/* this is image include the div */}
                  <Image className="rounded-full " src="/plantTracking.jpg" alt="this is example" width={40} height={40} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-black" >{tracking.title}  </h1>
                  <h2 className="text-lg font-medium text-gray-400">{tracking.namePlants}</h2>

                </div>
                {/* <ChevronDown/> */}
              </div>
            </div>
            <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
              <div className="flex flex-row justify-start items-center">
                <h1 >0:14:54</h1>
                {/* <ChevronDown/> */}
              </div>
            </div>
            <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
              <div className="flex flex-row justify-start items-center">
                <h1 >{tracking.date}</h1>
                {/* <ChevronDown/> */}
              </div>
            </div>
            <div className=" flex flex-row items-center  text-xl text-gray-400 ">
              <div className="flex flex-row justify-start items-center">
                <h1 >{tracking.status}</h1>
                {/* <ChevronDown/> */}
              </div>
            </div>
          </div>
        )
      })}



    </div>
  )
}

export default TrackingPage;