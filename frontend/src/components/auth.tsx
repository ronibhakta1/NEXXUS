import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@ronibhakta/nexxus-common"
import axios from "axios"
import { BACKEND_URL } from "../pages/config"

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const navigate = useNavigate();
    const [postInputs, serPostInputs] = useState<SignupInput>({
        username: '',
        name: '',
        email: '',
        password: '',
        phone: '',
    })
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`, postInputs);
            const jwt = await response.data;
            localStorage.setItem('token', jwt);
            navigate('/nexxus');
        } catch (e) {
            alert("Something went wrong");
            { type === "signin" ? navigate('/') : null }
            { type === "signup" ? navigate('/') : null }

        }
    }
    return <div  >
        <div className="text-4xl font-bold  text-sky-600 mb-6 text-center ">
            SIGN IN TO NEXXUS
        </div>
        {/* {JSON.stringify(postInputs)} */}

        <div className="grid gap-1 mb-10 md:grid-cols-2">
            <div>
                {type === "signup" ? <LabelledInput label="Name*" placeholder="Name" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }} /> : null}

            </div>
            <div>
                {type === "signup" ? <LabelledInput label="Username*" placeholder="ronibhakta123" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        username: e.target.value
                    })
                }} /> : null}

            </div>
            <div>
                <LabelledInput label="Email*" placeholder="Email@gmail.com" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }} />

            </div>
            <div className="relative">
                <LabelledInput label="Password*" type={ "Password*"} placeholder="@#!&dsa231" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} />
                
            </div>
            <div>
                {type === "signup" ? <LabelledInput label="Phone*" placeholder="1234567890" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        phone: e.target.value
                    })
                }} /> : null}
            </div>
            
        
        </div>
        <div className="flex justify-center">
            <button onClick={sendRequest} className="w-8/12 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white mb-4 py-2 px-4 rounded-full font-bold text-center">
                {type === "signin" ? "Sign in" : "Sign up"}
            </button>
            
        </div>


        <div>
            <p className=" text-white text-center">
                {type === "signin" ? "Don't have an account? " : "Already have an account? "}
                <Link to={type === "signin" ? "/signup" : "/signin"} className="text-[#1d9bf0] hover:underline text-center" >{type === "signin" ? "Sign up" : "Sign in"}</Link>
            </p>
        </div>
    </div>
}


interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}
const LabelledInput = ({ label, placeholder, onChange, type }: LabelledInputType) => {
    return <div >
        <label className="text-1xl block mb-2  font-medium text-white dark:text-white">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
    
}