'use client'
import { useState,Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Plus, Leaf, ChevronDown } from "lucide-react";
import Image from "next/image";
// import BeautySearch from "../../../components/ui/search"

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
  const handleDeactive = () => {
  }
 return(
    <div className="flex flex-col  justify-center  items-center">
      
      {/* Bar add new Tracking */}
      <div className="w-[50%] px-5 py-6 flex flex-row justify-between border rounded-2xl h-auto">
          {/* button create new tracking */}
          <Transition 
          show={isOpen}
          as={Fragment}
          >

          <Dialog className="fixed inset-0 flex w-screen ml-20 items-center justify-center p-4 " open={isOpen} onClose={()=> setIsOpen(false)}>
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

                   <Dialog.Panel className="w-full p-4 max-w-2xl rounded-xl z-10 bg-white">
                    <Dialog.Title className="text-2xl font-bold">Create New Tracking</Dialog.Title>
                    <Dialog.Description className="text-gray-400">Create a new tracking for your plant</Dialog.Description>
                    <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>
        <div className="flex flex-row justify-center items-center gap-24 my-4">

        <button className="px-8 py-3 rounded-xl text-blue-500 font-medium hover:bg-blue-300 bg-[#dbeafe]" onClick={() => setIsOpen(false)}>Cancel</button>
        <button className="px-8 py-3 rounded-xl text-blue-500 font-medium hover:bg-blue-300 " onClick={handleDeactive}>Deactivate</button>
        </div>
                   </Dialog.Panel>
         </Transition.Child>
        
          </Dialog>
          </Transition>
          <div className="flex flex-row items-center text-green-400 hover:cursor-pointer hover:underline duration-200 transition ">
                <Plus size={25} className="" />
                  <div onClick={()=>setIsOpen(true)} className="ml-2 font-bold text-2xl">New Tracking</div>
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
           <ChevronDown/>
          </div>
        </div>
        <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
          <h1 >Project</h1>
           <ChevronDown/>
          </div>
        </div>
        <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
          <h1 >Date</h1>
           <ChevronDown/>
          </div>
        </div>
        <div className=" flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
          <h1 >Status</h1>
           <ChevronDown/>
          </div>
        </div>
      </div>
      
      {trackings.map((tracking) =>{
        return(
          <div className="w-[90%] cursor-pointer hover:bg-slate-100  px-5 py-6 flex flex-row">
       
          <div className="w-[40%]  flex flex-row items-center  text-xl text-gray-400 ">
              <div className="flex gap-8 flex-row justify-start items-center">
             <div className="p-9 rounded-full bg-orange-300">
      {/* this is image include the div */}
      <Image className="rounded-full " src="/plantTracking.jpg" alt="this is example" width={40} height={40}/>
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