
import { Star } from 'lucide-react'
import { Echos } from '../../components/bulkechos/echos'
import { PostEchos } from '../../components/postechos/postechos'
import { Leftsidebar } from '../../components/leftsidebar/leftsidebar'
import { RightSidebar } from '../../components/rightsidebar/rightsidebar'
import { RightDownProfileUser } from '../../components/rightdowncorner/rightdownuser'


export const  Nexxus =() => {
    return <div className="flex justify-center min-h-screen bg-black text-gray-200 font-sans text-sm ">
            <div className="flex w-full max-w-6xl ">
                {/* Left Sidebar */}
                <div className=" p-4 max-w-65 flex flex-col h-screen sticky top-0 ">
                <Leftsidebar />
                    
                </div>

                {/* Main Content */}
                <div className=" w-69 p-4 flex flex-col flex-1 border-l border-r border-gray-800 min-h-screen scroll-smooth">
                    <div className="sticky top-0 bg-black z-10 border-b border-gray-800 p-4 flex justify-between items-center ">
                        <h2 className="text-xl font-bold">Home</h2>
                        <Star className="text-gray-500" />
                    </div>
                    <PostEchos />
                    {/* <EchoLoader /> */}
                    <Echos />
                </div>

                {/* Right Sidebar */}
                <div className="w-64 p-4 flex flex-col h-screen sticky top-0">
                <RightSidebar />
            </div>

            {/* Profile Tab */}
            <RightDownProfileUser />
            
        </div>
    </div>
}
    