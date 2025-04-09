import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../pages/config";


export const useEcho = () => {
    const [loading, setLoading] = useState(true);
    const [echos, setEchos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/echo/bulkecho`, {
                headers: {
                Authorization: localStorage.getItem('token')
                }
            });
            if (res.data.echos.length !== echos.length) {
                setEchos(res.data.echos);
            }
            setLoading(false);
            } catch (error) {
            console.error("Error fetching echos:", error);
            setLoading(false);
            }
        };

        fetchData();
        
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