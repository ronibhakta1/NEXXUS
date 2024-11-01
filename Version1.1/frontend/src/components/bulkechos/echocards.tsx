import { toast } from '@/hooks/use-toast';
import { MessageCircle, Repeat, Heart, Share2 } from 'lucide-react';

interface EchoProps {
    id: number;
    user: { name: string }; // Add user prop
    content: string;
    authorId: number;
    username: string;
    time: string;
    todaydate: string;
    comments: any[];
    reshares: any[];
    likes: any[];
    image?: string | null;
    avatar?: string | null;
}

export const EchoCards = ({
    id,
    content,
    user,
    todaydate,
    // authorId,
    username,
    time,
    comments,
    reshares,
    likes,
    image,
    // avatar
}: EchoProps) => {
    function toastloader() {
        const showToast = localStorage.getItem('showToast');
        const toastContent = localStorage.getItem('toastContent');
        if (showToast === 'true' && toastContent) {
            toast({
                title: "Echoed",
                description: toastContent,
            });
            // Remove the flag and content from local storage
            localStorage.removeItem('showToast');
            localStorage.removeItem('toastContent');
        }
    }

    toastloader();
    return (
        <div>
            <div className="overflow-y-auto">
                <div key={id} className="p-4 border-b border-gray-800">
                    <div className="flex mb-3">
                        <Avatar name={user.name} />
                        <div>
                            <span className="font-bold">{user.name}</span>
                            <span className="text-gray-500 ml-1"> @{username} · {time.toLocaleString()} · {todaydate.toLocaleString()}</span>
                        </div>
                    </div>
                    <p className="mb-3">{content}</p>
                    {image && <img src={image} alt="Tweet image" className="w-full rounded-2xl mb-3" />}
                    <div className="flex justify-between text-gray-500">
                        <span><MessageCircle className="inline mr-2" />{comments.length}</span>
                        <span><Repeat className="inline mr-2" />{reshares.length}</span>
                        <span><Heart className="inline mr-2" />{likes.length}</span>
                        <span><Share2 className="inline" /></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden rounded-full mr-3 bg-gray-100 dark:bg-gray-600">
            <span className="font-medium text-3xl text-gray-600 dark:text-black">{name[0]}</span>
        </div>
    );
}
