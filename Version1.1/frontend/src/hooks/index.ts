import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../pages/config";


export const useEcho = () => {
    const [loading, setLoading] = useState(true);
    const [echos, setEchos] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/echo/bulkecho`,{
            headers: {
                Authorization:  localStorage.getItem('token')
            }}
        ).then((res) => {
            setEchos(res.data.echos);
            setLoading(false);
        })
    }, [])
    return{
        loading,
        echos
    }
}