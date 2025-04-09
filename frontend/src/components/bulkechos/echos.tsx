import { useEcho } from "../../hooks";
import { EchoLoader } from "../loader/echoloader";
import { EchoCards } from "./echocards";

// Define the Echo type for correct TypeScript inference
type Echo = {
    id: number;
    content: string;
    authorId: number;
    name: string;
    username: string;
    time: string;
    comments: any[];
    reshares: any[];
    likes: any[];
    image?: string;
    avatar?: string | null;
    author: {
        name: string;
    }
};

export const Echos = () => {
    // Ensure TypeScript correctly infers loading as boolean and echos as Echo[]
    const { loading, echos } = useEcho() as { loading: boolean; echos: Echo[] };

    if (loading) {
        return (
            <div>
                {Array.from({ length: 6 }).map((_, index) => (
                    <EchoLoader key={index} />
                ))}
            </div>
        );
    }

    return (
        <div>
            {echos.map((echo) => {
                const date = new Date(echo.time);
                const formattedDate = date.toLocaleDateString();
                const formattedTime = date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });

                return (
                    <EchoCards
                        key={echo.id}
                        id={echo.id}
                        authorId={echo.authorId}
                        user={{ name: echo.author.name }} // Assuming user object is required
                        username={echo.username}
                        todaydate={formattedDate}
                        time={formattedTime}
                        content={echo.content}
                        comments={echo.comments}
                        reshares={echo.reshares}
                        likes={echo.likes}
                        image={echo.image}
                        avatar={echo.avatar || ""} // Handle null avatar
                    />
                );
            })}
        </div>
    );
};
