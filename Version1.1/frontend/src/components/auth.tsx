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
            { type === "signin" ? navigate('/nexxushome') : null }
            { type === "signup" ? navigate('/nexxushome') : null }

        }
    }
    return <div  >
        <div className="text-4xl font-bold  text-sky-600 mb-6 text-center ">
            SIGN IN TO NEXXUS
        </div>
        {/* {JSON.stringify(postInputs)} */}

        <div className="grid gap-1 mb-10 md:grid-cols-2">
            <div>
                {type === "signup" ? <LabelledInput label="Name" placeholder="Name" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }} /> : null}

            </div>
            <div>
                {type === "signup" ? <LabelledInput label="Username" placeholder="ronibhakta123" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        username: e.target.value
                    })
                }} /> : null}

            </div>
            <div>
                <LabelledInput label="Email" placeholder="Email@gmail.com" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }} />

            </div>
            <div>
                <LabelledInput label="Password" type={"password"} placeholder="@#!&dsa231" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} />
            </div>
            <div>
                {type === "signup" ? <LabelledInput label="Phone" placeholder="1234567890" onChange={(e) => {
                    serPostInputs({
                        ...postInputs,
                        phone: e.target.value
                    })
                }} /> : null}
            </div>
            {/* <div>
                {type === "signup" ? (
                    <div className="mb-4">
                        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                        <input 
                            className="w-11/12 text-sm h-10 text-gray-900 border flex justify-center p-1.5 border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                            id="file_input" 
                            type="file" 
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        serPostInputs({
                                            ...postInputs,
                                            avatar: reader.result as string
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>
                ) : null}
            </div> */}
        
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
        <label className="text-1xl block mb-2  font-medium text-gray-900 dark:text-white">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
}