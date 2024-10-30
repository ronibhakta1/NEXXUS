import { MessageCircle, Repeat, Heart, Share2 } from 'lucide-react'

interface echoProps {
    id: number;
    user: string;
    username: string;
    time: string;
    content: string;
    comments: number | string;
    retweets: number | string;
    likes: number | string;
    image?: string | null;
    avatar: string;
    verified: boolean;
    datee?: Date;
}


export const EchoCards = ({
    id,
    user,
    username,
    time,
    content,
    comments,
    retweets,
    likes,
    image,
    avatar,
    verified,
    datee

}: echoProps) => {
    return (<div>
        <div className="overflow-y-auto">
            <div key={id} className="p-4 border-b border-gray-800">
                <div className="flex mb-3">
                    {/* <img src={avatar} alt={user} className="w-12 h-12 rounded-full mr-3" /> */}
                    <Avatar name={user}  />
                    <div>
                        <span className="font-bold">{user}</span>
                        {verified && <span className="text-blue-400 ml-1">✓</span>}
                        <span className="text-gray-500 ml-1"> @{username} · {time} · {datee?.toLocaleString()}</span>
                    </div>
                </div>
                <p className="mb-3">{content}</p>
                {image && <img src={image} alt="Tweet image" className="w-full rounded-2xl mb-3" />}
                <div className="flex justify-between text-gray-500">
                    <span><MessageCircle className="inline mr-2" />{comments}</span>
                    <span><Repeat className="inline mr-2" />{retweets}</span>
                    <span><Heart className="inline mr-2" />{likes}</span>
                    <span><Share2 className="inline" /></span>
                </div>
            </div>
        </div>
    </div>
    )
}
function Avatar({ name }: { name: string }) {
    return < div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden w-12 h-12 rounded-full mr-3 bg-gray-100 rounded-fulldark:bg-gray-600">
<span className="font-medium text-3xl text-gray-600 dark:text-black">{name[0]}</ span>
</div >
}
    