'use client'

import { Plus, Leaf, ChevronDown } from "lucide-react";
// import BeautySearch from "../../../components/ui/search"


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

      <div className="w-[90%] px-5 py-6 flex flex-row justify-between items-center  h-auto" >
          <h1 className="text-2xl font-bold">Tracking List</h1>
          <div className="border rounded-3xl py-4 px-8 text-xl font-medium text-gray-500"> Total tracking: 2</div>
      </div>
      
      <div className="w-[90%] px-5 py-6 flex flex-row">
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
          <h1 >Project</h1>
           <ChevronDown/>
          </div>
        </div>
        <div className=" flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
          <h1 >Project</h1>
           <ChevronDown/>
          </div>
        </div>
      </div>
    
     
    </div>
 )
}

export default TrackingPage;