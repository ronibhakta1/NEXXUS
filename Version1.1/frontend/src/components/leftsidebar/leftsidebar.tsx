import { Search, Settings } from "lucide-react"
import { Leftbarsuggetions } from "./leftbarsuggetions"
import { LeftBarTrends } from "./leftbartrends"

export const Leftsidebar = () => {
    return <div>
        <h1 className="text-white text-3xl font-bold mb-4">NEXXUS<span className="text-blue-400">°</span></h1>
        <div className="bg-gray-800 rounded-full p-3 mb-4 flex items-center">
            <Search className="mr-2 text-gray-500" />
            <input type="text" placeholder="Search Nexxus" className="bg-transparent border-none text-gray-500 w-full focus:outline-none" />
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">Trends for you</h2>
                <Settings className="text-gray-500" />
            </div>
            <LeftBarTrends
            id={1}
            location={'Trending in Turkey'}
            hashtag={'#SQUID'}
            tweets={'2,066'}
        />
        <LeftBarTrends
            id={2}
            location={'Trending in USA'}
            hashtag={'#React'}
            tweets={'5,230'}
        />
        <LeftBarTrends
            id={3}
            location={'Trending Worldwide'}
            hashtag={'#ClimateAction'}
            tweets={'10,500'}
        />
        <LeftBarTrends
            id={4}
            location={'Trending in Tech'}
            hashtag={'#AI'}
            tweets={'8,765'}
        />
            <a href="#" className="text-blue-400 hover:underline">Show more</a>
        </div>
        
        <div className="bg-gray-900 rounded-2xl p-4 mb-4">
            <h2 className="text-xl font-bold mb-3">Who to follow</h2>
            <Leftbarsuggetions
            id={1}
            name={'The New York Times'}
            username={'@nytimes'}
            avatar={'https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png'}
            verified={true}
        />
        <Leftbarsuggetions
            id={2}
            name={'CNN'}
            username={'@CNN'}
            avatar={'https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED_400x400.png'}
            verified={true}
        />
        <Leftbarsuggetions
            id={3}
            name={'NEXXUS'}
            username={'@Nexxus'}
            avatar={'https://pbs.twimg.com/profile_images/1488548719062654976/u6qfBBkF_400x400.jpg'}
            verified={true}
        />
        <a href="#" className="text-blue-400 hover:underline">Show more</a>
        </div>
        
        
    </div>
}