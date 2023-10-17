'use client'

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
 return(
    <div className="flex flex-col justify-center  items-center">
      
      {/* Bar add new Tracking */}
      <div className="w-[50%] px-5 py-6 flex flex-row justify-between border rounded-2xl h-auto">
           <div className="flex flex-row items-center text-green-400 hover:cursor-pointer hover:underline duration-200 transition ">
                <Plus size={25} className="" />
                  <div className="ml-2 font-bold text-2xl">New Tracking</div>
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

      <div className="w-[90%] cursor-pointer px-5 py-6 flex flex-row">
       
      <div className="w-[40%]  flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex gap-8 flex-row justify-start items-center">
         <div className="p-9 rounded-full bg-orange-300">
  {/* this is image include the div */}
  <Image className="rounded-full " src="/plantTracking.jpg" alt="this is example" width={40} height={40}/>
         </div>
         <div>
          <h1 className="text-xl font-bold text-black" >Orely plants design  </h1>
          <h2 className="text-lg font-medium text-gray-400">Tomato</h2>

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
          <h1 >16/5/2023</h1>
           {/* <ChevronDown/> */}
          </div>
        </div>
        <div className=" flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
          <h1 >healthy</h1>
           {/* <ChevronDown/> */}
          </div>
        </div>
      </div>
    
     
    </div>
 )
}

export default TrackingPage;