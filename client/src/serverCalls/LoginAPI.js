import axios from 'axios';

const BASE_URL = "http://localhost:4444/api";

export const login = async (credentials) => {
    try{
        const url = BASE_URL + '/login'
        const res = await axios.post(url, credentials, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
    catch(error) {
        console.error(error);
    }
} 