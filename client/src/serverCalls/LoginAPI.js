import axios from 'axios';

const BASE_URL = `http://${process.env.REACT_APP_DOMAIN}:4444/api`;

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
        console.log(error);
        console.log(JSON.stringify(error));
        return {error: error.response.data};
    }
} 