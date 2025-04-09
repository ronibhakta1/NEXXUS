// import { MoreHorizontal } from "lucide-react"
// import { useNavigate } from "react-router-dom"

import { BACKEND_URL } from "../../pages/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface CurrentUser {
    name: string
    username: string
    avatar: string
}

export const RightDownProfile = ({
    name,
    username,
    avatar
}: CurrentUser) => {
    const navigate = useNavigate();
    function sendRequest() {
        axios.post(`${BACKEND_URL}/api/v1/user/signout`);
        // Perform any additional logout logic here, like clearing local storage
        localStorage.removeItem('token');
        // navigate to login page
        navigate('/');
        alert('Logout successful');
    }
    return <div className="bottom-4 right-48 bg-gray-900 rounded-full p-3 flex items-center w-60 h-18 mt-96 justify-between  sticky">
            <div className="flex items-center ">
                <img src={avatar} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                <div>
                    <div className="font-bold">{name}</div>
                    <div className="text-gray-500">{username}</div>
                </div>
            </div>
            <button onClick={sendRequest} className="bg-gray-200 text-black rounded-full px-4 py-2 font-bold">Logout</button>
            {/* <MoreHorizontal className="text-gray-500" /> */}
        </div>
}