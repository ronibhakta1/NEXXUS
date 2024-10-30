import axios from "axios"
import { BACKEND_URL } from "../../pages/config"
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateEcho } from "@ronibhakta/nexxus-common"


export const PostEchos = () => {
    const navigate = useNavigate();

    const [echos, setEchos] = useState<CreateEcho>({
        content: ''
    });
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/echo`,{
                echos
            }, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });
            if(response.status === 201){
                alert("Echo created successfully");
                navigate('/nexxus');
            }
        } catch (e) {
            console.error(e);
            alert("Something went wrong");
            navigate('/nexxus')
        }
    }
    
    return <div className="border-b border-gray-800 p-4 ">
        <div className="flex">
            {<img src={'https://media.licdn.com/dms/image/v2/D4D03AQEvEHK2KOMLwQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705087348506?e=1735776000&v=beta&t=r3U2Inqk6qyq18y_rCXFlnuoxD4CRcMrJHPFOx2O5oE'} alt="User" className="w-12 h-12 rounded-full mr-3" />}
            <div className="flex-1">
                <Echosposter1 onChange={(e) => {
                    setEchos({
                        ...echos,
                        content: e.target.value
                    })
                }} />
                <div className="flex justify-between items-center">
                    <Echosposter2 />
                    <button onClick={sendRequest} className="bg-blue-400 text-white rounded-full px-4 py-2 font-bold">Echo</button>
                </div>
            </div>
        </div>
    </div>
}

interface echosposter1Type {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Echosposter1 = ({ onChange }: echosposter1Type) => {
    return <div>
        <input
            onChange={onChange} type="text"
            placeholder="What's happening?"
            className="bg-transparent border-none text-gray-200 text-xl w-full mb-3 focus:outline-none"
        />
    </div>
}

function Echosposter2() {
    return <div>
        <div>
            {['🖼️', '📊', '😀', '📅', '📍'].map((icon, index) => (
                <button key={index} className="text-blue-400 text-lg mr-2">{icon}</button>
            ))}
        </div>
    </div>
}