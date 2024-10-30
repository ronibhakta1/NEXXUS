import { useEcho } from "../../hooks"
import { EchoLoader } from "../loader/echoloader";
import { EchoCards } from "./echocards"

export const Echos = () => {
    const { loading ,echos } = useEcho();
    if(loading){
        return <div>
            <EchoLoader />
            <EchoLoader />
            <EchoLoader />
            <EchoLoader />
            <EchoLoader />
            <EchoLoader />
        </div>
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
                        datee={formattedDate}
                        time={formattedTime}
                        content={echo.content}
                        comments={echo.comments}
                        retweets={echo.retweets}
                        likes={echo.likes}
                        image={echo.image}
                        avatar={echo.avatar}
                        verified={echo.verified}
                    />
                );
            })}
            
        </div>
    )
}