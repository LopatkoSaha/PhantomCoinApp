import axios from 'axios';

export const telegramQRGet = async () => {
    return axios.get(
        'http://localhost:3600/telegram/getQR',
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.log({msgType: "warning", msgText: error.response?.data?.message || "Произошла ошибка"});
    });
}