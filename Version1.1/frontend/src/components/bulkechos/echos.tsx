// Define the Echo type for correct TypeScript inference
type Echo = {
    id: number;
    user: {
        name: string;
    };
    username: string;
    time: string;
    content: string;
    comments: number;
    retweets: number;
    likes: number;
    image?: string;
    avatar?: string;
    verified?: boolean;
};

// Assuming useEcho is defined to return loading and an array of Echo objects
import { useEcho } from "../../hooks";
import { EchoLoader } from "../loader/echoloader";
import { EchoCards } from "./echocards";

export const Echos = () => {
    // Ensure TypeScript correctly infers loading as boolean and echos as Echo[]
    const { loading, echos } = useEcho() as { loading: boolean; echos: Echo[] };

    if (loading) {
        return (
            <div>
                {/* Render multiple EchoLoader components while loading */}
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
                        user={echo.user.name}
                        username={echo.username}
                        todaydate={formattedDate}
                        time={formattedTime}
                        content={echo.content}
                        comments={echo.comments}
                        retweets={echo.retweets}
                        likes={echo.likes}
                        image={echo.image} avatar={""} verified={false}                        // avatar={echo.avatar}
                        // verified={echo.verified}
                    />
                );
            })}
        </div>
    );
};